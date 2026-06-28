#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Pre-push QA: SEO, AEO, design compliance, MCP compliance.
# Usage:
#   ruby _scripts/qa.rb              # checks files changed since last push
#   ruby _scripts/qa.rb path/to/file # checks specific files

require "yaml"
require "date"

VALID_LAYOUTS  = %w[default page home side-quests tags none].freeze
UTILITY_PATHS  = %w[feed/ mcp/ api/ blog/ archive/ tags/ _site/ _includes/ _layouts/].freeze
SEO_TITLE_MAX  = 60
SEO_DESC_MAX   = 160
AEO_WORD_MIN   = 100

def utility?(path)
  UTILITY_PATHS.any? { |u| path.include?(u) } ||
    path.match?(/README|DESIGN|Gemfile|CNAME|robots/)
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

files = if ARGV.any?
          ARGV.select { |f| File.exist?(f) }
        else
          `git diff --name-only origin/main..HEAD 2>/dev/null`.split("\n")
        end

content_files = files.select { |f| f.match?(/\.(md|html)$/) && File.exist?(f) && !utility?(f) }

if content_files.empty?
  puts "QA: no content files to check."
  exit 0
end

puts ""
puts "QA Check — #{content_files.size} file(s)"
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

  title = fm["title"].to_s.strip
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

    tags = fm["tags"]
    errs << "AEO: missing 'tags' — required for categorisation" unless tags.is_a?(Array) && tags.any?

    if tags.is_a?(Array)
      tags.each do |tag|
        slug = tag.to_s.downcase.gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-+\z/, "")
        warns << "AEO: tag '#{tag}' has no tag page — create tags/#{slug}.md" unless File.exist?("tags/#{slug}.md")
      end
    end
  end

  if is_page
    warns << "AEO: #{word_count} words — more content helps AI agents answer questions" if word_count < 50
  end

  # ── Design compliance ────────────────────────────────────────────────
  if fm.key?("layout") && !VALID_LAYOUTS.include?(fm["layout"].to_s)
    warns << "Design: unknown layout '#{fm['layout']}'"
  end

  warns << "Design: missing 'intro' field — used in page headers" if is_page && fm["intro"].to_s.strip.empty?

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
  if is_page && !fm["mcp"]
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
