# Design brief

> Source of truth for how this site looks, moves and feels. Claude must not invent values
> outside this file. Sections marked **TBD** are still being decided — fill them in before
> building the parts that depend on them.

## 1. Concept
**Working idea:** the site *builds itself in front of you* — but restrained. Where the
inspiration reel had dozens of cursors and dense wireframes, this site uses as few moving
parts as possible: a short, deliberate construction moment, then a calm, readable page.

Candidate directions (pick one, record it as an ADR):
- **A. Single cursor** — one cursor sketches thin guide lines, the headline sets itself, the
  cursor leaves. ~2s, plays once, small "replay" link.
- **B. Blueprint** — the page arrives as faint wireframe; sections resolve into real content
  as they scroll into view.
- **C. Graph / fault tree** — content resolves as nodes in a graph (nod to my engineering
  work: fault tree analysis, dependency graphs).

**Chosen:** **Multi-agent build-in** — see [ADR 0002](docs/decisions/0002-concept-multi-agent-build-in.md).
4–6 cursors appear to build the page in front of the visitor: a less cluttered take on the
reel, not a single cursor. Restraint comes from timing and density, not cursor count: the
build stays short (§9's ~2s limit applies) and ends in a calm, readable page.
Open: labeled vs. unlabeled cursors; exact count and choreography.

## 2. Three words
The site should feel: **TBD**, **TBD**, **TBD**
(Every design decision gets checked against these.)

## 3. What makes it mine
Personal details worth weaving in (not decorating with): TBD
Ideas so far: Spanish (bilingual touches?), math, biking, Oregon → Indiana.

## 4. Color
Minimal palette. Define as CSS custom properties in `src/styles/tokens.css`.
| Token | Value | Use |
|---|---|---|
| `--bg` | TBD | page background |
| `--fg` | TBD | primary text |
| `--muted` | TBD | secondary text, guides |
| `--accent` | TBD | the one accent color — used sparingly |
Dark mode / light mode: TBD

## 5. Typography
- Display: TBD
- Body: TBD
- Mono (labels, metadata): TBD
- Scale: TBD (e.g. a modular scale, ratio 1.25)
Free sources: Google Fonts, Fontshare, or a variable font.

## 6. Layout & spacing
- Grid: TBD
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px
- Max content width: TBD

## 7. Motion
- One signature moment (the build-in). Everything else is quiet: fades and small offsets only.
- Durations: TBD (e.g. 150ms micro, 300ms UI, 600–2000ms signature)
- Easing: TBD (one or two curves, reused everywhere)
- `prefers-reduced-motion: reduce` → skip the build-in, show the finished page.

## 8. Pages & sections
- Home: intro, selected work, about, contact — TBD
- Project pages (case studies): problem → process → outcome → what I'd change
- This site's own case study (built from `docs/`)

## 9. Never
- No generic gradient blobs, glassmorphism cards or stock "hero + 3 feature cards" layouts.
- No emoji as icons. No lorem ipsum in commits.
- No animation that delays reading content for more than ~2 seconds.
- No color, font or easing that isn't in this file.
