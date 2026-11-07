"""Curated-film contract tests against real isolated Flask/SQLite state."""
import copy
import json
import tempfile
import unittest
from pathlib import Path
from flask import render_template_string

from growth.server.app import create_app, create_staff
from growth.server.content import ContentError, validate_document, validate_resource
from growth.tests.test_backend import seed, OWNER_PASSWORD, EDITOR_PASSWORD
from growth.server.videos import load_video_catalog, VideoCatalogError


def video_resource(**changes):
    resource = copy.deepcopy(seed()['resources'][0])
    resource.update(id='film-test', slug='pelicula-de-prueba', type='video',
                    title='Película de prueba', videoId='smart-agent',
                    duration='20 segundos', status='published')
    resource.update(changes)
    return resource


class CuratedVideoContract(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.config = {'DATA_ROOT': str(self.root), 'TESTING': True,
                       'COOKIE_SECURE': False, 'RATE_LIMIT_ENABLED': False,
                       'SEED_DOCUMENT': seed()}
        self.app = create_app(self.config)
        self.client = self.app.test_client()
        create_staff(self.root, 'owner', OWNER_PASSWORD)
        create_staff(self.root, 'editor', EDITOR_PASSWORD, 'editor')
        self.headers = self.login(self.client, 'owner', OWNER_PASSWORD)

    def tearDown(self):
        self.temporary.cleanup()

    def login(self, client, username, password):
        response = client.post('/cms/api/login', json={'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        return {'X-CSRF-Token': response.json['csrf']}

    def draft(self):
        response = self.client.get('/cms/api/draft')
        self.assertEqual(response.status_code, 200)
        return response.json

    def add_film(self, client=None, headers=None, **changes):
        draft = self.draft()
        response = (client or self.client).post('/cms/api/resources',
            json={'revision': draft['revision'], 'resource': video_resource(**changes)},
            headers=headers or self.headers)
        self.assertEqual(response.status_code, 201, response.get_data(as_text=True))
        return response.json

    def test_old_documents_and_explicit_null_remain_valid(self):
        document = seed()
        validate_document(document)
        document['resources'][0]['videoId'] = None
        try:
            validate_document(document)
        except ContentError as error:
            self.fail(f'An explicit absent film must remain valid: {error}')

    def test_known_local_film_is_a_published_video_source(self):
        for identifier in ('smart-agent', 'menos-caos', 'sistema-conectado',
                           'infraestructura-comercial', 'conocimiento-en-practica'):
            with self.subTest(identifier=identifier):
                try:
                    validate_resource(video_resource(videoId=identifier))
                except ContentError as error:
                    self.fail(f'Curated film must be accepted: {error}')

    def test_invalid_ids_and_source_conflicts_leave_revision_unchanged(self):
        draft = self.draft()
        cases = [{'videoId': value} for value in
                 ('unknown-film', '../secret', '/growth-assets/films/smart-agent.mp4',
                  'https://example.invalid/film.mp4', '', 1, True, [], {})]
        cases += [{'type': 'guide'}, {'type': 'audio'},
                  {'externalMediaUrl': 'https://www.youtube.com/watch?v=abcdefghijk'},
                  {'videoId': None}, {'videoId': None, 'type': 'audio'}]
        for changes in cases:
            with self.subTest(changes=changes):
                response = self.client.post('/cms/api/resources',
                    json={'revision': draft['revision'], 'resource': video_resource(**changes)},
                    headers=self.headers)
                self.assertEqual(response.status_code, 400)
                self.assertEqual(self.draft()['revision'], draft['revision'])

    def test_editor_selects_preview_then_owner_publishes_and_restart_preserves(self):
        editor = self.app.test_client()
        editor_headers = self.login(editor, 'editor', EDITOR_PASSWORD)
        saved = self.add_film(editor, editor_headers)
        self.assertEqual(self.client.get('/mediahub/pelicula-de-prueba/').status_code, 404)
        preview = editor.get('/cms/preview/?resource=pelicula-de-prueba')
        self.assertEqual(preview.status_code, 200)
        self.assertIn('no-store', preview.headers['Cache-Control'])
        self.assertIn('/growth-assets/films/smart-agent.mp4', preview.text)
        self.assertIn('preload="none"', preview.text)
        self.assertIn('controls', preview.text)
        self.assertIn('playsinline', preview.text)
        self.assertIn('kind="captions"', preview.text)
        self.assertNotIn('autoplay', preview.text)
        self.assertEqual(editor.post('/cms/api/publish', json={'revision': saved['revision']},
                                     headers=editor_headers).status_code, 403)
        published = self.client.post('/cms/api/publish', json={'revision': saved['revision']}, headers=self.headers)
        self.assertEqual(published.status_code, 200)
        self.assertIn('<video', self.client.get('/mediahub/pelicula-de-prueba/').text)
        app2 = create_app(self.config)
        client2 = app2.test_client()
        self.login(client2, 'owner', OWNER_PASSWORD)
        resource = client2.get('/cms/api/draft').json['document']['resources'][-1]
        self.assertEqual(resource['videoId'], 'smart-agent')

    def test_restore_old_document_has_no_film_until_explicit_publish(self):
        initial = self.client.get('/cms/api/revisions').json['items'][0]['id']
        saved = self.add_film()
        self.assertEqual(self.client.post('/cms/api/publish', json={'revision': saved['revision']},
                                         headers=self.headers).status_code, 200)
        current = self.draft()
        restored = self.client.post('/cms/api/restore', json={
            'publicationId': initial, 'revision': current['revision']}, headers=self.headers)
        self.assertEqual(restored.status_code, 200)
        self.assertNotIn('videoId', restored.json['document']['resources'][0])
        self.assertEqual(self.client.get('/mediahub/pelicula-de-prueba/').status_code, 200)
        self.assertEqual(self.client.post('/cms/api/publish', json={'revision': restored.json['revision']},
                                         headers=self.headers).status_code, 200)
        self.assertEqual(self.client.get('/mediahub/pelicula-de-prueba/').status_code, 404)

    def test_draft_and_archived_films_do_not_leak_into_public_hub(self):
        saved = self.add_film(status='draft', title='BORRADOR-AUDIOVISUAL')
        preview = self.client.get('/cms/preview/?resource=pelicula-de-prueba')
        self.assertIn('/growth-assets/films/smart-agent.mp4', preview.text)
        self.assertNotIn('BORRADOR-AUDIOVISUAL', self.client.get('/mediahub/?type=video').text)
        self.assertEqual(self.client.post('/cms/api/publish', json={'revision': saved['revision']},
                                         headers=self.headers).status_code, 200)
        self.assertEqual(self.client.get('/mediahub/pelicula-de-prueba/').status_code, 404)
        draft = self.draft()
        resource = draft['document']['resources'][-1]
        resource['status'] = 'archived'
        response = self.client.patch('/cms/api/resources/film-test', json={
            'revision': draft['revision'], 'resource': resource}, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.client.post('/cms/api/publish', json={'revision': response.json['revision']},
                                         headers=self.headers).status_code, 200)
        self.assertNotIn('BORRADOR-AUDIOVISUAL', self.client.get('/mediahub/').text)

    def test_cms_contains_single_safe_catalog_and_hub_uses_film_poster(self):
        shell = self.client.get('/cms/').text
        self.assertIn('id="video-catalog"', shell)
        self.assertIn('smart-agent', shell)
        saved = self.add_film()
        self.assertEqual(self.client.post('/cms/api/publish', json={'revision': saved['revision']},
                                         headers=self.headers).status_code, 200)
        hub = self.client.get('/mediahub/?type=video').text
        self.assertIn('/growth-assets/films/smart-agent.webp', hub)
        self.assertNotIn('class="sa-hub-document"', hub)

    def test_local_media_supports_partial_playback_and_correct_mime(self):
        for clip in load_video_catalog().values():
            with self.subTest(clip=clip['id']):
                response = self.client.get(clip['src'], headers={'Range': 'bytes=0-63'})
                try:
                    self.assertEqual(response.status_code, 206)
                    self.assertEqual(response.mimetype, 'video/mp4')
                    self.assertEqual(len(response.data), 64)
                    self.assertTrue(response.headers['Content-Range'].startswith('bytes 0-63/'))
                finally:
                    response.close()
                for path, mime in ((clip['poster'], 'image/webp'), (clip['captions'], 'text/vtt')):
                    response = self.client.get(path)
                    try:
                        self.assertEqual(response.status_code, 200)
                        self.assertEqual(response.mimetype, mime)
                    finally:
                        response.close()
        self.assertEqual(self.client.get('/growth-assets/films/unknown.mp4').status_code, 404)
        self.assertEqual(self.client.get('/growth-assets/../../server/app.py').status_code, 404)

    def test_cms_cover_takes_priority_over_curated_poster(self):
        with self.app.test_request_context('/'):
            markup = render_template_string(
                "{% from 'macros.html' import resource_card, video_player with context %}{{ resource_card(resource) }}{{ video_player(resource) }}",
                resource=video_resource(coverId='reviewed-cover-fixture'),
                video_catalog=load_video_catalog())
        self.assertIn('/media/reviewed-cover-fixture/web', markup)
        self.assertNotIn('/growth-assets/films/smart-agent.webp', markup)


class CuratedCatalogValidation(unittest.TestCase):
    def test_missing_catalog_is_explicit_deployment_error(self):
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaises(VideoCatalogError):
                load_video_catalog(Path(folder) / 'missing.json')

    def test_catalog_rejects_foreign_paths_missing_captions_and_invalid_metadata(self):
        original = load_video_catalog()
        cases = [('src', 'https://example.invalid/film.mp4'),
                 ('poster', '/growth-assets/films/../private.webp'),
                 ('captions', None), ('audioKind', 'none'), ('width', True),
                 ('durationSeconds', float('nan')), ('durationSeconds', 0),
                 ('id', '../secret'), ('extra', 'unexpected')]
        with tempfile.TemporaryDirectory() as folder:
            for index, (key, value) in enumerate(cases):
                with self.subTest(key=key, value=value):
                    document = copy.deepcopy(original)
                    document['smart-agent'][key] = value
                    path = Path(folder) / f'case-{index}.json'
                    path.write_text(json.dumps(document))
                    with self.assertRaises(VideoCatalogError):
                        load_video_catalog(path)


if __name__ == '__main__':
    unittest.main()
