# 0022 — After hours: plain photos, no star field

**Date:** 2026-11-12
**Status:** accepted (replaces the star field part of ADR 0018)

## Context
Each after hours card was drawn as a field of tiny points of light until hovered (ADR 0018).
Earlier today I compared five versions of the hover (none, fade, converge, agent, develop)
and picked converge, then sped it up twice. Even at its fastest, the photos were hard to see:
at rest you only saw stars, and you had to hover each one to see what it was.

## Options considered
1. **Keep tuning the star field** (faster, brighter, denser): keeps the sky theme in the
   strip, but the photos are still hidden behind an effect.
2. **Plain photos**: the photos are what people came to see; the theme lives elsewhere
   (the hero's commit constellation, click stars).

## Decision
Plain photos. The canvas, the sampling, the converge animation and its tokens
(`--dur-converge`, `--dur-linger`, `--dur-fade-back`) are removed. The strip, the card
shapes, the agent that swaps cards and the lightbox stay.

## Why
The effect made the content worse. One signature interaction is enough, and the
constellation already is it.

## Consequences
Less JS and one fewer image per card. The strip no longer echoes the sky by itself; any
decoration that ties it back to the theme has to be quieter than this was.
