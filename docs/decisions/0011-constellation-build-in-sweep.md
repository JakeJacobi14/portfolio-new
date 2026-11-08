# 0011 — Constellation build-in: a spiral sweep instead of a commit-order path

**Date:** 2026-11-07
**Status:** accepted

## Context
Since v1 the build-in placed stars in commit order while a line drew between consecutive
commits, then faded. Consecutive commits land 137.5° apart in the phyllotaxis layout, so
the line made a mess of overlapping triangles that then vanished.

## Options considered
1. **Keep commit order, drop the line.** The cursor would still zigzag across the sky.
2. **Sweep outward from the center (chosen).** A smooth path that keeps travel short. Order
   is roughly chronological anyway, since older commits sit nearer the center.

## Decision
Option 2. The agent follows an eased spiral from the center that ends on the newest
commit (about 1.7s). It doesn't visit every star: stars ripple in as the sweep reaches
their distance, with a quick scale-up, and the bright ones (plus any it passes right over)
get a faint ping ring that fades in 0.3s. A short trail follows the cursor (at most 0.2s and
about 30px). Stardust fades in ring by ring behind the sweep; milestone lines draw last.
Driven frame by frame, since the cursor follows a curve rather than a straight move.

## Why
The commit-order path was a mess. A sweep reads as "the agent is filling in the sky" and
still shows time growing outward.

## Consequences
- Strict commit order is no longer shown during the build; the tooltip and arrow keys
  still follow it.
- First version of the trail was time-limited only and drew long arcs where the eased
  sweep is fast; it's now also capped by length.
