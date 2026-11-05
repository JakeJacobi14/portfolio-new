---
description: Screenshot the current site (desktop + mobile) for the process record
argument-hint: <label, e.g. hero-v2>
---

Take process screenshots labeled "$ARGUMENTS".

1. Make sure the dev server is running (`npm run dev`, port 4321). Start it in the background
   if it isn't.
2. Run `node scripts/snapshot.mjs $ARGUMENTS`.
3. List the files it created and ask if I want a caption added to today's journal entry.
