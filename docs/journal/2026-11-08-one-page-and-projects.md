# 2026-11-08 — One long page and project pages

**Milestone:** build

## What I set out to do
Restructure the site: one long home page (hero, selected work, after hours, contact) and a
page per project, from content collections.

## What actually happened
- Planned first. The plan found that the stub pages and the custom 404 I asked to keep or
  remove didn't exist any more (gone with the Nov 7 revert), and that `/resume.pdf` would
  publish my phone number. I chose to hide the link until I add a version without it.
- Six work entries from my résumé only; four of them have TODO years and sections.
- After hours: placeholder photos drawn as star fields, the real photo on hover, a
  lightbox, and an agent that swaps a card every 6s. The first fields only showed each
  scene's moon or sun; sampling at 128px with brightness relative to the photo fixed it.
- Contact: the email large, a copy button, linkedin and github (resume hidden).
- Found while testing: Skip left unhandled errors in the console (older than today), and
  the build-in typed links and `lang` spans back as plain text. Both fixed.
- Open: scrolling quickly can leave a section empty for a few seconds while the agents are
  still typing the work rows.

## Decisions made
- [0017](../decisions/0017-site-structure.md): one long page plus project pages, content
  collections.
- [0018](../decisions/0018-after-hours-star-field-strip.md): the after hours star-field
  strip.

## What surprised me / what I learned
- Writing the plan before building caught three wrong assumptions in my own request.

## Screenshots
- `../screenshots/2026-11-08-structure-v3-desktop.png`, `-mobile`
- `../screenshots/2026-11-08-structure-v3-work-desktop.png`, `-mobile`
- `../screenshots/2026-11-08-structure-v3-404-desktop.png`, `-mobile`

## Next
- Real photos (with alt text and places) and a résumé without my phone number.
- Fill in the TODOs in the work entries.
- Decide what to do about the build-in falling behind a fast scroll.

---

## Later the same day: build speed, refresh, strip controls

### What actually happened
- The build-in for later sections is now a crew per section, started the moment it enters
  the screen, done in under a second (measured 0.23 to 0.8s). A fast fling from top to
  bottom finishes everything at once. The shared task queue is gone.
- The build plays on every load and refresh again. It's skipped when coming back from a
  project page (browser back, which also returns to where I was, or "back to work"). Nav
  clicks no longer put a #hash in the URL, so a refresh starts at the top.
- After hours got prev/next arrows, a position (`03 / 08`), drag, trackpad, swipe and
  keyboard, and the lightbox steps through every photo. The agent waits 15s after I touch
  anything.
- The contact email is now jakejacobi2007@gmail.com.
- Measuring "first agent" by watching the overlay gave nonsense numbers; a `data-building`
  marker on each section made the timing test exact. Sections also only counted as done
  after their agents walked off, which put most of them over budget on paper; they now count
  as done when the content lands.

### Decisions made
- [0019](../decisions/0019-build-per-section-and-every-load.md): a crew per section, and the
  build on every load. [0018](../decisions/0018-after-hours-star-field-strip.md) amended for
  the strip controls.

### Screenshots
- `../screenshots/2026-11-08-structure-v4-desktop.png`, `-mobile`
- `../screenshots/2026-11-08-structure-v4-strip-controls.png`, `-lightbox`

---

## Later still: a scrolling strip, a calmer trigger, project page transitions

### What actually happened
- The strip lost its arrows and counter. It scrolls by trackpad, shift + wheel, drag, swipe
  and arrow keys, with edge fades that only show when there's more that way. The agent now
  pulls the strip along one card every 6s instead of swapping cards.
- The section trigger changed again: a section starts once 30% of it has been in view for
  120ms with the page nearly still. The first version (120ms alone) still set off every row
  during a quick scroll on a 900px-tall screen, because a row stays in view for about 250ms
  at 4000px/s; requiring the page to be nearly still fixed it.
- Project pages got their own build-in and a view transition: the title morphs from its row
  into the page header and back. Native cross-document transitions (named with Astro's
  `transition:name`) instead of Astro's client router, so every page still loads normally.
  First tries started the build-in during the morph and built the sections before the
  facts; it now waits for the transition and for the head.
- Small finds: a second arrow key press during a smooth scroll landed on the same card; the
  agent's hover flag stuck after the lightbox (now read live); a focused card at the edge
  stayed under the fade (the fade width was an unresolved `calc()` in JS); an aborted
  transition logged an error.

### Decisions made
- [0020](../decisions/0020-project-pages-build-and-view-transitions.md): project page
  build-in and native view transitions. Amendments to
  [0019](../decisions/0019-build-per-section-and-every-load.md) (the trigger) and
  [0018](../decisions/0018-after-hours-star-field-strip.md) (scroll-only strip, edge fades).

### Screenshots
- `../screenshots/2026-11-08-structure-v5-desktop.png`, `-mobile`, `-work-desktop`, `-work-mobile`
- `../screenshots/2026-11-08-structure-v5-strip-fades.png`, `-title-morph`, `-work-built`

---

## Evening: real photos, a collage page, a click star, and going live

**Milestone:** build

### What I set out to do
Replace the eight placeholder photos in after hours with my own, fix what came up, and get
everything pushed and live.

### What actually happened
- I dropped 66 unsorted photos in a folder and asked Claude to sort them by GPS. None had
  usable GPS (no tags, or zeroed to 0,0), so it sorted by looking at each photo, helped by
  the EXIF time zone offset (+05:45 is only used in Nepal). It placed 38, put 27 in
  "needs-place", and showed me a table before moving anything. I placed the rest by hand,
  corrected some folders (Lima, Iquitos, Terelj, Tokyo, Madrid, Valencia) and trimmed the
  set to 63.
- Photos go into the repo as 1600px copies with metadata stripped, since the repo is
  public; the built images were checked for EXIF and GPS (none).
- Duplicates showed up on the site (the Michigan beach twice). Rebuilding had reused
  filenames (`022.jpg` and so on) for different photos, and the dev server and browser
  cached by name. Each image is now named after its source file.
- Scrolling left on a trackpad stopped short and jittered. Three causes changed at once:
  mandatory snap points, a blocking wheel listener, and the agent's pull fighting a
  leftward scroll.
- The counter now links to `/after-hours`, a four-column collage of plain photos. After
  closing the lightbox the card stayed sharp until another click; fixed. Captions are the
  folder's place only ("indiana", not "west lafayette"), and the order is shuffled.
- The star field over the photos was a bit much, so a hovered photo now lingers 2s and the
  stars fade back. This took several rounds: it worked in Claude's tests but not for me.
  My Safari was running cached dev-server JavaScript, and the hard-refresh shortcut Claude
  gave me (Cmd+Shift+R) is Reader view in Safari. A console trace I pasted back showed the
  script wasn't running; Cmd+Option+E (empty caches) fixed it. We never confirmed whether
  the first, CSS-only version would have worked; the delay now lives in the script.
- The section got bigger: larger cards, and on desktop it fills the screen.
- The constellation looked stale because nothing from today had been committed and the
  branch had never been pushed; `main` was 61 commits behind. Claude committed in groups,
  pushed, and fast-forwarded `main`, and the live site caught up.
- Sound: I asked for agent typing/clicks and a constellation twinkle, then cut it to one
  thing: a click on the page leaves a star that fades out, with a quiet chime. The first
  version stayed fixed on screen while scrolling and made a "chunky" noise tick; now it's
  pinned to the page and plays a soft pentatonic bell (Web Audio, no files).
- My résumé is in `public/resume.pdf`, linked from the contact section.

### Decisions made
- [0018](../decisions/0018-after-hours-star-field-strip.md) amended (amendment 3): real
  photos, card sizes, linger, scrolling, the collage page. The click star and the site's
  one sound are in DESIGN.md §7.

### What surprised me / what I learned
- My photos had no location data at all; the time zone offset did a surprising amount of
  the sorting.
- "It doesn't work" can be the browser, not the code. Saying which browser up front would
  have saved a few rounds.
- Not committing for a day made the constellation, the site's own history, look wrong.

### Screenshots
- `../screenshots/2026-11-08-after-hours-real-photos-desktop.png`, `-mobile`
- `../screenshots/2026-11-08-after-hours-66-photos-desktop.png`, `-mobile`
- `../screenshots/2026-11-08-after-hours-collage-page-desktop.png`, `-collage-4col-desktop`
- `../screenshots/2026-11-08-after-hours-full-screen-desktop.png`, `-mobile`

### Next
- Fill the project pages' TODO years from the résumé; decide whether the Data Mine research
  and the TA job belong on the site.
- Keep committing and pushing as work lands.
