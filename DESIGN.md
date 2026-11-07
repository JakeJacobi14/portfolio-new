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
reel, not a single cursor. The agents make everything on the page themselves: they type the
text, draw the lines, and drag elements into place and resize them. The first screen is
built on load and each later section as you scroll to it (see §7, ADR 0006, ADR 0007). It
can be skipped, and ends in a calm, readable page. Open: labeled vs. unlabeled cursors.

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
Night: a dark palette of tinted neutrals plus one accent. Defined in `src/styles/tokens.css`.
Chosen from four candidates (Forest, Ember, Ink, Night), see ADR 0005.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#171715` | page background |
| `--fg` | `#E8E5DF` | primary text |
| `--muted` | `#9C978E` | secondary text, guides, hairlines |
| `--accent` | `#8FB8A6` | cursors, carets, selection outlines, links, focus. Used sparingly |

Contrast on `--bg`: fg 14.3, muted 6.2, accent 8.2 (all pass AA).
Dark only. No light mode for now.

## 5. Typography
- Display and body: **Schibsted Grotesk** (Google Fonts, variable 400 to 700)
- Mono (labels, metadata, cursor tags): **IBM Plex Mono** (Google Fonts, 400 and 500)
- Scale: ratio 1.25 from 16px: `13 / 16 / 20 / 25 / 31 / 39 / 49` px
  (tokens `--text-xs` through `--text-3xl`)
- Weights: 400 body, 500 headings. Line height 1.5 body, 1.1 display.

## 6. Layout & spacing
- Grid: none. A single left-aligned column, except the intro: from 960px up it is two
  columns (text 3fr, central element 2fr). Breakpoints: `640px`, `960px`.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px (`--space-1` to `--space-10`)
- Max widths: text `65ch`, page `1120px`
- Side gutter: 16px under 640px, 32px above
- Corner radius: `0` (token `--radius`)
- Lines: 1px hairlines in `--muted` at reduced opacity separate list rows. No boxes or cards.
  The central element's frame uses the same hairline.

## 7. Motion
- One signature moment (the build-in). Everything else is quiet: fades and small offsets only.
- Durations: `150ms` micro (hover, focus), `300ms` UI. The build-in takes as long as the
  first screen needs: measured about 10s on a 1440×900 desktop and 7s on a phone (page load
  to guides faded). Later sections take 1 to 4s each as they appear. Cursor moves take 0.3s to 0.7s depending on distance; lines 0.35s to 0.6s.
- Easing: one curve everywhere, `cubic-bezier(0.2, 0, 0, 1)` (`--ease`)
- Build-in: 4 unlabeled cursors (custom SVG, `--accent`) make everything on the page.
  Three kinds of action:
  - **Type:** text appears one character at a time behind a 2px `--accent` caret, at a
    slightly uneven, human pace (display about 70ms per character, labels about 35ms, body
    about 17ms).
  - **Draw:** guide lines and hairlines grow along with the cursor that draws them.
  - **Drag and resize:** boxes (nav, central element, Replay button) appear small and out of place with a
    1px `--accent` selection outline, get dragged to their spot, then resized from the
    bottom-right corner to full size.
  The first screen is built on load; guides fade when it's done. Every later section starts
  empty and is built when it scrolls into view (its top 15% into the screen, or visible at
  the end of the page): agents come in from the side, build it, and leave. Tasks go to
  whichever agent is free first.
  Plays once per browser session (on every load in dev, for reviewing). A "Skip" button
  (and Esc) ends it at any point, and a "Replay build" control sits in the footer.
- `prefers-reduced-motion: reduce` → skip the build-in, show the finished page, hide replay.
- Library: Motion (`motion/mini`), see ADR 0004.

## 8. Pages & sections
- Home: intro (with a central element), selected work, about, contact
- Central element: TBD. For now a wireframe placeholder (a framed box with two diagonals)
  that the agents build.
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
- No animation that delays reading content for more than ~2 seconds unless it can be skipped.
  The build-in is the one exception: skippable, once per session, and off for reduced motion.

**Copy** (everything a visitor reads: the site and the case study built from `docs/`)
- No em dashes. No "it's not X, it's Y" constructions.
- No lorem ipsum in commits.

**Process**
- No color, font, size, radius or easing that isn't in this file.
