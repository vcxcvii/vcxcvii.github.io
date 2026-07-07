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

if errors.any?
  warn "Post validation failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "Post validation passed."
