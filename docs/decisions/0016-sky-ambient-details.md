# 0016 — Two ambient sky details: stars notice the pointer, an occasional shooting star

**Date:** 2026-11-07
**Status:** accepted

## Context
I asked for two small details in the sky after the build-in: stars that react to the
cursor, and an occasional faint shooting star. Both had to stay subtle (noticing, not a
hover effect), leave the star tooltips alone, wait for the build-in to finish, and be off
for reduced motion (proximity also off for touch).

## Options considered
Proximity:
1. **Per-star CSS variable (`--near`, 0..1) driven from one rAF loop (chosen).** Opacity
   and core size are calculated from it in CSS, and twinkle multiplies the lifted value, so
   twinkling stars lift too. Only stars whose value changes are written.
2. **A glow that follows the pointer.** Simpler, but it lights empty sky, not stars.

Shooting star tail:
1. **A line that draws and erases itself with `clip-path` (chosen).** No gradient needed.
2. **A gradient tail.** Would need another exception to §9's no-gradients rule.

## Decision
- Within 120px of the mouse, stars lift by up to 40% toward full opacity and 20% in core
  size, smoothstep falloff, eased with a 140ms time constant.
- Every 15 to 20s, a 1px streak 140 to 220px long, 600ms, peak 35% opacity, across the sky
  or near the bottom of the hero, only while the hero is in view and the tab is visible.
- The build-in sets a `hero-building` class while the hero is built; both details check it.

## Why
The decisions follow my brief; the clip-path tail keeps §9 intact.

## Consequences
- Fixed along the way: star tooltips were disabled until the whole page had been built,
  including sections not yet scrolled to (they checked the class that stays on for the
  entire build). They now check `hero-building` too, so they work as soon as the hero is
  done.
- The proximity lift is strongest on dim stars; bright stars are already near full opacity.
