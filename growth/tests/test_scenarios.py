"""Scenario guide publication uses the existing editorial contract."""
import copy
import json
import tempfile
import unittest
from pathlib import Path

from growth.server.app import create_app
from growth.server.content import validate_document
from growth.tests.test_backend import seed

GALLERY = '/growth-assets/scenarios/index.html'


def scenario_document(status='published'):
    document = seed()
    document['resources'] = [r for r in document['resources'] if r['id'] != 'room-day']
    resource = copy.deepcopy(document['resources'][0])
    resource.update(id='room-day', slug='un-dia-en-la-sala', type='guide',
                    title='Una jornada de práctica', status=status)
    document['resources'].append(resource)
    return document


class ScenarioPublication(unittest.TestCase):
    def client(self, document):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        app = create_app({'DATA_ROOT': temporary.name, 'TESTING': True,
                          'COOKIE_SECURE': False, 'SEED_DOCUMENT': document})
        return app.test_client()

    def test_seed_contains_an_editable_existing_contract_guide(self):
        document = json.loads((Path(__file__).parents[1] / 'content/seed.json').read_text())
        guides = [r for r in document['resources'] if r['id'] == 'room-day']
        self.assertEqual(len(guides), 1)
        self.assertEqual(guides[0]['type'], 'guide')
        self.assertEqual(guides[0]['slug'], 'un-dia-en-la-sala')
        self.assertIn('simula', guides[0]['sourceNote'].lower())
        validate_document(document)

    def test_published_guide_links_from_landing_and_reader(self):
        client = self.client(scenario_document())
        self.assertIn(GALLERY, client.get('/descubre/').text)
        self.assertIn(GALLERY, client.get('/mediahub/un-dia-en-la-sala/').text)
        unrelated = scenario_document()['resources'][0]['slug']
        self.assertNotIn(GALLERY, client.get(f'/mediahub/{unrelated}/').text)

    def test_hidden_guide_removes_entry_and_reader(self):
        for status in ('draft', 'archived'):
            with self.subTest(status=status):
                client = self.client(scenario_document(status))
                self.assertNotIn(GALLERY, client.get('/descubre/').text)
                self.assertEqual(client.get('/mediahub/un-dia-en-la-sala/').status_code, 404)

    def test_gallery_is_public_asset_independent_of_editorial_privacy(self):
        client = self.client(scenario_document('archived'))
        response = client.get(GALLERY)
        try:
            self.assertEqual(response.status_code, 200)
            self.assertIn('text/html', response.content_type)
        finally:
            response.close()


if __name__ == '__main__':
    unittest.main()
