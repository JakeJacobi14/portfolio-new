# 0003 — Typography: Schibsted Grotesk and IBM Plex Mono

**Date:** 2026-11-05
**Status:** accepted

## Context
`DESIGN.md` §9 rules out Inter, Geist, Space Grotesk and Space Mono, the usual defaults on
AI-built sites. I wanted type that feels clean and modern but a bit warmer, plus a mono for
labels that suits the engineering side. Fonts had to be free.

## Options considered
1. **Schibsted Grotesk + IBM Plex Mono.** A clean grotesk with some warmth that isn't
   everywhere yet. Plex Mono looks like engineering tooling without looking like a terminal.
2. **A serif display (e.g. Newsreader) + grotesk body.** More editorial, but "modern and
   clean" pointed away from serif headlines.
3. **Satoshi / General Sans (Fontshare).** Good, but already common on portfolio sites.

## Decision
Schibsted Grotesk for display and body, IBM Plex Mono for labels and metadata, loaded from
Google Fonts. Scale: ratio 1.25 from 16px.

## Why
Claude proposed it as a concrete default and I approved it so we could see a real page.
It avoids the never-list fonts and reads as clean without being generic.

## Consequences
- Two font families from Google Fonts is a third-party request. Self-hosting is an easy
  later improvement.
- Like the concept, this is expected to be revisited once I react to real screens.
