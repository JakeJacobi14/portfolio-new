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

Star colors, for the commit constellation only (§8). Near-white with a slight temperature
shift; never the accent, which stays with the cursors, focus and links.

| Token | Value | Use |
|---|---|---|
| `--star` | `#E8E5DF` (same as `--fg`) | most commit types |
| `--star-warm` | `#F0E2CB` | `feat` |
| `--star-cool` | `#D6E0EA` | `fix`, `refactor` |
Dark only. No light mode for now.

## 5. Typography
- Display and body: **Schibsted Grotesk** (Google Fonts, variable 400 to 700)
- Mono (labels, metadata, cursor tags): **IBM Plex Mono** (Google Fonts, 400 and 500)
- Scale: ratio 1.25 from 16px: `13 / 16 / 20 / 25 / 31 / 39 / 49` px
  (tokens `--text-xs` through `--text-3xl`)
- Weights: 400 body, 500 headings. Line height 1.5 body, 1.1 display.
- One step below the scale for constellation milestone labels only: `10px` (`--text-2xs`),
  IBM Plex Mono, letter-spaced `0.12em` (`--tracking-label`).

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
- Twinkle (constellation only, §8): about 1 in 8 stars, chosen from the commit hash, slowly
  dims to 45% of its brightness and back. Each cycle takes 4 to 8s (`--twinkle-min`
  `4s`, `--twinkle-max` `8s`), eased with `--ease`, alternating. Off for reduced motion.

## 8. Pages & sections
- Home: intro (with a central element), selected work, about, contact
- Central element: the **commit constellation**, drawn as a night sky (ADR 0008, ADR 0009,
  ADR 0011, ADR 0012), in the intro's right column with no frame. Every star is a real commit to this repo (`npm run commits` →
  `src/data/commits.json`). Feel: Eleanor Lutz's constellation maps. Tiny points, a few
  bright stars, faint thin lines, lots of empty space.
  - **Layout:** phyllotaxis base (commit *i*, oldest first, at radius `c·√i`, angle
    `i·137.5°`), pushed off it by up to half the spacing in a direction seeded from the hash,
    so it reads as a sky but still grows outward. Same data, same image.
  - **No edge:** no frame or border. The sky's layer reaches 15% past the stars on every
    side, and a radial mask fades it from full at 40% of its radius to nothing at 92%, so
    the outer stars dissolve into the page. Nothing in it sits under the name or text.
  - **Stars:** filled points only, no rings. Size follows lines changed on a power curve, so
    most are tiny (1 to 2px across), some medium (2 to 3px), and only big commits and
    milestones are bright (4 to 6px core). Opacity 0.35 to 1, seeded from the hash and
    raised for bigger stars. Color by type: `--star-warm`, `--star-cool` or `--star` (§4).
  - **Halo:** bright stars only, a soft radial fade of their own color, about 3.2× the core,
    peaking at 28% opacity (kept small so the milestone figures stay the focal point).
  - **Stardust:** around each star, 0 to 6 specks (one per changed file after the first),
    1px, at 10 to 20% opacity. Decorative, never interactive, and only from real data.
  - **Constellation lines:** only milestones (git tags) form figures. Each milestone joins
    the 4 brightest of its 6 nearest commits since the previous milestone, with the
    shortest set of lines (a minimum spanning tree). Lines are `--muted`, about 0.7px, at
    25% opacity.
  - **Milestone labels:** the tag name in `--text-2xs`, `--tracking-label`, `--muted`,
    never over a star, a line or another label: eight directions are tried around the
    milestone (then farther out), the first clear one wins, nearer the center if several
    are clear. Labels sit outside the edge fade so they're always readable.
  - **Hover / focus** a star: an `--accent` ring and a tooltip (short hash, date, subject;
    mono, `--text-xs`, `--bg` with a `--muted` 35% hairline border). Click opens the commit
    on GitHub in a new tab. Touch: first tap shows the tooltip, second tap opens. Arrow keys
    step through commits in order. Hit areas reach well past the tiny stars.
  - **Hover a milestone:** its figure brightens (lines to 60%) and the rest of the sky dims
    to 45% (`--dur-ui`).
  - **Build-in** (ADR 0011): an agent sweeps out from the center on a smooth spiral (1.75
    turns, eased with `--ease`, about 1.7s) that ends on the newest commit. Stars ripple in
    as the sweep reaches their distance from the center, a little later the farther they
    are from the cursor (up to about 0.4s). Each scales up quickly (0.3s); the bright ones
    and any the cursor passes over get a faint ping ring that fades in 0.3s. A short trail
    follows the cursor (at most 0.2s and about 30px). No lines between commits. Stardust
    fades in ring by ring just behind the sweep, then the agent visits each milestone and
    its figure draws (about 1.2s in all). Reduced motion: the finished sky, no twinkle.
  - **Accessible:** a group label describing the image, a link per star with its hash, date
    and subject, and a visually hidden list of the 10 most recent commits.
- Project pages (case studies): problem → process → outcome → what I'd change
- This site's own case study (built from `docs/`)

## 9. Never
Goal: clean, and not obviously vibe-coded. Many of these come from a list of common
"vibe-coded site" tells, kept where they apply to this site.

**Color**
- No gradients (harsh or soft blobs), rainbow coloring, neon colors, or purple-on-black.
  Exceptions: the soft halo on the brightest constellation stars (§8), a fade of the
  star's own color, and the radial mask that fades the sky's edge. (Added 2026-11-07,
  ADR 0009, ADR 0012.)
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
