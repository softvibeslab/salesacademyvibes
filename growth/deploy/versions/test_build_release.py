"""Release integrity, restricted extraction and production wrapper contracts."""
from __future__ import annotations

import hashlib
import importlib.util
import json
import os
from pathlib import Path
import runpy
import stat
import sys
import tempfile
import types
import unittest
from unittest.mock import Mock, patch
import warnings
import zipfile

MODULE_PATH = Path(__file__).with_name("build_release.py")
SPEC = importlib.util.spec_from_file_location("build_release", MODULE_PATH)
builder = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = builder
SPEC.loader.exec_module(builder)


def digest(data):
    return hashlib.sha256(data).hexdigest()


class ReleaseBuilderTests(unittest.TestCase):
    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        self.root = Path(self.folder.name)
        self.source = self.root / "source"
        (self.source / "growth/dist").mkdir(parents=True)
        self.output = self.root / "release"

    def package(self, entries=None, *, version="v1"):
        entries = entries or [
            ("growth/server/app.py", b"# frozen app\n"),
            ("growth/server/__init__.py", b""),
            ("growth/__init__.py", b""),
            ("growth/content/seed.json", b'{"resources": []}\n'),
            ("growth/site/templates/landing.html", b"<h1>Immutable</h1>"),
            ("growth/site/assets/film.mp4", bytes(range(256))),
            ("growth/requirements.txt", b"Flask==3.1.3\n"),
            ("growth/tests/test_local.py", b"# must not ship"),
            ("work/evidence/capture.png", b"evidence"),
            ("growth/server/private/credentials.txt", b"fixture"),
            ("growth/site/.env", b"fixture"),
            ("growth/site/assets/local.sqlite", b"fixture"),
            ("growth/content/demo-access.txt", b"fixture"),
            ("growth/site/assets/__pycache__/cached.pyc", b"fixture"),
        ]
        archive_name = f"fixture-{version}.zip"
        manifest_name = f"fixture-{version}.json"
        archive_path = self.source / "growth/dist" / archive_name
        files = []
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", UserWarning)
            with zipfile.ZipFile(archive_path, "w") as archive:
                for name, content, *metadata in entries:
                    info = zipfile.ZipInfo("salesacademy-growth/" + name)
                    info.create_system = 3
                    info.external_attr = (metadata[0] if metadata else stat.S_IFREG | 0o644) << 16
                    archive.writestr(info, content)
                    files.append({"path": name, "bytes": len(content), "sha256": digest(content)})
        archive_data = archive_path.read_bytes()
        manifest = {"archive": archive_name, "sha256": digest(archive_data),
                    "bytes": len(archive_data), "files": files, "containsRuntimeData": False}
        (self.source / "growth/dist" / manifest_name).write_text(json.dumps(manifest))
        return builder.VersionSpec(version, archive_name, manifest_name, digest(archive_data))

    def build(self, specs=None, output=None):
        return builder.build_release(output or self.output, self.source, specs or (self.package(),))

    def change_manifest(self, spec, edit):
        path = self.source / "growth/dist" / spec.manifest
        document = json.loads(path.read_text())
        edit(document)
        path.write_text(json.dumps(document))

    def test_extracts_only_runtime_whitelist_and_records_provenance(self):
        spec = self.package()
        self.build((spec,))
        self.assertTrue((self.output / "v1/growth/server/app.py").is_file())
        self.assertEqual((self.output / "v1/growth/site/assets/film.mp4").read_bytes(), bytes(range(256)))
        files = {str(path.relative_to(self.output)) for path in self.output.rglob("*") if path.is_file()}
        self.assertEqual(files, {
            "v1/growth/server/app.py", "v1/growth/server/__init__.py", "v1/growth/__init__.py",
            "v1/growth/content/seed.json", "v1/growth/site/templates/landing.html",
            "v1/growth/site/assets/film.mp4", "v1/growth/requirements.txt", "v1/wsgi.py",
            "release-manifest.json",
        })
        manifest = json.loads((self.output / "release-manifest.json").read_text())
        self.assertEqual(manifest["versions"][0]["archiveSha256"], spec.sha256)
        self.assertEqual(manifest["versions"][0]["runtimeFiles"], 7)
        for entry in manifest["files"]:
            self.assertEqual(digest((self.output / entry["path"]).read_bytes()), entry["sha256"])
        item = next(x for x in manifest["files"] if x["path"].endswith("/server/app.py"))
        self.assertEqual(item["sourcePath"], "growth/server/app.py")
        self.assertEqual(item["sourceArchive"], spec.archive)

    def test_outputs_are_reproducible_and_index_is_optional(self):
        spec = self.package()
        self.build((spec,))
        second = self.root / "second"
        self.build((spec,), second)
        self.assertFalse((self.output / "index").exists())
        for path in self.output.rglob("*"):
            other = second / path.relative_to(self.output)
            self.assertEqual(path.stat().st_mtime_ns, other.stat().st_mtime_ns)
            if path.is_file():
                self.assertEqual(path.read_bytes(), other.read_bytes())

    def test_existing_output_is_never_overwritten(self):
        self.output.mkdir()
        sentinel = self.output / "keep.txt"
        sentinel.write_text("keep")
        with self.assertRaisesRegex(ValueError, "exists"):
            self.build()
        self.assertEqual(sentinel.read_text(), "keep")

    def test_pinned_archive_digest_is_required(self):
        spec = self.package()
        with (self.source / "growth/dist" / spec.archive).open("ab") as stream:
            stream.write(b"tampered")
        with self.assertRaisesRegex(ValueError, "archive.*SHA-256"):
            self.build((spec,))
        self.assertFalse(self.output.exists())

    def test_verifies_excluded_files_too(self):
        spec = self.package()
        self.change_manifest(spec, lambda document: document["files"][-1].update(sha256="0" * 64))
        with self.assertRaisesRegex(ValueError, "entry.*SHA-256"):
            self.build((spec,))
        self.assertFalse(self.output.exists())

    def test_manifest_and_archive_must_have_identical_members(self):
        spec = self.package()
        self.change_manifest(spec, lambda document: document["files"].pop())
        with self.assertRaisesRegex(ValueError, "manifest.*members"):
            self.build((spec,))

    def test_rejects_traversal_and_nonportable_archive_paths(self):
        for name in ("../escape", "growth/site/../../escape", "growth//site/evil", "growth\\site\\evil", "C:/evil"):
            with self.subTest(name=name):
                spec = self.package([(name, b"invalid")])
                with self.assertRaisesRegex(ValueError, "unsafe.*path"):
                    self.build((spec,))
                self.assertFalse(self.output.exists())

    def test_rejects_symlinks_even_outside_whitelist(self):
        spec = self.package([("work/evidence/link", b"/etc/passwd", stat.S_IFLNK | 0o777)])
        with self.assertRaisesRegex(ValueError, "symlink|special"):
            self.build((spec,))
        self.assertFalse(self.output.exists())

    def test_rejects_duplicate_archive_members(self):
        spec = self.package([("growth/server/app.py", b"one"), ("growth/server/app.py", b"two")])
        with self.assertRaisesRegex(ValueError, "duplicate"):
            self.build((spec,))

    def test_incomplete_runtime_does_not_build(self):
        spec = self.package([("growth/site/index.html", b"incomplete")])
        with self.assertRaisesRegex(ValueError, "required runtime"):
            self.build((spec,))

    def test_copies_index_and_rejects_index_symlinks(self):
        index = self.source / "growth/deploy/versions/index"
        index.mkdir(parents=True)
        (index / "index.html").write_text("<h1>Versions</h1>")
        (index / "style.css").write_text("body {color: black}")
        self.build()
        self.assertEqual((self.output / "index/index.html").read_text(), "<h1>Versions</h1>")
        (index / "link.css").symlink_to(index / "style.css")
        with self.assertRaisesRegex(ValueError, "symlink"):
            self.build(output=self.root / "unsafe-index")
        self.assertFalse((self.root / "unsafe-index").exists())

    def test_version_ids_cannot_escape_output(self):
        spec = self.package()
        spec = builder.VersionSpec("../escape", spec.archive, spec.manifest, spec.sha256)
        with self.assertRaisesRegex(ValueError, "version"):
            self.build((spec,))

    def test_production_wrapper_locks_flags_and_trusts_one_proxy(self):
        self.build()
        wrapper = self.output / "v1/wsgi.py"
        self.assertTrue(wrapper.is_file())
        app = types.SimpleNamespace(wsgi_app=object())
        create_app = Mock(return_value=app)
        proxy_fix = Mock(return_value="wrapped")
        modules = {"growth.server.app": types.SimpleNamespace(create_app=create_app),
                   "werkzeug.middleware.proxy_fix": types.SimpleNamespace(ProxyFix=proxy_fix)}
        with patch.dict(sys.modules, modules), patch.dict(os.environ, {"SA_GROWTH_DATA_ROOT": str(self.root / "private")}, clear=True):
            result = runpy.run_path(str(wrapper))
        self.assertIs(result["app"], app)
        create_app.assert_called_once_with({"DATA_ROOT": str((self.root / "private").resolve()),
                                            "COOKIE_SECURE": True, "PUBLIC_CONTACT_ENABLED": False})
        self.assertEqual(proxy_fix.call_args.kwargs, {"x_for": 1, "x_proto": 1})
        self.assertEqual(app.wsgi_app, "wrapped")
        for environment in ({}, {"SA_GROWTH_DATA_ROOT": "relative"}, {"SA_GROWTH_DATA_ROOT": str(self.output / "private")}):
            with self.subTest(environment=environment), patch.dict(sys.modules, modules), patch.dict(os.environ, environment, clear=True):
                with self.assertRaisesRegex(RuntimeError, "SA_GROWTH_DATA_ROOT"):
                    runpy.run_path(str(wrapper))


if __name__ == "__main__":
    unittest.main()
