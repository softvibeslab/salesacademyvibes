"""Exercise the advisor UI through real Flask sessions and an isolated QA model."""
import os
from pathlib import Path
import secrets
import subprocess
import sys
import tempfile
import threading

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from werkzeug.serving import WSGIRequestHandler, make_server
from growth.server.app import create_app, create_staff


class QuietHandler(WSGIRequestHandler):
    def log(self, *_args, **_kwargs):
        pass


def qa_reply(messages):
    assert messages[0]['role'] == 'system'
    assert 'PUBLICACIÓN ACTUAL DEL CMS' in messages[0]['content']
    assert messages[-1]['role'] == 'user'
    return ('Sales Academy puede ayudar a preparar y practicar con el método de tu sala. '
            'Podemos explorar entrenamiento y coaching para tu equipo. '
            '¿Qué reto quieres trabajar primero? La demo se confirma con Chris por WhatsApp.')


def main():
    with tempfile.TemporaryDirectory(prefix='sa-advisor-integration-') as directory:
        app = create_app({'DATA_ROOT': directory, 'COOKIE_SECURE': False,
                          'PUBLIC_CONTACT_ENABLED': False, 'ADVISOR_ENABLED': True,
                          'ADVISOR_CLIENT': qa_reply, 'RATE_LIMIT_ENABLED': False})
        password = secrets.token_urlsafe(24)
        create_staff(directory, 'e2e-owner', password, 'owner')
        create_staff(directory, 'e2e-editor', password, 'editor')
        server = make_server('127.0.0.1', 0, app, threaded=True, request_handler=QuietHandler)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()
        environment = os.environ.copy()
        environment.update(GROWTH_E2E_URL=f'http://127.0.0.1:{server.server_port}',
                           GROWTH_E2E_PASSWORD=password)
        try:
            return subprocess.run(['node', str(ROOT/'growth/tests/advisor-integration-browser.mjs')],
                                  cwd=ROOT, env=environment, check=False).returncode
        finally:
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)


if __name__ == '__main__':
    raise SystemExit(main())
