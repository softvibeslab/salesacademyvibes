import hashlib
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from growth.server.backup import create_backup, verify_backup, restore_backup, BackupError

class BackupTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.base=Path(self.temp.name); self.data=self.base/'data'; self.data.mkdir()
        con=sqlite3.connect(self.data/'cms.sqlite'); con.execute('pragma journal_mode=WAL'); con.execute('create table content(id integer, text text)'); con.execute("insert into content values(1,'synthetic content')"); con.commit(); con.close()
        media=self.data/'media'/'originals'; media.mkdir(parents=True); (media/'image.bin').write_bytes(b'original-synthetic')
        self.snapshot=self.base/'snapshot'

    def test_backup_and_restore_keep_sqlite_content_and_media_hashes(self):
        result=create_backup(self.data,self.snapshot)
        self.assertTrue((self.snapshot/'manifest.json').is_file())
        verified=verify_backup(self.snapshot)
        self.assertTrue(verified['ok'])
        target=self.base/'restored'; restore_backup(self.snapshot,target)
        con=sqlite3.connect(target/'cms.sqlite'); self.assertEqual(con.execute('select text from content').fetchone()[0],'synthetic content'); con.close()
        self.assertEqual((target/'media/originals/image.bin').read_bytes(),b'original-synthetic')
        self.assertFalse((target/'manifest.json').exists())

    def test_restore_refuses_existing_data_and_snapshot_is_immutable(self):
        create_backup(self.data,self.snapshot)
        with self.assertRaises(BackupError): create_backup(self.data,self.snapshot)
        with self.assertRaises(BackupError): restore_backup(self.snapshot,self.data)
        self.assertTrue((self.data/'cms.sqlite').exists())

    def test_modified_or_extra_files_fail_verification(self):
        create_backup(self.data,self.snapshot)
        p=self.snapshot/'media/originals/image.bin'; p.write_bytes(b'changed')
        with self.assertRaises(BackupError): verify_backup(self.snapshot)
        p.write_bytes(b'original-synthetic')
        (self.snapshot/'unlisted.txt').write_text('surprise')
        with self.assertRaises(BackupError): verify_backup(self.snapshot)

    def test_traversal_or_symlinks_rejected(self):
        outside=self.base/'outside'; outside.write_text('private')
        (self.data/'shortcut').symlink_to(outside)
        with self.assertRaises(BackupError): create_backup(self.data,self.snapshot)
        (self.data/'shortcut').unlink()
        create_backup(self.data,self.snapshot)
        manifest=json.loads((self.snapshot/'manifest.json').read_text())
        manifest['files']['../outside']={'sha256':hashlib.sha256(b'private').hexdigest(),'bytes':7}
        (self.snapshot/'manifest.json').write_text(json.dumps(manifest))
        with self.assertRaises(BackupError): verify_backup(self.snapshot)

    def test_manifest_cannot_hide_missing_media_reference(self):
        import io
        from PIL import Image
        from growth.server.media import MediaStore
        media = MediaStore(self.data/'media')
        image = io.BytesIO(); Image.new('RGB',(16,16),'navy').save(image,'PNG'); image.seek(0)
        asset=media.upload(image,'safe.png',{'title':'Safe','alt':'Demo','rightsStatus':'approved','reviewStatus':'approved'})
        create_backup(self.data,self.snapshot)
        relative=media.path(asset['id'],'web').relative_to(self.data.resolve()).as_posix()
        (self.snapshot/relative).unlink()
        manifest=json.loads((self.snapshot/'manifest.json').read_text())
        del manifest['files'][relative]
        (self.snapshot/'manifest.json').write_text(json.dumps(manifest))
        with self.assertRaises(BackupError): verify_backup(self.snapshot)

    def test_destination_inside_data_is_rejected(self):
        with self.assertRaises(BackupError): create_backup(self.data,self.data/'backups/snapshot')

if __name__=='__main__': unittest.main()
