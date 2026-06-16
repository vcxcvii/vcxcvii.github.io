#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"
require "date"

errors = []

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
    tag_slug = tag.to_s.downcase.strip.gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-+\z/, "")
    tag_page = File.join("tags", "#{tag_slug}.md")
    errors << "#{path}: tag '#{tag}' is missing #{tag_page}" unless File.exist?(tag_page)
  end
end

if errors.any?
  warn "Post validation failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "Post validation passed."
