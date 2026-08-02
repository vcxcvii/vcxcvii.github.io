<!-- RAINMAKER:START -->
## Rainmaker

When the user says "run rainmaker", or wants SEO, AEO, content or site-strategy work in this project, invoke the `rainmaker` skill. If the host does not surface skills by name, read `.agents/skills/rainmaker/SKILL.md` and follow it.

The skill runs the whole workflow — setup, audit, buyer interview, fixes — and resumes wherever it left off. Do not drive the `rainmaker` CLI by hand in its place.

Read `RAINMAKER.md` before that work. Never run the standalone `rainmaker agent` command inside an assistant.
<!-- RAINMAKER:END -->

## Visitor changelog

For a visitor-facing change worth logging, add these commit-body trailers:

```text
Changelog-Title: 20 to 110 characters
Changelog-Summary: 60 to 420 characters
Changelog-Benefit: Two to four words | One concrete sentence.
Changelog-Benefit: Two to four words | One concrete sentence.
```

Use two or three benefits. Omit the trailers for internal work or changes that
do not materially help a visitor. The deploy workflow validates and publishes
the trailers without an external model or API key.
