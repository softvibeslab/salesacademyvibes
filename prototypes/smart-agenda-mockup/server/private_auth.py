"""Private credentials. No passwords or credential material are logged or returned."""
import hashlib
import hmac
import json
import os
import stat


def mode():
    return os.environ.get("OPS_AUTH_MODE", "demo")


def load_credentials():
    path = os.environ.get("OPS_PRIVATE_CREDENTIALS_FILE", "")
    try:
        info = os.lstat(path)
        if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077 or info.st_size > 100_000:
            return None
        with open(path, encoding="utf-8") as handle:
            data = json.load(handle)
        if not isinstance(data, dict) or not isinstance(data.get("users"), dict):
            return None
        for name, entry in data["users"].items():
            if not isinstance(name, str) or not isinstance(entry, dict):
                return None
            if not isinstance(entry.get("version"), str) or not entry["version"]:
                return None
            if (entry.get("n"), entry.get("r"), entry.get("p")) != (16384, 8, 1):
                return None
            if len(bytes.fromhex(entry["salt"])) < 16 or len(bytes.fromhex(entry["hash"])) != 32:
                return None
        return data["users"]
    except (OSError, ValueError, TypeError, KeyError):
        return None


def credential_version(username):
    users = load_credentials()
    entry = (users or {}).get(username)
    if not entry:
        return ""
    return hashlib.sha256(json.dumps(entry, sort_keys=True).encode()).hexdigest()


def authenticate(username, password):
    """Return the stamp of exactly the credential snapshot verified, never a later rotation."""
    users = load_credentials()
    entry = (users or {}).get(username)
    if not entry or not isinstance(password, str) or len(password) > 200:
        return ""
    try:
        digest = hashlib.scrypt(password.encode(), salt=bytes.fromhex(entry["salt"]),
                                n=16384, r=8, p=1, dklen=32)
        if not hmac.compare_digest(digest, bytes.fromhex(entry["hash"])):
            return ""
        return hashlib.sha256(json.dumps(entry, sort_keys=True).encode()).hexdigest()
    except (ValueError, TypeError):
        return ""


def verify(username, password):
    return bool(authenticate(username, password))


def session_valid(entry, username):
    current = mode()
    if entry.get("authMode", "demo") != current:
        return False
    if current == "demo":
        return True
    stamp = credential_version(username)
    return current == "private" and bool(stamp) and hmac.compare_digest(str(entry.get("credentialVersion", "")), stamp)


def storage_ready(path):
    try:
        folder = os.stat(os.path.dirname(path))
        file = os.lstat(path)
        return stat.S_ISREG(file.st_mode) and not (file.st_mode & 0o077) and not (folder.st_mode & 0o077)
    except OSError:
        return False
