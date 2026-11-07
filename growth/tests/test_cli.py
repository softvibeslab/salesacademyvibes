"""Local launcher must not expose a preview or store private state in public files."""
import tempfile
import unittest
from pathlib import Path

from growth.server.cli import validate_binding, validate_data_root


class LauncherGuardsTest(unittest.TestCase):
    def test_private_data_cannot_live_under_site(self):
        site = Path(__file__).resolve().parents[1] / 'site'
        with self.assertRaises(ValueError):
            validate_data_root(site / 'private')

    def test_local_preview_cannot_bind_to_network(self):
        with self.assertRaises(ValueError):
            validate_binding('0.0.0.0')

    def test_isolated_directory_and_loopback_are_valid(self):
        with tempfile.TemporaryDirectory() as folder:
            self.assertEqual(validate_data_root(folder), Path(folder).resolve())
        self.assertEqual(validate_binding('127.0.0.1'), '127.0.0.1')


if __name__ == '__main__':
    unittest.main()
