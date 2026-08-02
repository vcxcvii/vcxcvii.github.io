# Site changelog voice and commit format

The deploy reads structured commit-body trailers. It does not call an AI model.
For a release worth logging, use:

```text
Changelog-Title: [title]
Changelog-Summary: [summary]
Changelog-Benefit: [label] | [concrete sentence]
Changelog-Benefit: [label] | [concrete sentence]
```

Use two or three benefits. The fields must follow the voice and shape below.

## Job

Turn public Git commits into the few site updates a visitor would care about.
This is editorial synthesis, not release-note transcription.

## What earns an entry

Publish only when a change materially improves at least one visitor outcome:

- find a page, person, essay, service, or tool;
- understand what something is, who it is for, or what happens next;
- use the site or a published tool with less effort;
- read, navigate, share, subscribe, or connect from a smaller screen or assistive technology;
- trust the site's sourcing, privacy, security, freshness, or stated limits.

Do not publish repository maintenance, dependency churn, tests, build scripts,
README edits, renamed internal files, encrypted or private notes, formatting-only
changes, or labels nobody would notice. Several commits may form one update.

## Voice

- First person when motive or judgment matters. Otherwise state the change directly.
- Outcome first. Mechanism second.
- Plain English. Specific nouns and verbs.
- Direct, slightly self-aware, never promotional.
- Admit what was confusing, broken, missing, too heavy, or not worth keeping.
- Explain why the choice helps a reader. Do not congratulate the site for having features.
- Short title with a point of view. One compact summary. Two or three benefit bullets.
- Sentence case.
- No em dashes, exclamation marks, hype, fake metrics, corporate language, or SEO filler.
- Never use: seamless, robust, leverage, enhance, optimize, cutting-edge,
  game-changing, world-class, revolutionary, unlock, supercharge.
- Do not invent outcomes, measurements, motives, or user reactions.

## Shape

Title:

`[thing] now [visitor outcome]` or `[old friction] stopped [hurting outcome]`

Summary:

Say what changed and why. Keep the useful tension. Forty to seventy words.

Benefits:

Two or three labels, each followed by one concrete sentence. Labels use two to
four words. Avoid repeating the title.

## Approved examples

### Side projects now explain the payoff before sending you to the code

Interview Recon, Master Shifu, and Michealangelo now have proper pages. You can
work out what each tool is for, what it gives you, where it stops, and how to
install it without reverse-engineering a README.

- Choose faster: Each page leads with the outcome, then explains the mechanism and limits.
- Install without guesswork: Commands, supported agents, free-tier constraints, and expected outputs live in one place.

### Speaking and media stopped hiding behind a page called Fun

The old Fun page mixed a book, talks, and podcast appearances under a label that
explained none of them. It is now Speaking & Media, with a useful URL and a
short list of episodes worth starting with.

- Find the proof: Talks, podcast seasons, and the book now sit under a name people would search for.
- Start somewhere useful: Eight recommended episodes replace the job of digging through two complete seasons.

### The default Jekyll theme came out; a real personal site went in

I rebuilt the site around my writing, work, and side projects, then connected
GitHub Pages so changes deploy from the repository. This is where the current
site starts.

- One home: Writing, work, speaking, and experiments became parts of the same site.
- Changes stay accountable: The public repository records what changed and GitHub Pages ships it.
