#!/usr/bin/env python3
"""Tests for the ePub and PDF build that runs after Jekyll."""
import importlib.util
import os
import unittest

SCRIPT = os.path.join(os.path.dirname(__file__), 'generate_downloads.py')
SPEC = importlib.util.spec_from_file_location('generate_downloads', SCRIPT)
downloads = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(downloads)

PAGE = '''<!doctype html><html><body>
<nav class="site-menu"><a href="/blog/">Writing</a></nav>
<article class="page-shell">
  <header class="page-header">
    <h1>Who owns what</h1>
    <p class="entry-downloads"><a href="/downloads/who-owns-what/who-owns-what.epub">ePub (Kindle)</a></p>
  </header>
  <div class="read-with"><span>Or, discuss this article with</span></div>
  <div class="prose prose--essay">
    <p>Ownership is a <em>decision</em>, not a title.</p>
    <div class="note"><p>Nested block that must survive.</p></div>
    <p>Second point.</p>
  </div>
  <aside class="also-read"><h2>Related essays</h2></aside>
</article>
</body></html>'''


class ArticleBodyTests(unittest.TestCase):
    def test_body_is_the_prose_and_nothing_around_it(self):
        body = downloads.article_body(PAGE)
        self.assertIn('Ownership is a <em>decision</em>', body)
        self.assertIn('Second point.', body)
        self.assertNotIn('Or, discuss this article with', body)
        self.assertNotIn('entry-downloads', body)
        self.assertNotIn('Related essays', body)
        self.assertNotIn('site-menu', body)

    def test_nested_divs_do_not_end_the_body_early(self):
        body = downloads.article_body(PAGE)
        self.assertIn('Nested block that must survive.', body)
        self.assertEqual(body.count('<div'), 1)

    def test_a_page_without_essay_prose_is_an_error(self):
        with self.assertRaises(downloads.BuildError):
            downloads.article_body('<html><body><p>No wrapper here.</p></body></html>')


class ResolveTests(unittest.TestCase):
    def test_image_sources_become_readable_paths(self):
        # Root-relative under file:// resolves to the filesystem root, so
        # pandoc embeds nothing and Chrome prints a broken-image icon. Both
        # fail without failing the build, which is the whole danger.
        body = downloads.resolve_references(
            '<img src="/assets/images/posts/a.webp" alt="A">',
            site_dir='/tmp/_site',
            site_url='https://www.varunchoraria.com',
        )
        self.assertIn('src="/tmp/_site/assets/images/posts/a.webp"', body)

    def test_srcset_is_resolved_too(self):
        body = downloads.resolve_references(
            '<img srcset="/assets/a.webp 1x, /assets/b.webp 2x" src="/assets/a.webp">',
            site_dir='/tmp/_site',
            site_url='https://www.varunchoraria.com',
        )
        self.assertIn('/tmp/_site/assets/a.webp 1x', body)
        self.assertIn('/tmp/_site/assets/b.webp 2x', body)

    def test_internal_links_become_absolute_site_urls(self):
        body = downloads.resolve_references(
            '<a href="/who-owns-what/">that essay</a>',
            site_dir='/tmp/_site',
            site_url='https://www.varunchoraria.com',
        )
        self.assertIn('href="https://www.varunchoraria.com/who-owns-what/"', body)

    def test_external_and_anchor_references_are_left_alone(self):
        body = downloads.resolve_references(
            '<a href="https://example.com/x">x</a><a href="#top">top</a>',
            site_dir='/tmp/_site',
            site_url='https://www.varunchoraria.com',
        )
        self.assertIn('href="https://example.com/x"', body)
        self.assertIn('href="#top"', body)


class DocumentTests(unittest.TestCase):
    def test_document_carries_title_date_and_canonical_url(self):
        html = downloads.document(
            title='Who owns what',
            date='2026-05-17',
            url='https://www.varunchoraria.com/who-owns-what/',
            body='<p>Body.</p>',
        )
        self.assertIn('<title>Who owns what</title>', html)
        self.assertIn('2026-05-17', html)
        self.assertIn('https://www.varunchoraria.com/who-owns-what/', html)
        self.assertIn('<p>Body.</p>', html)
        self.assertIn('Varun Choraria', html)

    def test_title_markup_is_escaped_not_injected(self):
        html = downloads.document(
            title='Tools & <script>toys</script>',
            date='2026-05-17',
            url='https://www.varunchoraria.com/x/',
            body='<p>Body.</p>',
        )
        self.assertIn('Tools &amp; &lt;script&gt;toys&lt;/script&gt;', html)
        self.assertNotIn('<script>toys', html)


class TargetTests(unittest.TestCase):
    def test_name_comes_from_the_published_url_not_the_slug(self):
        # A post may set its own permalink, and then its slug directory in
        # _site is only a redirect stub. Everything keys off the URL the
        # reader actually lands on, so the two sides cannot drift.
        self.assertEqual(
            downloads.download_name('https://www.varunchoraria.com/11-sessions-are-not-a-ux-audit/'),
            '11-sessions-are-not-a-ux-audit',
        )
        self.assertEqual(downloads.download_name('/who-owns-what/'), 'who-owns-what')

    def test_page_path_follows_the_published_url(self):
        self.assertEqual(
            downloads.page_path('_site', 'https://www.varunchoraria.com/11-sessions-are-not-a-ux-audit/'),
            os.path.join('_site', '11-sessions-are-not-a-ux-audit', 'index.html'),
        )

    def test_page_path_strips_a_baseurl(self):
        self.assertEqual(
            downloads.page_path('_site', 'https://example.github.io/repo/who-owns-what/', baseurl='/repo'),
            os.path.join('_site', 'who-owns-what', 'index.html'),
        )

    def test_paths_match_the_hrefs_the_essay_layout_writes(self):
        targets = downloads.post_targets('_site', 'who-owns-what')
        self.assertEqual(
            targets['epub'],
            os.path.join('_site', 'downloads', 'who-owns-what', 'who-owns-what.epub'),
        )
        self.assertEqual(
            targets['pdf'],
            os.path.join('_site', 'downloads', 'who-owns-what', 'who-owns-what.pdf'),
        )


if __name__ == '__main__':
    unittest.main()
