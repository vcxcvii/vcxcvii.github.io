#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Pre-push QA: SEO, AEO, design compliance, MCP compliance.
# Usage:
#   ruby _scripts/qa.rb              # checks files changed since last push
#   ruby _scripts/qa.rb --all        # checks every tracked content file
#   ruby _scripts/qa.rb path/to/file # checks specific files

require "yaml"
require "date"

VALID_LAYOUTS  = %w[default page home entry listing archive tag_archive side-quests tags none].freeze
# private/ holds password-gated pages built by _scripts/build-private.mjs. They
# are AES-GCM ciphertext plus a decrypt shim, not content: no frontmatter to
# lint, no prose to check, and they are noindex by design.
NON_CONTENT_PATHS = %w[.agents/ api/ _site/ _includes/ _layouts/ _scripts/ private/].freeze
SEO_TITLE_MAX  = 60
SEO_DESC_MAX   = 160
AEO_WORD_MIN   = 100

# ── Lightweight publication guardrails ───────────────────────────────
FORBIDDEN_PATTERNS = %w[
  nav-root shadcn tailwind @font-face box-shadow linear-gradient radial-gradient
  backdrop-filter
].freeze
FORBIDDEN_ASSETS = %w[
  assets/js/analytics.js assets/js/clarity.js assets/js/nav.js
  assets/js/redesign.js assets/css/nav.css _includes/theme-init.js
].freeze
REQUIRED_COLORS = %w[#0000ee #0057ff #9be9a8 #40c463 #30a14e #216e39].freeze
# Compiled bytes, which is what every page inlines. Raised from 14_000 when the
# page light shipped: three grounds instead of two means the dark palette is
# emitted twice, once for the system query and once for the stored choice, and
# the theme swatches are on every page. The ceiling is deliberately close to
# the current figure so the next feature has to justify itself the same way.
CSS_BUDGET = 16_800
GITHUB_JS_BUDGET = 8_000
# Every script the site is allowed to ship, with its own budget. An allowlist
# rather than a count: a new file is a deliberate decision that shows up in a
# diff here, and anything not named still fails the cleanup check below.
ALLOWED_JS = {
  "assets/js/gh-graph.js" => GITHUB_JS_BUDGET,
  "assets/js/copy-code.js" => 3_000,
  "assets/js/changelog.js" => 3_000,
  "assets/js/days.js" => 2_000,
  "assets/js/theme.js" => 5_000,
}.freeze

# Money is written as figures, never as magnitude words. "six figures in
# expansion ARR" is how a consultant hedges; "$100K+ in expansion ARR" is how
# VC actually writes, and it survives being skim-read. A `+` marks a floor
# where the exact number is a client's to disclose rather than his.
MAGNITUDE_PHRASES = [
  /\b(?:two|three|four|five|six|seven|eight|nine)[ -]figures?\b/i,
  /\b(?:double|triple|quadruple)[ -]digits?\b/i,
].freeze

def magnitude_phrasing_errors
  errs = []
  files = `git ls-files -- '*.md' '*.html'`.split("\n").reject { |f| f.start_with?("_posts/") }
  files.each do |f|
    next unless File.exist?(f)

    File.read(f).each_line.with_index(1) do |line, number|
      MAGNITUDE_PHRASES.each do |pattern|
        next unless (hit = line[pattern])

        errs << "Voice: #{f}:#{number} says '#{hit}' — write the figure instead, e.g. $100K+"
      end
    end
  end
  errs
end

def read_file(path)
  File.exist?(path) ? File.read(path) : ""
end

# The stylesheet is inlined into every page, so what matters is the compiled
# size, not the source. Comments and indentation are stripped before shipping,
# and budgeting the source taxes them for nothing. Compiled with the same
# settings as _config.yml so this measures exactly what the page carries.
# Returns nil if sass is unavailable, so the caller can fall back.
def compiled_css_bytes(path)
  require "sass-embedded"
  Sass.compile(path, style: :compressed, source_map: false).css.bytesize
rescue LoadError, StandardError
  nil
end

def design_guardrails
  errs = []
  code_files = (
    Dir.glob("_sass/*.scss") +
    Dir.glob("assets/css/*.{scss,css}") +
    Dir.glob("assets/js/*.js") +
    Dir.glob("_layouts/*.html") +
    Dir.glob("_includes/*.html") +
    ["mcp/index.html", "feed/index.html"]
  ).uniq.select { |f| File.exist?(f) }

  code_files.each do |f|
    src = File.read(f).downcase
    FORBIDDEN_PATTERNS.each do |pattern|
      errs << "Design: forbidden heavyweight pattern '#{pattern}' in #{f}" if src.include?(pattern)
    end
  end

  FORBIDDEN_ASSETS.each do |path|
    errs << "Cleanup: forbidden legacy asset exists at #{path}" if File.exist?(path)
  end
  errs << "Cleanup: duplicate public logo assets found under assets/logos" if Dir.glob("assets/logos/*").any?

  css = "_sass/main.scss"
  css_source = read_file(css).downcase
  errs << "Design: missing #{css}" if css_source.empty?
  if File.exist?(css)
    shipped = compiled_css_bytes(css)
    if shipped
      errs << "Performance: compiled CSS is #{shipped} bytes, over the #{CSS_BUDGET} budget" if shipped > CSS_BUDGET
    elsif File.size(css) > CSS_BUDGET
      # Could not compile, so fall back to the source size. Stricter than the
      # real payload, but it never lets an oversized stylesheet through.
      errs << "Performance: #{css} source is #{File.size(css)} bytes, over the #{CSS_BUDGET} budget (could not compile to measure the shipped size)"
    end
  end
  REQUIRED_COLORS.each do |color|
    errs << "Design: required publication color '#{color}' missing from #{css}" unless css_source.include?(color)
  end

  github_js = "assets/js/gh-graph.js"
  ALLOWED_JS.each do |path, budget|
    next unless File.exist?(path)
    errs << "Performance: #{path} exceeds #{budget} bytes" if File.size(path) > budget
  end
  github_js_source = read_file(github_js)
  valid_booking_event = github_js_source.include?('send("cal_booking_clicked"') &&
                        github_js_source.include?('destination.hostname === "cal.com"')
  errs << "Analytics: Cal.com links must emit cal_booking_clicked" unless valid_booking_event
  js_files = Dir.glob("assets/js/*.js").sort
  errs << "Cleanup: assets/js must contain only #{ALLOWED_JS.keys.join(', ')}" unless js_files == ALLOWED_JS.keys.sort

  class_files = (
    Dir.glob("{_includes,_layouts,_posts,assets/js,mcp,feed,api,side-quests,tags,days}/**/*.{html,md,js,svg}") +
    Dir.glob("*.{html,md}")
  ).select { |f| File.file?(f) }
  class_corpus = class_files.map { |f| File.read(f).downcase }.join("\n")
  css_classes = css_source.scan(/\.([a-z][a-z0-9_-]*)/).flatten.uniq
  unused_classes = css_classes.reject { |name| class_corpus.include?(name) }
  errs << "Cleanup: unused CSS classes #{unused_classes.join(', ')}" unless unused_classes.empty?

  head = read_file("_includes/head.html")
  errs << "SEO: shared schema include missing" unless head.include?("include seo-schema.html")
  errs << "SEO: canonical metadata missing" unless head.include?('rel="canonical"') && head.include?("page.canonical_url")
  errs << "SEO: robots metadata missing" unless head.include?('name="robots"') && head.include?("page.noindex")
  errs << "SEO: RSS autodiscovery missing" unless head.include?('type="application/atom+xml"')
  errs << "SEO: favicon URL must remain stable between builds" if head.lines.grep(/rel="(?:apple-touch-)?icon"/).any? { |line| line.include?("asset_version") }
  errs << "Security: production CSP must not permit localhost sockets" if head.include?("ws://localhost")
  errs << "Performance: homepage LCP image preload missing" unless head.include?('rel="preload" as="image"') && head.include?("hero-photo.jpg")

  schema = read_file("_includes/seo-schema.html")
  %w[Person WebSite ProfilePage CollectionPage WebPage].each do |type|
    errs << "SEO: shared schema missing #{type}" unless schema.include?(type)
  end

  favicon = read_file("assets/favicon.svg").downcase
  valid_favicon = favicon.include?('fill="#ffffff"') && favicon.include?('fill="#0057ff"') && favicon.include?("<desc>")
  errs << "SEO: favicon must remain white with accessible electric-blue VC description" unless valid_favicon

  %w[archive/index.md notes/index.md].each do |path|
    source = read_file(path)
    valid_alias = source.include?("canonical_url: /blog/") && source.include?("noindex: true") && source.include?("sitemap: false")
    errs << "SEO: #{path} must remain a non-indexed alias of /blog/" unless valid_alias
  end

  nav = read_file("_includes/nav.html")
  errs << "Design: pure HTML site mark missing from navigation" unless nav.include?('class="site-mark"')
  errs << "Design: primary navigation must remain internal" if nav.include?('href="https://github.com/vcxcvii"')
  errs << "Design: blog must remain visible in navigation" unless nav.include?("site.data.navigation") && File.read("_data/navigation.yml").include?("url: /blog/")
  errs << "Design: side quests must remain visible in navigation" unless File.read("_data/navigation.yml").include?("url: /side-quests/")
  errs << "Design: mobile hamburger navigation missing" unless nav.include?('class="nav-toggle"') && nav.include?('class="menu-toggle"')
  overlay_nav = css_source.include?(".nav-toggle:checked ~ .site-links") &&
                css_source.include?("position: absolute") &&
                css_source.include?("z-index: 20")
  errs << "Design: mobile navigation must overlay content" unless overlay_nav

  home = read_file("_layouts/home.html")
  errs << "Design: homepage must render the full essay archive" unless home.include?("essay-list.html posts=site.posts")
  errs << "Design: homepage must retain GitHub activity" unless home.include?('data-gh-user="vcxcvii"')
  errs << "Design: homepage essays heading must link to /blog/" unless home.include?("'/blog/' | relative_url")
  errs << "Design: homepage must not render the footer tag index" if home.include?("include tag-list.html")
  errs << "Design: homepage calendar link missing" unless home.include?("https://cal.com/varun-choraria/30min")
  calendar_line = home.lines.find { |line| line.include?("https://cal.com/varun-choraria/30min") }
  errs << "Design: homepage calendar link must not show an external arrow" if calendar_line&.include?("&#8599;")
  errs << "Design: homepage MCP page link missing" unless home.include?("'/mcp/' | relative_url")
  errs << "Design: homepage portrait missing" unless home.include?("assets/images/hero-photo.jpg") && home.include?('width="168" height="168"')
  errs << "Design: homepage portrait must remain circular" unless css_source.include?(".home-portrait") && css_source.include?("border-radius: 50%")
  errs << "Design: homepage side-quest repositories missing" unless home.include?("include repo-list.html") && home.include?("'/side-quests/' | relative_url")
  essays_position = home.index('class="essays"')
  quests_position = home.index('class="side-quests-preview"')
  errs << "Design: homepage side quests must follow essays" unless essays_position && quests_position && essays_position < quests_position
  social_links = read_file("_includes/social-links.html")
  %w[linkedin.com twitter.com github.com npmjs.com cursor.com letterboxd.com].each do |host|
    errs << "Design: homepage social link missing #{host}" unless social_links.include?(host)
  end
  errs << "Design: homepage must include the social icon row" unless home.include?("include social-links.html")
  social_icon_count = social_links.scan("<svg").size + social_links.scan(%r{include logos/[a-z0-9-]+\.svg}).size
  social_label_count = social_links.scan(/<a[^>]+aria-label=/).size
  errs << "Design: every social profile needs one accessible icon" unless social_icon_count == social_label_count
  errs << "Design: social profiles must use six accessible icons" unless social_label_count == 6
  errs << "Design: social icons must not show external-arrow marks" if social_links.include?("&#8599;")

  about = read_file("about.md")
  errs << "Design: about page must not render a portrait" if about.include?("<img") || about.include?("about-portrait")

  footer = read_file("_includes/footer.html")
  errs << "Design: footer MCP link missing" unless footer.match?(/>MCP<\/a>/) && footer.include?("'/mcp/' | relative_url")
  errs << "Design: footer changelog link missing" unless footer.include?("changelog") && footer.include?("'/changelog/' | relative_url")

  changelog = read_file("changelog.md")
  changelog_js = read_file("assets/js/changelog.js")
  errs << "Design: changelog month controls missing" unless changelog.include?('data-changelog-controls') && changelog.include?('data-changelog-month')
  errs << "Design: changelog must retain a no-JavaScript full list" unless changelog_js.include?("Without JavaScript, every entry stays visible")
  errs << "Design: changelog controls must use 44px touch targets" unless css_source.include?(".changelog-controls") && css_source.include?("min-height: 2.75rem")
  errs << "Design: footer must link to the dedicated tag index" unless footer.include?("'/tags/' | relative_url")
  errs << "Design: footer must link to the canonical DESIGN.md" unless footer.include?("blob/main/DESIGN.md")
  errs << "Design: footer must not embed the complete tag index" if footer.include?("include tag-list.html")
  footer_ai_icons = %w[openai claude perplexity].all? { |name| footer.include?(%{logo.html name="#{name}"}) }
  errs << "Design: footer Ask AI links must use three accessible logos" unless footer_ai_icons && footer.scan(/aria-label="Ask /).size == 3
  %w[Work Read AI Site Ask].each do |heading|
    errs << "Design: footer section '#{heading}' missing" unless footer.include?(%{class="footer-heading">#{heading}</p>})
  end
  errs << "Trust: footer contact link missing" unless footer.include?("'/contact/' | relative_url")
  errs << "Trust: footer privacy link missing" unless footer.include?("'/privacy/' | relative_url")

  entry = read_file("_layouts/entry.html")
  related_rows_match_archive = entry.include?('<li class="essay-row">') && entry.include?('post.date | date: "%d %b"')
  errs << "Design: related essays must match homepage archive rows" unless related_rows_match_archive
  errs << "SEO: essay author byline missing" unless entry.include?('rel="author"') && entry.include?("Varun Choraria")
  article_image = entry.include?("article_image_path") && entry.include?("assets/images/varun-choraria-about.jpeg") && entry.include?('"image":')
  errs << "SEO: BlogPosting image and fallback missing" unless article_image
  valid_publisher = entry.include?('"publisher": {') &&
                    entry.include?('"name": "Varun Choraria"') &&
                    entry.include?('"logo": {')
  errs << "SEO: BlogPosting publisher name and logo missing" unless valid_publisher

  %w[contact.md privacy.md].each do |path|
    errs << "Trust: #{path} missing" unless File.exist?(path)
  end

  hunting = read_file("_posts/2026-07-24-hunting-season-for-the-rest-of-us.md")
  hunting_images = hunting.scan(/<img[^>]+hunting-season-[^>]+>/)
  complete_hunting_images = hunting_images.size == 6 &&
                            hunting_images.all? { |image| image.include?('width="') && image.include?('height="') } &&
                            hunting_images.drop(1).all? { |image| image.include?('loading="lazy"') }
  errs << "Performance: hunting-season images need dimensions and below-fold lazy loading" unless complete_hunting_images

  repo_list = read_file("_includes/repo-list.html")
  errs << "Design: side-quest rows must use destination-appropriate marks" unless repo_list.include?("logo.html name=quest.icon")
  errs << "Design: side-quest rows must link to their canonical destination" unless repo_list.include?("quest.link")
  errs << "Design: homepage side quests must use explicit feature flags" unless repo_list.include?("quest.featured")

  side_quests = read_file("side-quests/index.md")
  errs << "Design: dedicated side-quest page must use the shared quest data" unless side_quests.include?("site.data.quests")
  errs << "Design: dedicated side-quest page must remain a plain directory" if side_quests.include?("<details")

  quest_data = File.exist?("_data/quests.yml") ? YAML.safe_load(File.read("_data/quests.yml")) : []
  lazarus_pit = quest_data.find { |quest| quest["name"] == "Lazarus Pit" }
  valid_lazarus_pit = lazarus_pit &&
                      lazarus_pit["state"] == "Private" &&
                      lazarus_pit["link"] == "/side-quests/lazarus-pit/" &&
                      !lazarus_pit["repo_url"]
  errs << "Content: private Lazarus Pit must point at its own landing page, not a private repository" unless valid_lazarus_pit
  invalid_featured_quests = quest_data.select do |quest|
    quest["featured"] == true && (!quest["link"] || !quest["icon"])
  end
  errs << "Content: featured side quests require a link and icon: #{invalid_featured_quests.map { |quest| quest["name"] }.join(', ')}" unless invalid_featured_quests.empty?
  required_quests = ["Master Shifu", "Michealangelo", "VC's Notes", "Self-updating GitHub profile", "MCP server", "Lazarus Pit", "GTM Buddy Marketing Skills", "GTM Buddy Design and Engineering", "GTM Skills (SDR)"]
  quest_names = quest_data.map { |quest| quest["name"] }
  missing_quests = required_quests - quest_names
  errs << "Content: side-quest directory missing #{missing_quests.join(', ')}" unless missing_quests.empty?
  linked_private_quests = quest_data.select do |quest|
    quest["state"] == "Private" && (quest["link"].to_s.include?("http") || quest["repo_url"])
  end
  errs << "Content: private side quests may only link to an on-site landing page: #{linked_private_quests.map { |quest| quest["name"] }.join(', ')}" unless linked_private_quests.empty?
  unlabelled_quests = quest_data.reject { |quest| ["Public", "Private"].include?(quest["state"]) }
  errs << "Content: every side quest needs a Public or Private label: #{unlabelled_quests.map { |quest| quest["name"] }.join(', ')}" unless unlabelled_quests.empty?

  errs.concat(magnitude_phrasing_errors)

  errs
end

def non_content?(path)
  NON_CONTENT_PATHS.any? { |prefix| path.include?(prefix) } ||
    # AGENTS.md, CLAUDE.md, RAINMAKER.md and FEEDBACK.md are instructions to a
    # coding assistant or notes to a tool's author, not pages. They are tracked
    # so a clone or another machine gets the same setup, and they carry no
    # frontmatter because nothing renders them.
    path.match?(/README|DESIGN|Gemfile|CNAME|robots|AGENTS\.md|CLAUDE\.md|RAINMAKER\.md|FEEDBACK\.md/)
end

def parse_frontmatter(source)
  m = source.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  return [nil, source] unless m

  fm = YAML.safe_load(m[1], permitted_classes: [Time, Date], aliases: false) || {}
  body = source[m[0].length..]
  [fm, body]
rescue Psych::SyntaxError => e
  [nil, source]
end

arguments = ARGV.dup
scan_all = arguments.delete("--all")

files = if scan_all
          `git ls-files -- '*.md' '*.html'`.split("\n")
        elsif arguments.any?
          arguments.select { |f| File.exist?(f) }
        else
          `git diff --name-only origin/main..HEAD 2>/dev/null`.split("\n")
        end

content_files = files.select { |f| f.match?(/\.(md|html)$/) && File.exist?(f) && !non_content?(f) }

# Design guardrails run every time — they protect the whole repo, not just
# the changed content files.
design_errors = design_guardrails

if content_files.empty? && design_errors.empty?
  puts "QA: no content files to check; lightweight design guardrails pass."
  exit 0
end

puts ""
puts "QA Check — #{content_files.size} content file(s)"
puts "=" * 56

all_errors   = []
all_warnings = []

content_files.each do |path|
  errs  = []
  warns = []

  source = File.read(path)
  fm, body = parse_frontmatter(source)

  if fm.nil?
    errs << "Frontmatter: missing or invalid YAML"
    puts "\nFAIL  #{path}"
    errs.each { |e| puts "  ERROR  #{e}" }
    all_errors.concat(errs.map { |e| "#{path}: #{e}" })
    next
  end

  is_post = path.start_with?("_posts/")
  is_page = !is_post

  # Strip HTML tags and Liquid tags for word/heading counts
  plain = body
    .gsub(/\{%.*?%\}/m, "")
    .gsub(/<[^>]+>/, "")
    .strip
  word_count = plain.split.size
  has_headings = plain.match?(/^##/)

  title = (fm["seo_title"] || fm["title"]).to_s.strip
  desc  = (fm["description"] || fm["intro"]).to_s.strip

  # ── SEO ─────────────────────────────────────────────────────────────
  errs  << "SEO: missing 'title'" if title.empty?
  errs  << "SEO: missing 'description' or 'intro'" if desc.empty?
  warns << "SEO: title #{title.length} chars — ideal ≤ #{SEO_TITLE_MAX}" if title.length > SEO_TITLE_MAX
  warns << "SEO: description #{desc.length} chars — ideal ≤ #{SEO_DESC_MAX}" if !desc.empty? && desc.length > SEO_DESC_MAX

  # ── AEO ─────────────────────────────────────────────────────────────
  if is_post
    warns << "AEO: #{word_count} words — aim for #{AEO_WORD_MIN}+ for AI readability" if word_count < AEO_WORD_MIN
    warns << "AEO: no ## headings — structure helps AI agents parse content" unless has_headings
    errs << "SEO: Markdown H1 found; entry layout already renders the page H1" if body.match?(/^# /)

    tags = fm["tags"]
    errs << "AEO: missing 'tags' — required for categorisation" unless tags.is_a?(Array) && tags.any?

    if tags.is_a?(Array)
      tags.each do |tag|
        slug = tag.to_s.downcase.gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-+\z/, "")
        warns << "AEO: tag '#{tag}' has no tag page — create tags/#{slug}.md" unless File.exist?("tags/#{slug}.md")
      end
    end
  end

  dynamic_page = %w[listing archive tag_archive side-quests].include?(fm["layout"].to_s) || body.include?("include tag-list.html")
  if is_page && fm["layout"] != "home" && !fm["noindex"] && !dynamic_page
    warns << "AEO: #{word_count} words — more content helps AI agents answer questions" if word_count < 50
  end

  # ── Design compliance ────────────────────────────────────────────────
  raw_html_document = fm["layout"].nil? && body.lstrip.start_with?("<!doctype html>")
  if fm.key?("layout") && !raw_html_document && !VALID_LAYOUTS.include?(fm["layout"].to_s)
    warns << "Design: unknown layout '#{fm['layout']}'"
  end

  # Promoted from a warning once every page had one. The intro is the visible
  # standfirst the page layout renders under the H1, and it is the site's
  # answer to "summarise this page": a reader sees it, and it is what a machine
  # reads when there is no separate description. A page shipping without one is
  # a page with no summary anywhere, so it fails rather than warns.
  errs << "SEO: missing 'intro' field; it is the page's visible standfirst and its summary" if is_page && !fm["noindex"] && fm["intro"].to_s.strip.empty?

  if is_post
    raw_date = fm["date"]
    if raw_date.nil?
      errs << "Design: missing 'date'"
    elsif !raw_date.is_a?(Date) && !raw_date.is_a?(Time)
      begin
        Date.parse(raw_date.to_s)
      rescue ArgumentError
        errs << "Design: invalid date '#{raw_date}'"
      end
    end
  end

  # ── MCP compliance ───────────────────────────────────────────────────
  if is_page && !fm["noindex"] && !fm["mcp"]
    warns << "MCP: page not indexed by AI agents — add 'mcp: true' to frontmatter"
  end

  # ── Report ───────────────────────────────────────────────────────────
  status = errs.any? ? "FAIL" : (warns.any? ? "WARN" : "PASS")
  puts ""
  puts "#{status.ljust(4)}  #{path}"
  errs.each  { |e| puts "       ERROR  #{e}" }
  warns.each { |w| puts "       warn   #{w}" }

  all_errors.concat(errs.map   { |e| "#{path}: #{e}" })
  all_warnings.concat(warns.map { |w| "#{path}: #{w}" })
end

unless design_errors.empty?
  puts ""
  puts "Design guardrails (lightweight publication)"
  design_errors.each { |e| puts "       ERROR  #{e}" }
  all_errors.concat(design_errors)
end

puts ""
puts "=" * 56
puts "#{all_errors.size} error(s)   #{all_warnings.size} warning(s)"

if all_errors.any?
  puts ""
  puts "Push blocked — fix errors above, then push again."
  puts ""
  exit 1
else
  puts ""
  puts "All checks passed."
  puts ""
  exit 0
end
