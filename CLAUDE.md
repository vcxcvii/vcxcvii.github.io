<!-- RAINMAKER:START -->
## Rainmaker

When the user says "run rainmaker", or wants SEO, AEO, content or site-strategy work in this project, invoke the `rainmaker` skill. If the host does not surface skills by name, read `.agents/skills/rainmaker/SKILL.md` and follow it.

The skill runs the whole workflow — setup, audit, buyer interview, fixes — and resumes wherever it left off. Do not drive the `rainmaker` CLI by hand in its place.

Read `RAINMAKER.md` before that work. Never run the standalone `rainmaker agent` command inside an assistant.
<!-- RAINMAKER:END -->

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.
