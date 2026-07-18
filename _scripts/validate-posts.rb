#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"
require "date"

errors = []
allowed_tags = YAML.safe_load(File.read("_data/tags.yml"), aliases: false)
allowed_tags = allowed_tags.map(&:to_s)
used_tags = []

Dir.glob("_posts/*.md").sort.each do |path|
  source = File.read(path)
  match = source.match(/\A---\s*\n(.*?)\n---\s*\n/m)

  unless match
    errors << "#{path}: missing front matter"
    next
  end

  front_matter = YAML.safe_load(match[1], permitted_classes: [Time, Date], aliases: false) || {}

  file_slug = File.basename(path, ".md").sub(/\A\d{4}-\d{2}-\d{2}-/, "")
  title_slug = front_matter["title"].to_s.downcase.delete("'’").gsub(/[^a-z0-9]+/, "-").gsub(/\A-+|-+\z/, "")
  unless front_matter["permalink"] || title_slug == file_slug || title_slug.start_with?("#{file_slug}-")
    errors << "#{path}: slug '#{file_slug}' does not match title (expected '#{title_slug}' or a prefix of it; set 'permalink' to override)"
  end

  tags = front_matter["tags"]

  if !tags.is_a?(Array) || tags.compact.empty?
    errors << "#{path}: missing tags"
    next
  end

  tags.each do |tag|
    tag_name = tag.to_s.downcase.strip
    tag_slug = tag_name.gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-+\z/, "")

    errors << "#{path}: tag '#{tag}' must be lowercase slug form '#{tag_slug}'" unless tag.to_s == tag_slug
    errors << "#{path}: unknown tag '#{tag}' (add to _data/tags.yml first)" unless allowed_tags.include?(tag_slug)

    tag_page = File.join("tags", "#{tag_slug}.md")
    errors << "#{path}: tag '#{tag}' is missing #{tag_page}" unless File.exist?(tag_page)
    used_tags << tag_slug
  end

  duplicate_tags = tags.map(&:to_s).group_by(&:itself).select { |_tag, matches| matches.size > 1 }.keys
  duplicate_tags.each do |tag|
    errors << "#{path}: duplicate tag '#{tag}'"
  end
end

used_tags.uniq.sort.each do |tag|
  tag_page = File.join("tags", "#{tag}.md")
  next unless File.exist?(tag_page)

  front_matter = YAML.safe_load(File.read(tag_page).match(/\A---\s*\n(.*?)\n---\s*\n/m)[1], aliases: false) || {}
  errors << "#{tag_page}: front matter tag must be '#{tag}'" unless front_matter["tag"] == tag
  errors << "#{tag_page}: title must be '#{tag}'" unless front_matter["title"] == tag
end

# CSP inline-script hashes: every inline <script> emitted by head.html must
# have a matching sha256 in the CSP meta tag, or browsers silently block it.
require "digest"
require "base64"

head = File.read("_includes/head.html")
head_expanded = head.gsub(/\{%\s*include\s+(\S+)\s*%\}/) { File.read(File.join("_includes", Regexp.last_match(1))) }
csp = head[/Content-Security-Policy" content="([^"]*)"/, 1].to_s

head_expanded.scan(%r{<script>(.*?)</script>}m) do |(body)|
  hash = "sha256-#{Base64.strict_encode64(Digest::SHA256.digest(body))}"
  errors << "_includes/head.html: inline script hash '#{hash}' missing from CSP script-src (script starts: #{body.strip[0, 40].inspect})" unless csp.include?(hash)
end

if errors.any?
  warn "Post validation failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "Post validation passed."
