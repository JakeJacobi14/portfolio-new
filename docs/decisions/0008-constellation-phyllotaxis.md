# 0008 — Commit constellation: phyllotaxis in the hero, spiral for Making-of

**Date:** 2026-11-07
**Status:** accepted

## Context
The central element (DESIGN.md §8, TBD until now) becomes a "commit constellation": every
node is a real commit to this repo, oldest at the center, newest at the edge, so the image
grows with each deploy. It has to look good at about 20 to 40 commits (launch) and at 500.
Claude sketched two layouts.

## Options considered
1. **A. Phyllotaxis (sunflower).** Node *i* at radius `c·√i`, angle `i·137.5°`. Even
   density, so it looks full at any count. Lines between consecutive commits jump around
   and make a starburst.
2. **B. Archimedean spiral.** Nodes evenly spaced along an outward spiral; lines trace it,
   so time reads clearly. A variant spaces nodes by real time, so work sessions cluster.
   At launch size it is a small, sparse curl in a large hero.

## Decision
A for the hero, with **nodes only by default**:
- During the build-in, agents draw each path segment as they place nodes, then the lines
  fade out.
- Hovering a milestone draws the path through every commit up to it, in order.
- At most a few faint lines between milestones may stay.

B (the time-spaced variant) is kept for the `/making-of` timeline.

## Why
- A looks finished at every size; B looks unfinished at launch size.
- The sunflower is the stronger image, and recognizably mathematical (golden angle, √i),
  which fits the math minor without explanation.
- Time still reads as center to edge. Reading exact order is the timeline's job, not the
  hero's, so the noisy starburst lines only appear as a brief reveal.

## Consequences
- The hero and Making-of show the same data in two forms: art and story.
- Consecutive-path drawing becomes an interaction (milestone hover) and a build-in step, not
  a permanent layer.
- Two layout functions to maintain, sharing one data file.
