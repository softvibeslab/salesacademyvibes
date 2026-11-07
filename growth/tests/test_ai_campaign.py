"""Campaign links, featured VSL and editorial publication boundaries."""
import copy
import json
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, parse_qs

GROWTH = Path(__file__).resolve().parents[1]
MESSAGE = 'Hola, quiero conocer los agentes de IA de Sales Academy y agendar una demo para mi sala de ventas.'


class Markup(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


class AICampaign(unittest.TestCase):
    def client(self, status='published'):
        from growth.server.app import create_app
        data = json.loads((GROWTH / 'content/seed.json').read_text())
        film = next(r for r in data['resources'] if r.get('videoId') == 'smart-agent')
        film['status'] = status
        if status != 'published':
            film['title'] = 'PRIVATE-VSL-NOT-FOR-PUBLIC'
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        return create_app({'DATA_ROOT': folder.name, 'TESTING': True,
                           'COOKIE_SECURE': False, 'SEED_DOCUMENT': data}).test_client()

    def assert_links(self, text, minimum=1):
        links = [attrs for tag, attrs in Markup(text).tags
                 if tag == 'a' and attrs.get('href', '').startswith('https://wa.me/')]
        self.assertGreaterEqual(len(links), minimum, 'Expected a voluntary WhatsApp demo link')
        for link in links:
            target = urlsplit(link['href'])
            self.assertEqual(target.netloc, 'wa.me')
            self.assertEqual(target.path, '/529843163268')
            self.assertEqual(parse_qs(target.query), {'text': [MESSAGE]})
            if link.get('target') == '_blank':
                self.assertIn('noopener', link.get('rel', '').split())

    def test_public_pages_offer_one_consistent_demo_contact(self):
        client = self.client()
        for path in ('/descubre/', '/mediahub/', '/mediahub/un-dia-en-la-sala/', '/descubre/diagnostico/'):
            with self.subTest(path=path):
                response = client.get(path)
                self.assertEqual(response.status_code, 200)
                self.assert_links(response.text, 3 if path == '/descubre/' else 1)

    def test_static_gallery_uses_the_same_message_and_number(self):
        text = (GROWTH / 'site/assets/scenarios/index.html').read_text()
        self.assert_links(text)
        self.assertIn('agentes de IA', text)

    def test_featured_vsl_is_unique_manual_and_captioned(self):
        text = self.client().get('/descubre/').text
        tags = Markup(text).tags
        self.assertEqual(sum('data-vsl' in a for _, a in tags), 1)
        self.assertEqual(sum(a.get('src') == '/growth-assets/films/smart-agent.mp4' for _, a in tags), 1)
        self.assertEqual(sum(a.get('src') == '/growth-assets/films/smart-agent.es.vtt' for _, a in tags), 1)
        for tag, attrs in tags:
            if tag == 'video':
                self.assertIn('controls', attrs)
                self.assertNotIn('autoplay', attrs)
                self.assertEqual(attrs.get('preload'), 'none')

    def test_archived_or_draft_vsl_is_not_featured_or_leaked(self):
        for status in ('draft', 'archived'):
            with self.subTest(status=status):
                text = self.client(status).get('/descubre/').text
                self.assertNotIn('data-vsl', text)
                self.assertNotIn('/growth-assets/films/smart-agent.mp4', text)
                self.assertNotIn('PRIVATE-VSL-NOT-FOR-PUBLIC', text)
                self.assert_links(text)

    def test_journey_combines_room_photos_and_real_interfaces(self):
        tags = Markup(self.client().get('/descubre/').text).tags
        self.assertTrue(any('ai-scene-world' in a.get('class', '').split() for _, a in tags))
        self.assertTrue(any('ai-product-screen' in a.get('class', '').split() for _, a in tags))
        self.assertEqual(sum('data-chapter' in a for _, a in tags), 5)


if __name__ == '__main__':
    unittest.main()
