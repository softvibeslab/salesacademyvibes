"""Run Chromium against a real ephemeral Flask/SQLite service, never production."""
import argparse
import json
import os
from pathlib import Path
import secrets
import subprocess
import sys
import tempfile
import threading

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT.parent))
from werkzeug.serving import WSGIRequestHandler, make_server
from growth.server.app import create_app, create_staff


class QuietHandler(WSGIRequestHandler):
    def log(self, *args, **kwargs):
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--public-only', action='store_true')
    parser.add_argument('--audit', action='store_true', help='Keyboard, reflow and resource budget checks')
    parser.add_argument('--cinematic', action='store_true', help='Cinematic journey, captions and lazy media playback')
    parser.add_argument('--scenarios', action='store_true', help='Day-in-the-room scenes and screenshot gallery')
    parser.add_argument('--ai-vsl', action='store_true', help='AI scenes, prominent VSL and voluntary WhatsApp demo links')
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix='sa-growth-e2e-') as folder:
        app = create_app({'DATA_ROOT': folder, 'COOKIE_SECURE': False,
                          'PUBLIC_CONTACT_ENABLED': True, 'RATE_LIMIT_ENABLED': False})
        password = secrets.token_urlsafe(24)
        create_staff(folder, 'e2e-owner', password, 'owner')
        create_staff(folder, 'e2e-editor', password, 'editor')
        server = make_server('127.0.0.1', 0, app, threaded=True, request_handler=QuietHandler)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()
        environment = os.environ.copy()
        environment.update(GROWTH_E2E_URL=f'http://127.0.0.1:{server.server_port}',
                           GROWTH_E2E_PASSWORD=password,
                           GROWTH_E2E_PUBLIC_ONLY='1' if args.public_only else '0')
        try:
            script = 'ai-vsl-browser.mjs' if args.ai_vsl else 'scenarios-browser.mjs' if args.scenarios else 'cinematic.mjs' if args.cinematic else 'quality-browser.mjs' if args.audit else 'e2e.mjs'
            result = subprocess.run(['node', str(ROOT / 'tests' / script)],
                                    cwd=ROOT.parent, env=environment, check=False)
            return result.returncode
        finally:
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)


if __name__ == '__main__':
    raise SystemExit(main())
