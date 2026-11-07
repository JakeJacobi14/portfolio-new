# 0009 — Constellation v2: a night sky instead of polka dots

**Date:** 2026-11-07
**Status:** accepted

(An earlier ADR 0009 about a 12-column grid and background was reverted the same day along
with its code; this number is reused.)

## Context
Constellation v1 (ADR 0008) drew every commit as a dot sized by change and colored by type
with the existing palette: filled `--fg`, `--accent`, `--muted`, and hollow rings for docs.
On screen it read as polka dots. I wanted it to feel like a real night sky, in the spirit
of Eleanor Lutz's constellation maps: tiny points, a few bright stars, faint thin lines,
lots of empty space. Data pipeline, interactions, keyboard navigation and build timing
stay the same; only the rendering changes.

## Options considered
1. **Keep v1 and tune it.** Smaller dots, fewer colors. Still a chart, not a sky.
2. **Night sky (chosen).** Filled near-white stars on a power curve, halos on the few
   bright ones, stardust, milestone figures, a slow twinkle.

Choices made inside option 2:
- **Which stars are bright:** a size threshold made about a quarter of stars bright with
  realistic data. Switched to rank: the biggest 8% of commits, plus every milestone.
- **Which stars a milestone joins:** "the brightest commits in its range" drew lines across
  the whole sky, because neighbours in time land 137.5° apart in phyllotaxis. Now each
  milestone takes the brightest 4 of its 6 nearest commits in range, joined by a minimum
  spanning tree, so figures stay local.
- **Stardust in SVG or canvas:** measured first. Drawing all specks as two `<path>`
  elements (not one element each) keeps 500 stars and about 1,260 specks fast: hover and
  milestone highlight stay within two frames at 4× CPU throttle, idle twinkle costs
  about 0% main-thread time. No canvas.
- **Label font:** the brief asked for Geist Mono, which DESIGN.md §9 bans; labels use
  IBM Plex Mono, letter-spaced, as already agreed.

## Decision
Option 2. Star colors are new tokens (`--star`, `--star-warm`, `--star-cool`), never the
accent. Milestone labels get a new size below the scale (`--text-2xs`, 10px). §9 gets one
exception to "no gradients": the soft halo on bright stars. Hovering a milestone now
brightens its figure and dims the rest of the sky, replacing v1's dim-later-commits and
traced path. Details in DESIGN.md §4, §5, §7, §8.

## Why
v1 looked like polka dots. A sky matches the idea better (every star is a commit, and the
sky grows with the site) and is quieter next to the name.

## Consequences
- With one real tag (`v0.0-setup`), the live sky has one tiny figure. More tags (milestones)
  mean more constellations, so tagging releases now has a visible payoff.
- At about 10 commits the sky is very sparse, mostly faint points.
- Twinkle is the first idle animation on the site; it's off for reduced motion.
