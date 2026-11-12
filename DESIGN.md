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
- Both are self-hosted (2026-11-10): Google's own files in `public/fonts/`, subsets latin,
  latin-ext and cyrillic (`src/styles/fonts.css`), the two latin files preloaded.
- Scale: ratio 1.25 from 16px: `13 / 16 / 20 / 25 / 31 / 39 / 49 / 61 / 76 / 95` px
  (tokens `--text-xs` through `--text-6xl`)
- Display: the name in the hero is the only big element on the page,
  `clamp(49px, 7vw + 16px, 95px)` (`--text-display`), so 49px on phones and 95px from
  about 1130px wide. Everything else in the hero is small (ADR 0013).
- Cyrillic: Schibsted Grotesk has none, so any Cyrillic text (the "сайн уу" greeting) is
  set in IBM Plex Mono, which has it. The whole greeting line is mono so it doesn't mix
  typefaces mid-line.
- Weights: 400 body, 500 headings. Line height 1.5 body, 1.1 display.
- Contact email (home §03): `clamp(25px, 5vw + 8px, 49px)` (`--text-contact`), Schibsted
  500, so the address fits one line on a phone.
- One step below the scale for constellation milestone labels and the build-in's frame size
  labels only: `10px` (`--text-2xs`), IBM Plex Mono, letter-spaced `0.12em` (`--tracking-label`).

## 6. Layout & spacing
- Grid: none. A single left-aligned column, except the intro: from 960px up it is two
  columns, the text as wide as the name and the sky taking the rest, 96px apart (so the
  sky's faded edge stays clear of the name). The sky may reach up to 64px into the page's
  right margin when there is one. Breakpoints: `640px`, `960px`.
- Hero (ADR 0015): exactly one screen (`min-height: 100svh`), with the header laid over
  its top. The name block and the sky are centered vertically; "Selected work" starts
  below the fold. The sky is never taller than the screen leaves room for. On phones the
  name comes first and the sky below it.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px (`--space-1` to `--space-10`)
- Max widths: text `65ch`, page `1120px`
- Side gutter: 16px under 640px, 32px above
- Corner radius: `0` (token `--radius`)
- After hours cards (ADR 0018): three widths, `224 / 240 / 288px` (`--card-s`, `--card-m`,
  `--card-l`), aspect 4:5 (landscape photos 5:4 and panoramas 3:2, at the same height, so
  wider photos get wider cards), 24px apart, nudged up or down by 0, 12 or 24px so the strip
  feels hand-placed. On phones they're scaled to 0.6 (about 134 / 144 / 173px) and the
  strip scrolls sideways with snap points (2 to 3 cards visible). On desktop the section
  is at least one screen tall (`100svh`), its label, counter and strip centered in it.
- Lines: 1px hairlines in `--muted` at reduced opacity separate list rows. No boxes or cards.
  The central element's frame uses the same hairline.

## 7. Motion
- One signature moment (the build-in). Everything else is quiet: fades and small offsets
  only, plus two faint sky details that start after the build-in (§8, ADR 0016) and the
  after hours strip's card swap (§8, ADR 0018).
- Durations: `150ms` micro (hover, focus), `300ms` UI. An after hours card's stars converge
  into its photo over `300ms` (`--dur-converge`) and come back slowly after a hover: the
  photo lingers `2s` (`--dur-linger`), then the stars drift back out over `1.2s`
  (`--dur-fade-back`). A click star (below) fades out over `1.6s`
  (`--dur-click-star`). The hero builds in about 2.5s;
  measured 2.9s on a 1440×900 desktop (the constellation is the last to finish) and 2.7s on
  a phone. Each later section starts the moment it enters the screen and is done within
  about 0.8s (measured 0.23 to 0.8s); a work row takes about 1s. Hero cursor moves take 0.3s to 0.7s depending on
  distance; in later sections 0.1s to 0.2s.
- Easing: one curve everywhere, `cubic-bezier(0.2, 0, 0, 1)` (`--ease`)
- **Click star** (every page, added 2026-11-08): a click on the page (not on a link,
  button or form field, and not one that ends a text selection) leaves a star where you
  clicked, like a bright constellation star: a 5px core in `--star-warm` with its soft
  halo (3.2× the core, peaking at 28%). It pops in (opacity 0 → 1, scale 0.4 → 1,
  `--dur-ui`), then fades out over `--dur-click-star` (1.6s). It's pinned to the page, so
  it scrolls with the content you clicked. At most 12 at once. Reduced
  motion: the same fade, no pop. Never interactive, hidden from screen readers.
- **Sound:** the site is silent except for the click star's chime: one very quiet, high
  bell made in the browser (Web Audio, no files): a random note of G6 A6 C7 D7 E7 with a
  softer fifth and a faint shimmer two octaves up, ringing out over about a second. No sound for the build-in, the agents or
  the sky.
- Build-in: unlabeled cursors (custom SVG, `--accent`) make everything on the page: five
  for the hero, plus a crew for each later section as it appears (ADR 0019).
  Four kinds of action:
  - **Frame** (the hero's text, ADR 0014): like a design tool. The agent drags out a text
    frame from the element's top-left corner: a 1px `--accent` rectangle, 3px outside the
    text, with small square corner handles (`--bg` fill, `--accent` border). It grows from
    small to full size in 0.45s with a size label under it (`W 510 · H 105`, `--text-2xs`
    mono, `--accent`) that fades out in 0.4s. Then the text sets in: the name is typed
    behind a caret, the smaller lines fade in and rise 4px (0.3s). The frame fades (0.3s)
    once the text lands.
  - **Type:** text appears one character at a time behind a 2px `--accent` caret, at a
    slightly uneven, human pace (the hero's name about 45ms per character; titles and
    labels in later sections about 12ms).
  - **Draw:** hairlines grow along with the cursor that draws them.
  - **Fade:** longer text in later sections (summaries, counters, links) fades in and
    rises 4px (0.3s) while the title is typed.
  The hero is built on load by a crew working in parallel, starts staggered by up to 0.45s,
  each agent appearing near its first job: one for the greeting and tagline, one for the
  name, one for the header (home link, then nav), one for the sky's caption, and one for the
  constellation (it appears on the sky's center and starts the sweep at once).
  Later sections (ADR 0019) each get their own crew once at least 30% of the section (or of
  the screen, for a tall one) has been in view for 120ms with the page nearly still
  (scrolling slower than 1200px/s), and never wait for another section: each work row (a
  crew of two, about 1s: one agent draws the hairline right to left, frames the title and
  types it in while the summary fades in; the other frames the year, then nudges the "→"
  in from 4px left; rows that arrive together cascade 90ms apart), the work label, the after hours label and counter, the strip
  (a frame per card in view, one agent each, 30ms apart; frames grow in 0.35s and the card
  rises in 0.25s), say hola (label and address typed, copy button framed, links fade in)
  and the footer. A section counts as done when its content has landed; its frames fade
  and its agents step away after. The constellation, when it starts below the first screen
  (short screens), keeps its own timing.
  Sections scrolled past without stopping appear finished at once (so does one scrolled
  past while still building); the section you stop on always animates, even after a fast
  scroll.
  Project pages (ADR 0020) have their own short build-in, about 1.5s: once the title has
  arrived (morphed in from its row, or laid out with a frame on a direct visit), its frame
  is drawn around it, then the summary, facts and links; then each section (heading typed,
  body fading in) builds as it comes into view, under the same rules.
- Page transitions (ADR 0020): native cross-document view transitions. A project's title
  morphs between its row on the home page and its page's header, both ways (`--dur-ui`,
  `--ease`); the rest of the page cross-fades. None for reduced motion.
  Plays on every fresh load and refresh. Skipped when coming back from a project page: by
  the browser's back button (which also returns to where you were), or by a link to a
  section from a project page ("back to work", `/#work`). Only the home page builds itself.
  Replay always replays it. A "Skip" button (and Esc) ends it at any point, and a "Replay
  build" control sits in the footer.
- `prefers-reduced-motion: reduce` → skip the build-in, show the finished page, hide replay.
- Library: Motion (`motion/mini`), see ADR 0004.
- Twinkle (constellation only, §8): about 1 in 8 stars, chosen from the commit hash, slowly
  dims to 45% of its brightness and back. Each cycle takes 4 to 8s (`--twinkle-min`
  `4s`, `--twinkle-max` `8s`), eased with `--ease`, alternating. Off for reduced motion.

## 8. Pages & sections
- Home (ADR 0017), one scroll: hero, `01 / selected work`, `02 / after hours`,
  `03 / say hola`, footer. Section labels are `--text-xs` mono, `--muted`, lowercase, with
  a two-digit number. Nav: Work, After hours, Contact scroll smoothly to their sections
  without adding a `#hash` to the URL, so a refresh starts at the top (ADR 0019). From other
  pages they go to `/#work` etc.; the hash is dropped once the page is there.
- Hero text (ADR 0013), one big element and everything else small:
  - "сайн уу, I'm": `--text-xs` mono, `--muted`; "сайн уу" has `lang="mn"` and a tooltip
    on hover or focus, "hello, in Mongolian" (same surface as the star tooltip).
  - "Jake Jacobi": `--text-display`, weight 500, the `h1`.
  - "software engineer · building software that sees, thinks & moves": `--text-xs` mono,
    `--muted`.
  - Sky caption: "every star is a commit to this site. oldest at the center.", centered
    directly under the sky, one line wherever the sky is wide enough (two balanced lines
    on phones and narrow desktops).
  - Nothing shows relative times or "latest" wording that would go stale if the site
    stopped being updated. Dates are absolute.
  The minors and Oregon → Indiana move to /about.
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
  - **Noticing the pointer** (ADR 0016): stars within 120px of a mouse pointer lift a
    little: opacity rises by up to 40% of the way to full, the core grows by up to 20%,
    with a smoothstep falloff by distance, easing in and out with a 140ms time constant.
    Mouse only (no touch), never during the build-in, off for reduced motion. It doesn't
    change the star tooltips.
  - **Shooting star** (ADR 0016): every 15 to 20s (random), one 1px `--star` streak, 140 to
    220px long, 12° to 35° below horizontal in either direction, across the sky (60%) or in
    a band near the bottom of the hero. It draws and erases itself in 600ms (`--ease`),
    peaking at 35% opacity. Only while the hero is at least 40% in view and the tab is
    visible; never during the build-in; none for reduced motion.
  - **Accessible:** a group label describing the image, a link per star with its hash, date
    and subject, and a visually hidden list of the 10 most recent commits.
- **01 / selected work:** one row per project (from the `work` collection, by `order`):
  name, a one-line summary, the year in mono. The whole row is one link to `/work/[slug]`.
  Hover or focus: the name turns `--accent` and a "→" moves 4px right (`--dur-micro`);
  focus also gets the usual focus ring. Hairlines between rows as before.
- **Icon and link preview** (added 2026-11-10): the favicon is a shooting star (chosen
  from 20 drafts in `docs/favicon-drafts/`): a `--fg` streak fading in toward a
  `--star-warm` head with its halo, three faint `--muted` stars, on a `--bg` square
  (`public/favicon.svg`, with PNG, ICO and apple-touch-icon copies). Link previews use `public/og.png`, 1200×630: the
  finished hero (name and sky, no header or caption), made by `scripts/og-image.mjs`;
  re-run it now and then, as the sky grows with every commit.
- **Project pages** (`/work/[slug]`, ADR 0017): title, then role · team · year · stack in
  mono, links, then problem → what I did → result → what I'd change. Facts come only from
  the résumé; anything else says TODO until written. "← back to work" returns to `/#work`.
  Years are absolute ("2026", never "present").
  - **Cover** (added 2026-11-09): one image under the links and above "problem", the full
    width of the text column, its own aspect ratio, no frame or border, radius `--radius`.
    Real alt text. Built in like the facts: an agent frames it and it rises in (`QUICK`
    timings). Further images sit inside the section they illustrate, at the same width.
  - **3D model** (ADR 0021, Project ECHO only): in place of the cover, a drag-to-turn model
    on `--bg`, aspect 4:3 (16:10 from 640px up). In its own CAD materials and colors
    (aluminum, carbon fiber, colored parts; changed 2026-11-09, I preferred it to a
    restyle in the palette), lit by a neutral studio environment and one key light. The
    one place colors outside §4 appear, as with photos. Drag turns it (mouse: any direction, tilt limited; touch: sideways only, so
    a vertical swipe still scrolls the page). No zoom or pan. Arrow keys turn it 15° when
    focused (visible focus ring). When idle it turns slowly (one turn per 60s), pausing
    while dragged and for 3s after. Renders only while on screen. Under it, one line in
    `--text-xs` mono, `--muted`: "drag to turn · cad model: campbell downs" (the name links
    to his ECHO page). Loading and failure states are that same line ("loading model…",
    "3d model unavailable"). Reduced motion: no idle turning; dragging still works.
  - **Live demo** (added 2026-11-09, physics engine): the one thing wider than the text
    column, at the full page width, 16:10. On screens 960px and up it loads by itself once
    it's within 200px of the screen and the visitor has first moved the pointer, touched,
    scrolled with a wheel or typed (2026-11-10: so the demo's own first layout isn't part of
    this page's load); the cover screenshot fills the frame until the demo has loaded, then the demo fades in over it (`--dur-ui`). Caption under it in
    `--text-xs` mono, `--muted`: "live demo, runs here · open in a new tab ↗". Under 960px
    the demo's own layout doesn't fit, so it stays the screenshot (its own proportions)
    and the caption reads "the demo needs a wider screen · open in a new tab ↗". Framed
    by an agent like a cover.
- **02 / after hours** (ADR 0018): photos from the `after-hours` collection, with a mono
  counter computed from the data ("8 frames · 1 country"). The counter is a link to
  `/after-hours`, every photo at once (below). Photos are in a shuffled order (fixed, not
  per visit), and each caption is the place from its folder: city, region or US state.
  - **Star field:** each card shows its photo as tiny points of light on `--bg`: sampled
    from a small copy of the photo by brightness, 1px, colored `--star-warm`, `--star-cool`
    or `--star` by the pixel's warmth, opacity following brightness. Caption under it in
    `--text-2xs` mono, `--muted`: `№ 012 · lima, peru` (number from `order`).
  - **Resting:** each star sits a little off its spot in the photo (2–8% of the card, in a
    fixed random direction), so the field reads as loose starlight.
  - **Hover / focus (converge, chosen 2026-11-12 over none, fade, agent and develop):** the
    stars fly to their spots and swell to fill them, brightening, over `--dur-converge`
    (300ms, `--ease`); the real photo takes over in the last 40%. When the pointer or focus
    leaves, the photo stays for `--dur-linger` (2s), then the stars drift back out over
    `--dur-fade-back` (1.2s), so moving across the strip leaves a trail of photos that
    slowly turn back into stars. Click opens a lightbox
    (`<dialog>`): the full photo and caption on `--bg`, its position (`03 / 08`), ← and →
    buttons ("previous photo" / "next photo") and the arrow keys to step through every
    photo (wrapping around), and a mono "close". Esc closes; focus goes back to the card of
    the photo you ended on, scrolled into view; if the lightbox was opened by mouse or
    touch, that card shows its star field again until hovered.
  - **The strip** holds every photo and scrolls sideways (about four cards fit on desktop), with
    snap points on touch only; a trackpad glides freely with its momentum: trackpad,
    shift + mouse wheel, mouse drag (`grab` / `grabbing` cursor;
    snaps to the nearest card on release; a drag never opens a photo), swipe, and ← / → by
    one card when the strip is focused (labelled "after hours photos, scroll
    horizontally"). A plain mouse wheel still scrolls the page. No buttons or position.
  - **Edge fades:** each side of the strip fades into the background over the gutter plus
    12px, only while there's more to scroll that way (none on the left at the start, none on
    the right at the end), easing in and out over `--dur-ui` as you scroll. A focused card is
    scrolled clear of the fades, so its outline is never cut off.
  - **The agent** (desktop, mouse): every 6s it takes hold of a card and pulls the strip
    one card along (0.65s, `--ease`), and at the end pushes it back to the start. Paused
    while the pointer or focus is in the strip, while it's offscreen, while the tab is
    hidden, while the lightbox is open, during the build-in, and for 15s after any manual
    scroll or use; if you start scrolling mid-pull it lets go at once. None on touch or for
    reduced motion.
  - **Reduced motion or no JS:** a static strip of plain photos.
  - **`/after-hours`:** every photo at once as plain photos (no star field), in strip
    order: a collage of four columns (three under 900px, two under 480px), each photo at its
    own shape with its `№` caption under it, 24px apart. A mono "← back to after hours"
    returns to `/#after-hours`; the title and counter sit above. No build-in.
  - **Images** go through Astro's image pipeline (WebP); the re-encode drops EXIF and GPS,
    and the originals are never published.
- **03 / say hola:** the email address large (`--text-contact`) with a "copy" button (mono;
  says "copied" for 2s, announced politely to screen readers), then small mono links:
  linkedin · github · resume.pdf. The résumé link only appears when `public/resume.pdf`
  exists at build time.
- **404:** the site's header, one line, and a link home.
- This site's own case study (built from `docs/`)

## 9. Never
Goal: clean, and not obviously vibe-coded. Many of these come from a list of common
"vibe-coded site" tells, kept where they apply to this site.

**Color**
- No gradients (harsh or soft blobs), rainbow coloring, neon colors, or purple-on-black.
  Exceptions: the soft halo on the brightest constellation stars (§8), a fade of the
  star's own color, and the radial mask that fades the sky's edge. (Added 2026-11-07,
  ADR 0009, ADR 0012.) The after hours strip's edge fades, a mask that fades the strip
  into the background (§8, added 2026-11-08). The click star's halo, the same fade as a
  bright star's (§7, added 2026-11-08).
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
  Exception: the "сайн уу" greeting shows a translation tooltip on hover or focus. The
  sky's stars noticing the pointer (§8) is ambient, not a hover state, and stays subtle.
- No animation that delays reading content for more than ~2 seconds unless it can be skipped.
  The build-in is the one exception: skippable, about 2.5s for the hero and under a second
  per later section, and off for reduced motion.

**Copy** (everything a visitor reads: the site and the case study built from `docs/`)
- No em dashes. No "it's not X, it's Y" constructions.
- No lorem ipsum in commits.

**Process**
- No color, font, size, radius or easing that isn't in this file.
