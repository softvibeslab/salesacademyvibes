"""Exercise authentication and preview only; never edit or publish content."""
import argparse
import http.cookiejar
import json
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import build_opener, HTTPCookieProcessor, HTTPRedirectHandler, ProxyHandler, Request


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def verify(credentials):
    results = []
    for entry in credentials:
        version = entry['version']
        origin = f'https://{version}.salesacademy.softvibes.cloud'
        if version not in {f'v{n}' for n in range(1, 6)}:
            raise ValueError('Unexpected version')
        jar = http.cookiejar.CookieJar()
        client = build_opener(ProxyHandler({}), HTTPCookieProcessor(jar), NoRedirect())

        def call(path, data=None, csrf=None, source=None):
            headers = {'Origin': source or origin, 'Sec-Fetch-Site': 'same-origin'}
            if csrf:
                headers['X-CSRF-Token'] = csrf
            if data is not None:
                headers['Content-Type'] = 'application/json'
            request = Request(origin+path, data=None if data is None else json.dumps(data).encode(), headers=headers)
            try:
                response = client.open(request, timeout=30)
            except HTTPError as error:
                response = error
            with response:
                return response.status, dict(response.headers), response.read()

        def check(name, condition):
            results.append({'version': version, 'check': name, 'ok': bool(condition)})
            if not condition:
                raise RuntimeError(f'{version}: {name} failed; no credentials printed')

        try:
            check('anonymous_session_401', call('/cms/api/session')[0] == 401)
            status, headers, body = call('/cms/api/login', {'username': entry['username'], 'password': entry['password']})
            check('login_https_200', status == 200)
            session = json.loads(body)
            csrf = session['csrf']
            cookie = headers.get('Set-Cookie', '').lower()
            check('cookie_secure_httponly_strict_hostonly', all(x in cookie for x in ['secure', 'httponly', 'samesite=strict']) and 'domain=' not in cookie)
            check('session_owner', json.loads(call('/cms/api/session')[2])['user']['role'] == 'owner')
            for path in ['/cms/api/draft', '/cms/api/resources', '/cms/api/revisions', '/cms/preview/', '/cms/preview/?page=hub']:
                check('read_only_'+path, call(path)[0] == 200)
            check('logout_without_csrf_403', call('/cms/api/logout', {})[0] == 403)
            check('foreign_origin_403', call('/cms/api/logout', {}, csrf, 'https://salesacademy.softvibes.cloud')[0] == 403)
            check('session_survives_rejected_posts', call('/cms/api/session')[0] == 200)
            next_version = f'v{int(version[1:]) % 5 + 1}'
            probe = Request(f'https://{next_version}.salesacademy.softvibes.cloud/cms/api/session')
            jar.add_cookie_header(probe)
            check('cookie_not_sent_to_other_version', not probe.has_header('Cookie'))
            check('logout_with_csrf', call('/cms/api/logout', {}, csrf)[0] in {200, 204})
            check('logged_out_401', call('/cms/api/session')[0] == 401)
        finally:
            if 'csrf' in locals() and any(True for _ in jar):
                try:
                    call('/cms/api/logout', {}, csrf)
                except Exception:
                    pass
    return results


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--credentials', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    checks = verify(json.loads(args.credentials.read_text()))
    args.output.write_text(json.dumps({'checks': checks, 'passed': len(checks), 'failed': 0}, indent=2))
    print(f'{len(checks)} CMS checks passed across five versions; no published content modified.')
