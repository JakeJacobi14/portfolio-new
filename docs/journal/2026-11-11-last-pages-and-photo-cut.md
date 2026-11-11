# 2026-11-11 — The last project pages, and cutting the photos down

**Milestone:** polish
**Time:** not recorded.

## What I set out to do
Finish the three project pages that still said TODO (Project ECHO, EVC go-kart vision,
Jarvis) from my notes, with Claude asking questions where the notes were vague. Then cut the
After hours collection from 54 photos to about 25–30.

## What actually happened
- **Chess page:** removed the sentence about AI tools not being much help back then. It
  wasn't needed.
- **Questions round:** Claude read the ECHO and EVC notes and asked 11 questions. I answered
  quickly and casually, the way I'd talk, expecting the answers to be rewritten.
- **Miss: answers went up almost word for word.** The first drafts kept my chat phrasing,
  like "With only three of us, we all worked on every part." I said it felt like I'd been
  misled about how the answers would be used. Claude rewrote both pages from scratch,
  using my answers only as facts.
- **"Co-founded" was wrong.** ECHO is a research drone, not a company. The role is now
  Software Lead and the wording describes the team instead.
- **Jarvis had been skipped.** My notes were in the drop folder the whole time, but the
  page still said TODO. Claude wrote it, then checked it against the repo, which caught a
  wrong claim: the page said the AI ran locally, but the default setup is Groq and
  Cartesia, with Ollama, Whisper and Kokoro as local fallbacks. It also added real details
  (the "Hey Jarvis" wake word, sentence-by-sentence speech, "clip that") and took out the
  AC, which nothing in the repo controls.
- **Jarvis cover:** my only image was a phone screenshot with my face and local IP. Claude
  ran the control panel locally with fake service data, laid its cards out side by side to
  fit a wide cover, and I deleted the old screenshot. The transcript in the cover is
  sample text.
- Pushed the three pages to main once I was happy with them.
- **Photo curation:** Claude reviewed all 54 as numbered contact sheets and suggested
  keeping 29. A lot of its reasoning was how each photo would look as a star field, plus
  privacy flags on people. I don't care about the star-field look, and I'm not worried
  about the privacy flags. I brought back six (my friend group's only photo, the Nepal
  schoolkids, the snowy New York river, the wizard, the woodshop, the cat café). The
  final count is **35**, more than the target, but they're the ones I want.
- 19 cut originals moved to `~/Pictures/after-hours-cut/` (nothing deleted), site synced
  and reordered. The first nine photos cover all nine countries, and no two from the same
  place sit next to each other.

## Decisions made
- No ADRs. These were content calls, not structural ones.

## What surprised me / what I learned
- "Answer like you're talking to me" sets an expectation of a full rewrite. If the answers
  are going to be used as text, that has to be said up front.
- Checking the page against the actual code caught a claim I'd made from memory.
- The criteria I gave Claude for the photos (star-field fit, privacy) weren't what I
  actually cared about. Seeing its picks made that obvious.

## Screenshots
- `../screenshots/2026-11-11-after-hours-curated-desktop.png`
- `../screenshots/2026-11-11-after-hours-curated-mobile.png`

## Next
- A real screenshot or photo of Jarvis to replace the generated cover.
- Decide whether my itch.io page belongs in the contact links.
