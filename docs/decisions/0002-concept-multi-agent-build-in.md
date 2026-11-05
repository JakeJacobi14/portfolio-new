# 0002 — Concept: multi-agent build-in

**Date:** 2026-11-05
**Status:** accepted (expected to be refined once there's something running)

## Context
The site needs one signature interaction. The starting point was the IgnitronDev reel
(see `docs/inspiration/`), where a swarm of cursor "agents" appears to build the page live.
I liked the idea of the site being built in front of you, but the reel was too cluttered.
`DESIGN.md` listed three candidate directions; I picked between those and a fourth.

## Options considered
1. **A. Single cursor.** One cursor sketches guide lines, the headline sets itself, then the
   cursor leaves (~2s). This fits "one signature interaction" most closely, but it's a
   pared-down version of the reel's idea.
2. **B. Blueprint.** The page arrives as a faint wireframe, and sections resolve as they
   scroll into view. It's the calmest option, but the "build" repeats down the page instead
   of being one moment.
3. **C. Graph / fault tree.** Content resolves as nodes in a graph, a nod to my engineering
   work. It's the most personal, but the easiest to overdo, and it can make plain content
   hard to read.
4. **Multi-agent build-in (new).** 4–6 cursors build the page together. It stays closest to
   the reel, but with far fewer moving parts.

## Decision
Multi-agent build-in: 4–6 cursors appear to build the page in front of the visitor. It's a
restrained, less cluttered take on the IgnitronDev reel.

## Why
- What drew me in was the build-before-your-eyes idea itself. I'm taking that idea, and
  everything else can be changed to make it more my own.
- I'd rather start working and refine it as I go than wait for a perfect idea. I don't
  expect to have better ideas until I see something running.
- The personal side doesn't have to come from the animation. One portfolio entry will be
  this site itself, with its version history or timeline.
- What a recruiter should take away before they see my projects: a really clean, cool,
  not-obviously-vibe-coded portfolio.

## Consequences
- This revises the "as few moving parts as possible" line in `DESIGN.md`. The build-in now
  uses 4–6 agents, so restraint has to come from timing, density and how quickly the page
  settles, not from the number of cursors.
- The ~2s ceiling in `DESIGN.md` §9 still applies. With more cursors there's a bigger risk
  of going over it.
- The reel's influence is obvious. That's acceptable for now, but I should look at it again
  once the build-in works.
- Open: whether cursors get labels (e.g. roles tied to the real process), or stay unlabeled
  and purely visual.
- Open: exact count, choreography, and what each cursor draws.
