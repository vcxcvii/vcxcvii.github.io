#!/usr/bin/env python3
"""Tests for deterministic visitor changelog publication."""
import importlib.util
import json
import os
import unittest

SCRIPT = os.path.join(os.path.dirname(__file__), 'refresh_site_changelog.py')
SPEC = importlib.util.spec_from_file_location('refresh_site_changelog', SCRIPT)
refresh = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(refresh)

SHA = 'a' * 40


def commit(subject='Improve mobile navigation', files=None, body=''):
    return {
        'sha': SHA,
        'date': '2026-07-27',
        'subject': subject,
        'body': body,
        'files': files or ['_includes/nav.html', '_sass/main.scss'],
        'patch': '',
    }


class SiteChangelogTests(unittest.TestCase):
    def test_internal_and_private_commits_do_not_reach_model(self):
        self.assertFalse(refresh.visitor_candidate(commit(
            'chore: refresh visitor changelog',
            ['_data/site_updates.json'],
        )))
        self.assertFalse(refresh.visitor_candidate(commit(
            'Update encrypted note',
            ['notes/2f8a41/index.html'],
        )))
        self.assertFalse(refresh.visitor_candidate(commit(
            'Refactor build',
            ['.github/workflows/deploy.yml', '_scripts/qa.rb'],
        )))
        self.assertTrue(refresh.visitor_candidate(commit()))

    def test_valid_changelog_payload_is_normalized(self):
        payload = {
            'updates': [{
                'title': 'Mobile navigation now leaves the article alone',
                'summary': (
                    'The menu now opens over the page instead of pushing the '
                    'article down and moving the line someone was reading.'
                ),
                'benefits': [
                    {
                        'label': 'Keep your place',
                        'text': 'Opening navigation no longer shifts the article.',
                    },
                    {
                        'label': 'Use small screens',
                        'text': 'Links remain reachable at narrow phone widths.',
                    },
                ],
                'commit_shas': [SHA],
            }],
        }
        result = refresh.validate_updates(payload, [commit()])
        self.assertEqual(result[0]['commit_shas'], [SHA])
        self.assertEqual(len(result[0]['benefits']), 2)

    def test_unknown_sha_and_voice_drift_are_rejected(self):
        base = {
            'title': 'Mobile navigation now works without moving the page',
            'summary': (
                'The menu now opens above the article, keeping the current '
                'reading position stable on narrow screens.'
            ),
            'benefits': [
                {'label': 'Keep your place', 'text': 'The article stays still while the menu opens.'},
                {'label': 'Find pages', 'text': 'All primary links remain available on phones.'},
            ],
            'commit_shas': ['b' * 40],
        }
        with self.assertRaises(ValueError):
            refresh.validate_updates({'updates': [base]}, [commit()])
        base['commit_shas'] = [SHA]
        base['title'] = 'A seamless navigation experience for everyone'
        with self.assertRaises(ValueError):
            refresh.validate_updates({'updates': [base]}, [commit()])
        base['title'] = 'Mobile navigation now keeps the article still'
        base['summary'] = (
            'The menu keeps the reading position stable. '
            '<script>Anything from a commit is untrusted.</script>'
        )
        with self.assertRaises(ValueError):
            refresh.validate_updates({'updates': [base]}, [commit()])

    def test_commit_trailers_form_a_payload_without_a_provider(self):
        body = """Changelog-Title: Mobile navigation now keeps the article still
Changelog-Summary: The menu opens above the article, keeping the reading position stable while making every primary page reachable on narrow screens.
Changelog-Benefit: Keep your place | Opening the menu no longer moves the article.
Changelog-Benefit: Find pages | Primary links remain reachable on phones.
"""
        payload = refresh.trailer_payload(commit(body=body))
        result = refresh.validate_updates(payload, [commit(body=body)])
        self.assertEqual(result[0]['title'], 'Mobile navigation now keeps the article still')
        self.assertEqual(len(result[0]['benefits']), 2)

    def test_commits_without_trailers_opt_out(self):
        self.assertIsNone(refresh.trailer_payload(commit()))

    def test_malformed_benefit_trailer_is_rejected(self):
        with self.assertRaises(ValueError):
            refresh.trailer_payload(commit(
                body='Changelog-Benefit: Missing the separator',
            ))

    def test_multiple_updates_from_one_commit_get_unique_ids(self):
        updates = [
            {
                'title': 'Navigation is easier to understand',
                'summary': 'Visitors can find the right page without decoding project names.',
                'benefits': [],
                'commit_shas': [SHA],
            },
            {
                'title': 'Images arrive faster on long pages',
                'summary': 'Screenshots use smaller files and reserve their space before loading.',
                'benefits': [],
                'commit_shas': [SHA],
            },
        ]
        records = refresh.update_records(updates, [commit()], [])
        self.assertEqual(
            [record['id'] for record in records],
            ['2026-07-27-aaaaaaa', '2026-07-27-aaaaaaa-2'],
        )

    def test_seed_data_is_outcome_led_and_valid_json(self):
        with open(refresh.DATA) as source:
            data = json.load(source)
        self.assertRegex(data['last_processed_commit'], r'^[a-f0-9]{40}$')
        self.assertGreaterEqual(len(data['updates']), 8)
        ids = [update['id'] for update in data['updates']]
        self.assertEqual(len(ids), len(set(ids)))
        for update in data['updates']:
            self.assertNotIn('—', update['title'] + update['summary'])
            self.assertGreaterEqual(len(update['benefits']), 2)


if __name__ == '__main__':
    unittest.main()
