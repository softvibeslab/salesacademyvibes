"""Build five immutable runtimes; no network, deploy, credentials or app imports.

Usage: python3 growth/deploy/versions/build_release.py --output /path/to/new-release
The destination must not already exist. All ZIP entries are verified before use;
only runtime namespaces are copied. Files, modes, mtimes and JSON are deterministic.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import tempfile
import zipfile

SOURCE_ROOT = Path(__file__).resolve().parents[3]
ARCHIVE_ROOT = "salesacademy-growth"
FIXED_MTIME = 946684800
MAX_EXPANDED_BYTES = 1024 * 1024 * 1024
MAX_MEMBERS = 20_000


@dataclass(frozen=True)
class VersionSpec:
    version: str
    archive: str
    manifest: str
    sha256: str


VERSIONS = (
    VersionSpec("v1", "salesacademy-growth-v1.zip", "delivery-manifest.json", "d56950a8b1b48f6207c883d708f80186689e6b3436e5eb72c6d5cc125142fbb6"),
    VersionSpec("v2", "salesacademy-growth-v2.zip", "delivery-manifest-v2.json", "2ec61f7009a64511ea5232a7ed28e29322a7bf93d90859f39ad517bebd3c0f0a"),
    VersionSpec("v3", "salesacademy-growth-v3.zip", "delivery-manifest-v3.json", "6d480e2dfdcd15ed1687f57a51d8c47666ee247df205da4d67e8eabecdb5a9c6"),
    VersionSpec("v4", "salesacademy-room-scenarios-v4.zip", "delivery-manifest-v4.json", "ce317a4df3b2e1adf3337b2bff60ea24e47c72c58f4cc81455067e3270994180"),
    VersionSpec("v5", "salesacademy-ai-vsl-v5.zip", "delivery-manifest-v5.json", "f9eeec30eb281783033712fd1531e8bec63541668d73b7eed31d3290345b4250"),
)

WSGI_SOURCE = '''"""Production entry point. Run behind exactly one trusted local proxy."""
import os
from pathlib import Path

from growth.server.app import create_app
from werkzeug.middleware.proxy_fix import ProxyFix

data_root = os.environ.get("SA_GROWTH_DATA_ROOT", "")
release_root = Path(__file__).resolve().parents[1]
if not data_root or not Path(data_root).is_absolute():
    raise RuntimeError("SA_GROWTH_DATA_ROOT must be an absolute private directory.")
data_root = Path(data_root).resolve()
if data_root == release_root or release_root in data_root.parents:
    raise RuntimeError("SA_GROWTH_DATA_ROOT must be outside the release.")

app = create_app({
    "DATA_ROOT": str(data_root),
    "COOKIE_SECURE": True,
    "PUBLIC_CONTACT_ENABLED": False,
})
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)
'''


def _digest(data):
    return hashlib.sha256(data).hexdigest()


def _file_digest(path):
    hasher = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def _safe_parts(name):
    if not isinstance(name, str) or not name or any(char in name for char in "\\\x00:"):
        raise ValueError("unsafe archive or manifest path")
    parts = name.split("/")
    if any(part in {"", ".", ".."} for part in parts):
        raise ValueError(f"unsafe archive or manifest path: {name!r}")
    return parts


def _private_path(parts):
    excluded = {"test", "tests", "private", "runtime", "data", "__pycache__", "node_modules", "sessions", "uploads"}
    if any(part.startswith(".") or part.lower() in excluded for part in parts):
        return True
    name = parts[-1].lower()
    return (
        name.startswith(("test_", "credentials", "secrets"))
        or name.endswith(("-access.txt", "-wal", "-shm", "-journal"))
        or Path(name).suffix in {".db", ".sqlite", ".sqlite3", ".pem", ".key", ".p12", ".pfx", ".pyc", ".env", ".log", ".bak"}
    )


def _runtime_path(name):
    parts = _safe_parts(name)
    if _private_path(parts):
        return False
    return name in {"growth/requirements.txt", "growth/__init__.py"} or (
        len(parts) >= 3 and parts[0] == "growth" and parts[1] in {"server", "site", "content"}
    )


def _write_file(root, name, data, records, **provenance):
    target = root.joinpath(*_safe_parts(name))
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    target.chmod(0o644)
    os.utime(target, (FIXED_MTIME, FIXED_MTIME))
    records.append({"path": name, "bytes": len(data), "sha256": _digest(data), **provenance})


def _extract_version(source_root, spec, destination, records):
    dist = source_root / "growth/dist"
    archive_path = dist / spec.archive
    manifest_path = dist / spec.manifest
    for path in (dist, archive_path, manifest_path):
        if path.is_symlink():
            raise ValueError("symlink in archive input")
    if _file_digest(archive_path) != spec.sha256:
        raise ValueError(f"archive SHA-256 mismatch: {spec.version}")
    manifest_data = manifest_path.read_bytes()
    manifest = json.loads(manifest_data)
    if (manifest.get("archive") != spec.archive or manifest.get("sha256") != spec.sha256
            or manifest.get("bytes") != archive_path.stat().st_size):
        raise ValueError(f"archive manifest metadata mismatch: {spec.version}")
    if manifest.get("containsRuntimeData") is not False:
        raise ValueError("archive manifest must declare containsRuntimeData=false")
    entries = {}
    for item in manifest["files"]:
        name = item["path"]
        _safe_parts(name)
        if name in entries:
            raise ValueError("duplicate manifest entry")
        entries[name] = item
    runtime_count = 0
    requirement_digest = None
    with zipfile.ZipFile(archive_path) as archive:
        members = archive.infolist()
        if len(members) > MAX_MEMBERS or sum(info.file_size for info in members) > MAX_EXPANDED_BYTES:
            raise ValueError("archive expanded size or member limit exceeded")
        files, seen = {}, set()
        for info in members:
            name = info.orig_filename
            parts = _safe_parts(name[:-1] if info.is_dir() else name)
            if parts[0] != ARCHIVE_ROOT or len(parts) < 2:
                raise ValueError("unsafe archive root path")
            key = "/".join(parts).casefold()
            if key in seen:
                raise ValueError("duplicate archive member")
            seen.add(key)
            kind = stat.S_IFMT(info.external_attr >> 16)
            expected_kind = stat.S_IFDIR if info.is_dir() else stat.S_IFREG
            if kind not in {0, expected_kind}:
                raise ValueError("archive symlink or special file rejected")
            if info.flag_bits & 1:
                raise ValueError("encrypted archive member rejected")
            if not info.is_dir():
                files["/".join(parts[1:])] = info
        if set(files) != set(entries):
            raise ValueError("manifest and archive members differ")
        required = {"growth/requirements.txt", "growth/server/app.py", "growth/content/seed.json", "growth/site/templates/landing.html"}
        if not required.issubset(files):
            raise ValueError("required runtime files missing")
        for name, info in sorted(files.items()):
            data = archive.read(info)
            expected = entries[name]
            if len(data) != expected.get("bytes") or _digest(data) != expected.get("sha256"):
                raise ValueError(f"entry SHA-256 or size mismatch: {name}")
            if _runtime_path(name):
                _write_file(destination, f"{spec.version}/{name}", data, records,
                            sourceArchive=spec.archive, sourcePath=name)
                runtime_count += 1
            if name == "growth/requirements.txt":
                requirement_digest = _digest(data)
    _write_file(destination, f"{spec.version}/wsgi.py", WSGI_SOURCE.encode(), records,
                generatedBy="build_release.py")
    return {
        "version": spec.version, "archive": spec.archive, "archiveSha256": spec.sha256,
        "archiveBytes": archive_path.stat().st_size, "sourceManifest": spec.manifest,
        "sourceManifestSha256": _digest(manifest_data), "verifiedEntries": len(entries),
        "runtimeFiles": runtime_count, "requirementsSha256": requirement_digest,
    }


def _copy_index(source_root, destination, records):
    index = source_root / "growth/deploy/versions/index"
    if index.is_symlink():
        raise ValueError("index symlink rejected")
    if not index.exists():
        return
    if not index.is_dir():
        raise ValueError("index must be a directory")
    for path in sorted(index.rglob("*")):
        if path.is_symlink():
            raise ValueError("index symlink rejected")
        if path.is_dir():
            continue
        if not path.is_file():
            raise ValueError("index special file rejected")
        relative = path.relative_to(index).as_posix()
        if not _private_path(_safe_parts(relative)):
            _write_file(destination, f"index/{relative}", path.read_bytes(), records,
                        sourcePath=f"growth/deploy/versions/index/{relative}")


def build_release(output: Path, source_root: Path = SOURCE_ROOT, versions=VERSIONS):
    """Build into a new directory atomically; return the content manifest.

    ``versions`` allows small pinned fixtures in tests; the CLI always uses the
    five reviewed immutable VersionSpecs. Existing outputs are never replaced.
    """
    output = Path(output).absolute()
    source_root = Path(source_root).resolve()
    if output.exists() or output.is_symlink():
        raise ValueError(f"output already exists: {output}")
    versions = tuple(versions)
    if not versions or len({item.version for item in versions}) != len(versions):
        raise ValueError("empty or duplicate version list")
    for spec in versions:
        if not re.fullmatch(r"v[1-5]", spec.version):
            raise ValueError("invalid version identifier")
        if any(len(_safe_parts(name)) != 1 for name in (spec.archive, spec.manifest)):
            raise ValueError("unsafe input filename")
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=f".{output.name}-build-", dir=output.parent) as temporary:
        destination = Path(temporary) / "release"
        destination.mkdir()
        records = []
        versions_data = [_extract_version(source_root, spec, destination, records)
                         for spec in sorted(versions, key=lambda item: item.version)]
        if len({item["requirementsSha256"] for item in versions_data}) != 1:
            raise ValueError("version requirements differ")
        _copy_index(source_root, destination, records)
        manifest = {"schemaVersion": 1, "versions": versions_data,
                    "files": sorted(records, key=lambda item: item["path"])}
        manifest_data = (json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n").encode()
        _write_file(destination, "release-manifest.json", manifest_data, [])
        for directory in (destination, *(path for path in destination.rglob("*") if path.is_dir())):
            directory.chmod(0o755)
            os.utime(directory, (FIXED_MTIME, FIXED_MTIME))
        if output.exists() or output.is_symlink():
            raise ValueError(f"output already exists: {output}")
        destination.rename(output)
    return manifest


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True, help="New release directory (must not exist)")
    parser.add_argument("--source-root", type=Path, default=SOURCE_ROOT, help="Product root with growth/dist")
    args = parser.parse_args(argv)
    try:
        manifest = build_release(args.output, args.source_root)
    except (OSError, ValueError, KeyError, zipfile.BadZipFile) as error:
        parser.exit(1, f"Release build failed: {error}\n")
    print(json.dumps({"output": str(args.output.absolute()), "versions": len(manifest["versions"]),
                      "files": len(manifest["files"]),
                      "manifestSha256": _file_digest(args.output / "release-manifest.json")}, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
