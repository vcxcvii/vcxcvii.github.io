#!/usr/bin/env ruby
# frozen_string_literal: true

require "cgi"
require "json"
require "uri"

SITE_DIR = File.expand_path("../_site", __dir__)
SITE_URL = "https://www.varunchoraria.com"

abort "Built site missing at #{SITE_DIR}" unless Dir.exist?(SITE_DIR)

errors = []
html_files = Dir.glob(File.join(SITE_DIR, "**", "*.html")).sort

def internal_target(path)
  clean = CGI.unescape(path.split(/[?#]/, 2).first)
  clean = "/" if clean.empty?
  relative = clean.sub(%r{\A/}, "")
  candidates =
    if clean.end_with?("/")
      [File.join(SITE_DIR, relative, "index.html")]
    elsif File.extname(clean).empty?
      [
        File.join(SITE_DIR, relative),
        File.join(SITE_DIR, "#{relative}.html"),
        File.join(SITE_DIR, relative, "index.html")
      ]
    else
      [File.join(SITE_DIR, relative)]
    end
  candidates.find { |candidate| File.exist?(candidate) }
end

html_files.each do |file|
  relative_file = file.delete_prefix("#{SITE_DIR}/")
  html = File.read(file)

  html.scan(%r{<script\b[^>]*type=["']application/ld\+json["'][^>]*>(.*?)</script>}mi).each_with_index do |(source), index|
    begin
      data = JSON.parse(source)
      nodes = data["@graph"] || [data]
      Array(nodes).each do |node|
        types = Array(node["@type"])
        next unless types.include?("BlogPosting") || types.include?("Article")

        publisher = node["publisher"]
        unless publisher.is_a?(Hash) && publisher["name"] && publisher.dig("logo", "url")
          errors << "#{relative_file}: JSON-LD article publisher needs name and logo"
        end
      end
    rescue JSON::ParserError => e
      errors << "#{relative_file}: JSON-LD block #{index + 1} is invalid: #{e.message}"
    end
  end

  html.scan(/<a\b[^>]*target=["']_blank["'][^>]*>/i).each do |anchor|
    errors << "#{relative_file}: target=_blank link missing rel=noopener" unless anchor.match?(/\brel=["'][^"']*\bnoopener\b/i)
  end

  html.scan(/<img\b[^>]*>/i).each do |image|
    errors << "#{relative_file}: image missing alt" unless image.match?(/\balt=["'][^"']*["']/i)
    unless image.match?(/\bwidth=["']\d+["']/i) && image.match?(/\bheight=["']\d+["']/i)
      errors << "#{relative_file}: image missing numeric width and height"
    end
  end

  html.scan(/\b(?:href|src)=["']([^"']+)["']/i).flatten.each do |raw_url|
    next if raw_url.empty? || raw_url.start_with?("#", "mailto:", "tel:", "data:", "javascript:", "//")

    path =
      if raw_url.start_with?(SITE_URL)
        URI.parse(raw_url).path
      elsif raw_url.start_with?("/")
        raw_url
      else
        next
      end

    errors << "#{relative_file}: broken internal reference #{raw_url}" unless internal_target(path)
  rescue URI::InvalidURIError
    errors << "#{relative_file}: invalid URL #{raw_url}"
  end
end

if errors.empty?
  puts "Built-site QA passed: #{html_files.size} HTML files, valid JSON-LD, images, links, and external-link safety."
else
  warn errors.uniq.join("\n")
  abort "Built-site QA failed with #{errors.uniq.size} error(s)."
end
