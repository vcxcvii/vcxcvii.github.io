---
title: "Four ways my agents broke, and what each one taught me"
seo_title: "Four ways my AI agents broke, and what they taught me"
date: 2026-08-02 00:00:00 +0530
description: "A fork bomb, an agent that rewrote its own tool mid-task, a version pin that broke everything silently, and a guardrail that blocked me. Four rules."
last_modified_at: 2026-08-02 00:00:00 +0530
mcp: true
tags:
  - ai
  - management
  - frameworks
---

Everybody writes the post about what their AI agents did well. Almost nobody writes the other one, which is a shame, because the other one is where the actual lessons are.

So here are four things that broke on me, in the order they hurt.

I've written before about [what this actually costs](/how-to-get-1492-out-of-a-20-claude-subscription/). This is the other column of that ledger.

## One: the command that summoned 280 copies of itself

I typed a command. Nothing happened. No output, no error, no prompt coming back.

What was happening was that my own tool had spawned roughly 280 copies of itself, each one launching the next.

The cause is almost funny. When you build a program, the build tool writes out a file. That file needs a permission flag on it that says "you are allowed to run this." My build tool wasn't setting it.

Here's the part worth remembering: a program file without that flag isn't treated as broken. It's treated as **invisible**. The shell looks for a command by that name, sees a file it isn't allowed to run, and keeps looking as if the file were not there at all. So it kept looking, found a small wrapper script further down the list, and ran that instead. The wrapper's job was to say "I can't find the real thing, go fetch it." Fetching it meant looking up the same name again. It found the same wrapper. Which fetched it again.

Two things made it hard to catch.

It never happened to anyone else, because when you install software properly, the installer sets that flag for you. It only bit me, on my own machine, when I was testing a local build. Which meant it looked random, and random bugs are the ones you waste days on.

And there was no error to search for. It just hung. If a command ever hangs on you with no output, count the processes before you sit there waiting:

```bash
ps aux | grep -c "[r]ainmaker"
```

A number that climbs is a loop. That one command would have saved me an afternoon.

**The rule:** an intermittent bug is usually shaped like the environment, not like the code. When something breaks only on your machine, stop reading the logic and start listing what's different about your machine.

The fix was two lines: a script that sets the flag after every build, and a marker inside the wrapper so that if the loop ever comes back it stops at the first cycle and prints one sentence instead of eating the laptop.

## Two: the agent that rewrote its own tool while I was using it

I was ten minutes into a session, walking an agent through an interview about a business. Mid-conversation, it decided the tool it was running had a flaw, and went off to rewrite the tool.

Twenty-five thousand tokens. Ten minutes. I was not asked.

To be fair to it, the flaw was real. That's what makes this the interesting failure rather than a dumb one. The agent wasn't wrong about the code. It was wrong about whose call it was.

I had written the rule down. It was in the README, in plain English, saying don't do this.

The model does not read the README. It reads the file that defines the skill.

**The rule:** a rule written where the model doesn't look is not a rule. It's a note to yourself.

The fix was to move five hard boundaries into the file the model actually loads, and then write a test for each one so they can't quietly rot:

- Don't modify yourself
- Don't edit the user's site while you're diagnosing it
- Don't ship anything on the user's behalf
- Don't hand-write data files that a program is supposed to generate
- Don't estimate a number the tool can compute

The last one is my favourite, because guessing a number that's a command away is the most human failure on the list.

## Three: the version pin that turned everything off, silently

This one produced no error at all, which makes it the worst of the four.

The tool is built as an orchestrator with twenty-six smaller skills underneath it. The orchestrator runs the conversation and produces the context. Each small skill refuses to run without that context, on purpose, because a skill that guesses at missing context produces confident nonsense.

I shipped version 0.3.1 with the orchestrator in it. The installed plugin was pinned at 0.2.1, which had only the twenty-six small skills and no orchestrator.

So every single skill did exactly what it was designed to do. It checked for context, found none, and politely declined. Twenty-six correct refusals adding up to a product that did nothing.

Nothing crashed. Nothing logged an error. It just sat there being useless in a well-mannered way.

I found three more of the same shape once I went looking. A setting written into every config file and read by nothing, because the code that chose it only ever looked at the command-line flag. A startup hook that told the assistant to run a shell command, so it ran the command and stopped, instead of loading the skill. A pointer file written to one filename when the assistant reads a different one.

Every one of those is the same bug wearing a different hat. The design lived in the prose. The plumbing quietly routed around it.

**The rule:** the design is not what you wrote in the document. It's what the delivery layer actually does. Check the hook text, the file names, the version pins, the config keys. That's where good designs go to die.

## Four: my own guardrail blocked me, and that was correct

Smallest one, and the one I'd defend hardest.

I published a post with a new tag on it. The deploy failed.

My publishing pipeline checks every post against an approved list of tags before it will build. A tag that isn't on the list stops the deploy. I'd forgotten I wrote that check, so for about a minute I was annoyed at myself.

Then I remembered why it exists. Tags with no page behind them, tags that are near-duplicates of each other, a taxonomy that quietly rots because adding a tag is easier than thinking about one. The check turns a slow invisible mess into a fast visible failure.

**The rule:** the guardrail you wrote will eventually block you, and that's it working. The instinct to delete it in the moment is the instinct to trade a two-minute annoyance today for a mess in six months.

Which is a general point about working with agents. They will do exactly what the guardrails allow. Every rule you don't write is a rule you've decided not to have.

## What ties them together

Look at the four again and the pattern is uncomfortable.

None of them were the model being stupid. The fork bomb was a permission bit. The rewrite was a boundary in the wrong file. The version pin was a packaging mistake. The tag check was working perfectly.

The models were fine. My plumbing was not. And I think that's what most people mean when they say agents are unreliable: they've built something where the design lives in a prompt and the behaviour lives everywhere else.

So the habit that actually fixed things wasn't better prompting. It was writing failures down where the machine reads them again.

For the tool above, that's a file called `FEEDBACK.md`. Fifteen entries under "Fixed", each titled as the symptom rather than the fix. Next to it sits `SPEC.md`, which says in five clauses what "done" means, and every open item gets sorted against it. Anything that doesn't break a clause gets queued instead of debated. That one rule took my open list from six items to three, not because things got fixed but because things were finally allowed to leave the list.

On my own machine there's a memory directory. One file per fact, a summary line at the top, cross-linked. Twenty-one files. Why a build failed. Why a name is frozen. What a constraint actually was, six weeks after everyone stopped remembering.

None of it is clever. It's a diary the machine reads before it starts work.

And here's the ending I'd rather not write.

While fixing the version-pin problem in section three, I wrote the setup instructions for my agent into a file called `AGENTS.md`. Sensible name. Reads well. The assistant I actually use loads a file called `CLAUDE.md` on startup and never opens `AGENTS.md` at all.

So I sat down, wrote careful instructions, saved them, and shipped a tool that had never once read them.

That is the same failure as section two, which I had already found, already fixed, and already written a rule about. Months in, with the rule sitting in my own notes, I did it again with a different filename.

That's the honest ending. None of this stops you being wrong. It just means the second time is cheaper than the first, and there is always a second time.
