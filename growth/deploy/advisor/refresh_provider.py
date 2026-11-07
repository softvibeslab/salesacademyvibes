"""Root-only export of a short-lived inference credential; no refresh-token clone."""
import contextlib
import grp
import io
import json
import logging
import os
from pathlib import Path
import sys
import tempfile


def minimal_runtime(runtime, model):
    if runtime.get('provider') != 'openai-codex' or runtime.get('api_mode') != 'codex_responses' or runtime.get('base_url','').rstrip('/') != 'https://chatgpt.com/backend-api/codex':
        raise ValueError('Unexpected provider runtime')
    if not isinstance(runtime.get('api_key'), str) or not runtime['api_key']:
        raise ValueError('Provider credential is unavailable')
    return {key:runtime[key] for key in ('api_key','base_url','provider','api_mode')} | {'model':model}


def main():
    # Resolve and refresh through Hermes' authoritative store and locks; do not
    # manually read/copy/edit OAuth refresh tokens or create a competing store.
    if os.geteuid()!=0:
        return 1
    os.environ['HERMES_HOME']='/root/.hermes'
    sys.path.insert(0,'/usr/local/lib/hermes-agent')
    logging.disable(logging.CRITICAL)
    try:
        with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):
            from hermes_cli.config import load_config
            from hermes_cli.runtime_provider import resolve_runtime_provider
            model=load_config()['model']['default']
            runtime=resolve_runtime_provider(requested='openai-codex',target_model=model)
            data=minimal_runtime(runtime,model)
        target=Path('/etc/salesacademy-advisor/provider.json')
        fd,temp=tempfile.mkstemp(prefix='.provider-',dir=target.parent)
        try:
            with os.fdopen(fd,'w') as handle:
                json.dump(data,handle)
                handle.flush();os.fsync(handle.fileno())
            os.chown(temp,0,grp.getgrnam('sa-advisor').gr_gid)
            os.chmod(temp,0o640)
            os.replace(temp,target)
        finally:
            if os.path.exists(temp):os.unlink(temp)
        print('Advisor inference credential refreshed; values omitted.')
        return 0
    except Exception:
        print('Advisor inference credential refresh unavailable; values omitted.')
        return 1


if __name__=='__main__':
    raise SystemExit(main())
