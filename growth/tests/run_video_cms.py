"""Exercise film selection and recovery with isolated data and a real browser."""
import os
from pathlib import Path
import secrets
import subprocess
import sys
import tempfile
import threading

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT.parent))

from flask import render_template_string
from werkzeug.serving import make_server, WSGIRequestHandler
from growth.server.app import create_app, create_staff
from growth.server.videos import load_video_catalog
from growth.tests.test_backend import seed
from growth.tests.test_videos import video_resource


class QuietHandler(WSGIRequestHandler):
    def log(self, *args, **kwargs):
        pass


def main():
    with tempfile.TemporaryDirectory(prefix='sa-v3-cms-video-') as root:
        app = create_app({
            'DATA_ROOT': root, 'COOKIE_SECURE': False,
            'RATE_LIMIT_ENABLED': False, 'SEED_DOCUMENT': seed(),
        })

        @app.get('/qa-films/')
        def qa_films():
            # Test-only component fixture. Never registered by the product factory.
            return render_template_string(
                '''<!doctype html><html lang="es"><head>
                <link rel="stylesheet" href="/growth-assets/media-player.css">
                <script type="module" src="/growth-assets/media-player.mjs"></script>
                </head><body>
                {% from "macros.html" import video_player with context %}
                {{ video_player(first) }}{{ video_player(second) }}
                </body></html>''',
                first=video_resource(),
                second=video_resource(id='film-test2', videoId='menos-caos'),
                video_catalog=load_video_catalog(),
            )

        evidence = Path(os.environ.get(
            'GROWTH_EVIDENCE_DIR',
            ROOT.parent / 'work/features/2026-11-07-cinematic-journey/evidence',
        ))
        if not evidence.is_absolute():
            evidence = ROOT.parent / evidence
        evidence.mkdir(parents=True, exist_ok=True)
        password = secrets.token_urlsafe(24)
        create_staff(root, 'video-owner', password)
        server = make_server('127.0.0.1', 0, app, threaded=True,
                             request_handler=QuietHandler)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()
        environment = os.environ.copy()
        environment.update(
            GROWTH_EVIDENCE_DIR=str(evidence),
            VIDEO_QA_URL=f'http://127.0.0.1:{server.server_port}',
            VIDEO_QA_PASSWORD=password,
        )
        try:
            result = subprocess.run(
                ['node', str(ROOT / 'tests/e2e-video-cms.mjs')],
                env=environment, cwd=ROOT.parent, check=False, timeout=90,
            )
            return result.returncode
        finally:
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)


if __name__ == '__main__':
    sys.exit(main())
