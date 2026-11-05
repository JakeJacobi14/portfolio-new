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
The site should feel: **elegant**, **simple**, **human**
- **Elegant:** every decision is purposeful; the whole thing comes out beautiful and clean.
- **Simple:** everything on screen is needed. No fluff, no clutter.
- **Human:** agents build it in the animation, but the finished site shouldn't look vibe-coded.

In one line: modern and clean. These are a starting point; we'll refine them by reacting to
real screens, not in the abstract.

## 3. What makes it mine
Personal details worth weaving in (not decorating with): TBD
Ideas so far: Spanish (bilingual touches?), math, biking, Oregon → Indiana.

## 4. Color
Minimal palette, tinted neutrals plus one accent. Defined in `src/styles/tokens.css`.
**Status:** four candidates under comparison (switch with `?palette=<name>` or the palette
bar shown in dev). One gets picked, recorded as an ADR, and the rest are deleted.

| Token | Forest | Ember | Ink | Night (dark) | Use |
|---|---|---|---|---|---|
| `--bg` | `#F4F2EE` | `#F5F1EA` | `#EEF0F2` | `#171715` | page background |
| `--fg` | `#1C1B19` | `#1F1A17` | `#161A1F` | `#E8E5DF` | primary text |
| `--muted` | `#6E6A63` | `#6F675F` | `#5E6670` | `#9C978E` | secondary text, guides, hairlines |
| `--accent` | `#2F5D50` | `#B4441A` | `#1F4E8C` | `#8FB8A6` | cursors, links, focus. Used sparingly |

Contrast on `--bg` (all pass AA for body text):
Forest fg 15.4 / muted 4.8 / accent 6.7 · Ember 15.3 / 4.9 / 4.9 ·
Ink 15.3 / 5.1 / 7.3 · Night 14.3 / 6.2 / 8.2.
Dark mode / light mode: one mode only for now. Night exists to see if a dark site wins outright.

## 5. Typography
- Display and body: **Schibsted Grotesk** (Google Fonts, variable 400 to 700)
- Mono (labels, metadata, cursor tags): **IBM Plex Mono** (Google Fonts, 400 and 500)
- Scale: ratio 1.25 from 16px: `13 / 16 / 20 / 25 / 31 / 39 / 49` px
  (tokens `--text-xs` through `--text-3xl`)
- Weights: 400 body, 500 headings. Line height 1.5 body, 1.1 display.

## 6. Layout & spacing
- Grid: none yet. A single left-aligned column.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px (`--space-1` to `--space-10`)
- Max widths: text `65ch`, page `1120px`
- Side gutter: 16px under 640px, 32px above
- Corner radius: `0` (token `--radius`)
- Lines: 1px hairlines in `--muted` at reduced opacity separate list rows. No boxes or cards.

## 7. Motion
- One signature moment (the build-in). Everything else is quiet: fades and small offsets only.
- Durations: `150ms` micro (hover, focus), `300ms` UI, `1800ms` max for the build-in
- Easing: one curve everywhere, `cubic-bezier(0.2, 0, 0, 1)` (`--ease`)
- Build-in v0: 4 unlabeled cursors (custom SVG, `--accent`). Guide lines draw, each cursor
  travels to one section, and that section reveals as it arrives. Cursors and guides fade
  out. Plays once per browser session, with a "Replay build" control in the footer.
- `prefers-reduced-motion: reduce` → skip the build-in, show the finished page, hide replay.
- Library: Motion (`motion/mini`), see ADR 0004.

## 8. Pages & sections
- Home: intro, selected work, about, contact — TBD
- Project pages (case studies): problem → process → outcome → what I'd change
- This site's own case study (built from `docs/`)

## 9. Never
Goal: clean, and not obviously vibe-coded. Many of these come from a list of common
"vibe-coded site" tells, kept where they apply to this site.

**Color**
- No gradients (harsh or soft blobs), rainbow coloring, neon colors, or purple-on-black.
- No pure white `#fff` or pure black `#000` backgrounds. Use tinted neutrals.

**Surfaces**
- No drop shadows, glassmorphism / liquid glass, or colored left-stripe accents.
- Corner radius 0–2px only (exact value becomes a token). No soft, pill-shaped cards.

**Layout**
- No stock "hero + 3 feature cards in a row" layouts. No bento grids.
- No fake terminal windows (traffic-light dots, `$` prompts). Mono labels are fine.
- No decorative dot-grid backgrounds. Faint guide lines are allowed only as part of the
  build-in, and they fade once it ends.

**Icons**
- No emoji, no icon libraries (Lucide etc.), no sparkle icons, no checkmark bullets.
  Any icon we need, including the cursors, is a custom SVG.

**Type**
- Not Inter, Geist, Space Grotesk or Space Mono.

**Motion**
- No hover animation on everything. Hover states are reserved for things you can click.
- No animation that delays reading content for more than ~2 seconds.

**Copy** (everything a visitor reads: the site and the case study built from `docs/`)
- No em dashes. No "it's not X, it's Y" constructions.
- No lorem ipsum in commits.

**Process**
- No color, font, size, radius or easing that isn't in this file.
