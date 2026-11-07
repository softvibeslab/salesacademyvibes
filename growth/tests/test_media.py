import io
import tempfile
import unittest
from pathlib import Path

from PIL import Image
from pypdf import PdfWriter
from pypdf.actions import JavaScript
from pypdf.generic import NameObject, DictionaryObject, TextStringObject
from growth.server.media import MediaStore, MediaError


def photo(fmt='PNG', color='navy', size=(64, 32), exif=False):
    stream = io.BytesIO()
    im = Image.new('RGB', size, color)
    kwargs = {}
    if exif:
        data = Image.Exif(); data[270] = 'private synthetic metadata'
        kwargs['exif'] = data
    im.save(stream, format=fmt, **kwargs)
    return stream.getvalue()


def pdf(active=False, encrypted=False, embedded=False):
    writer = PdfWriter(); writer.add_blank_page(width=100, height=100)
    if active:
        writer.add_open_action(JavaScript('app.alert("synthetic")'))
    if embedded:
        writer.add_attachment('hidden.txt', b'synthetic')
    if encrypted:
        writer.encrypt('test-only-password')
    stream = io.BytesIO(); writer.write(stream)
    return stream.getvalue()


class MediaTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)/'media'
        self.store = MediaStore(self.root)
        self.meta = dict(title='Guía demo', alt='Representación sintética', origin='Creación de prueba', rightsStatus='approved', reviewStatus='approved')

    def put(self, data=None, filename='demo.png', metadata=None):
        return self.store.upload(io.BytesIO(data or photo()), filename, metadata or self.meta)

    def assert_rejected(self, data, filename, status=415):
        with self.assertRaises(MediaError) as caught:
            self.put(data, filename)
        self.assertEqual(caught.exception.status, status)

    def test_images_are_persistent_and_derivatives_strip_exif(self):
        asset = self.put(photo('JPEG', exif=True), 'demo.jpg')
        self.assertTrue(asset.get('id'))
        self.assertEqual(asset['mime'], 'image/jpeg')
        self.assertEqual(MediaStore(self.root).get(asset['id'])['title'], 'Guía demo')
        for variant in ('web', 'thumbnail'):
            with Image.open(self.store.path(asset['id'], variant)) as im:
                self.assertEqual(im.format, 'WEBP')
                self.assertFalse(im.getexif())
        self.assertTrue(self.store.path(asset['id'], 'original').is_file())
        self.assertGreater(self.store.usage()['bytes'], asset['bytes'])

    def test_duplicate_exact_bytes_reuses_id_without_overwriting_metadata(self):
        data = photo()
        first = self.put(data)
        second = self.put(data, 'other.png', {**self.meta, 'title': 'Override'})
        self.assertEqual(first.get('id'), second.get('id'))
        self.assertEqual(self.store.usage()['count'], 1)
        self.assertEqual(self.store.get(first['id'])['title'], 'Guía demo')

    def test_false_images_and_audiovisual_are_rejected(self):
        for data, filename in [(b'<html><script>x</script></html>', 'fake.jpg'), (photo(), 'fake.mp4'), (photo(), 'fake.mp3'), (photo(), 'fake.svg'), (photo(), 'fake.pdf')]:
            with self.subTest(filename=filename):
                self.assert_rejected(data, filename)
        self.assertEqual(self.store.usage()['count'], 0)

    def test_limits_and_quota_are_enforced_before_persisting(self):
        self.store.MAX_BYTES = 10
        self.assert_rejected(b'x'*11, 'large.png', 413)
        self.store.MAX_BYTES = 10*1024*1024
        self.store.MAX_PIXELS = 4
        self.assert_rejected(photo(size=(3,2)), 'large.png', 413)
        self.store.MAX_PIXELS = 25_000_000
        self.store.QUOTA_BYTES = 1
        self.assert_rejected(photo(), 'quota.png', 413)
        self.assertEqual(self.store.usage()['count'], 0)

    def test_safe_pdf_is_parsed_and_active_pdfs_rejected(self):
        asset = self.put(pdf(), 'guide.pdf')
        self.assertEqual(asset.get('mime'), 'application/pdf')
        self.assertTrue(self.store.path(asset['id'], 'download').is_file())
        for kwargs in ({'active': True}, {'encrypted': True}, {'embedded': True}):
            with self.subTest(kwargs=kwargs):
                self.assert_rejected(pdf(**kwargs), 'unsafe.pdf')

    def test_metadata_and_ids_are_validated(self):
        asset = self.put()
        for metadata in ({'rightsStatus': 'invented'}, {'archived': 'false'}, {'filename': '../../outside'}, {'title': 'x'*301}):
            with self.subTest(metadata=metadata):
                with self.assertRaises(MediaError):
                    self.store.update(asset['id'], metadata)
        self.assertIsNone(self.store.get('../../cms.sqlite'))
        for variant in ('../../cms.sqlite', 'missing'):
            with self.assertRaises(MediaError):
                self.store.path(asset['id'], variant)

    def test_search_pagination_and_archive_preserve_files(self):
        a = self.put(photo(color='red'))
        self.put(photo(color='blue'), metadata={**self.meta, 'title': 'Otra pieza'})
        found = self.store.list(query='guía')
        self.assertEqual(len(found['items']), 1)
        first = self.store.list(limit=1)
        self.assertEqual(len(first['items']),1)
        self.assertIsNotNone(first['nextCursor'])
        self.assertEqual(len(self.store.list(cursor=first['nextCursor'],limit=1)['items']),1)
        self.store.update(a['id'], {'archived':True})
        self.assertTrue(self.store.get(a['id'])['archived'])
        self.assertTrue(self.store.path(a['id'],'web').exists())
        self.assertEqual(self.store.usage()['count'],2)

    def test_publication_requires_existing_reviewed_rights_and_alt(self):
        asset = self.put()
        document = {'resources':[{'status':'published','coverId':asset['id'],'attachments':[]}, {'status':'draft','coverId':'private-id','attachments':[]}]}
        self.assertEqual(self.store.references(document),{asset['id']})
        self.store.verify_publish(document)
        for fields in ({'reviewStatus':'pending'},{'rightsStatus':'pending'},{'archived':True},{'alt':''}):
            with self.subTest(fields=fields):
                self.store.update(asset['id'],{**self.meta,'archived':False})
                self.store.update(asset['id'],fields)
                with self.assertRaises(MediaError): self.store.verify_publish(document)
        with self.assertRaises(MediaError): self.store.verify_publish({'resources':[{'status':'published','coverId':'missing'}]})

    def test_symlink_media_path_is_not_served(self):
        asset = self.put()
        path = self.store.path(asset['id'],'web')
        outside = Path(self.temp.name)/'outside.txt'; outside.write_text('not media')
        path.unlink(); path.symlink_to(outside)
        with self.assertRaises(MediaError): self.store.path(asset['id'],'web')


if __name__ == '__main__': unittest.main()
