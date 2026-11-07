# 0010 — Commit data: committed file, refreshed by a pre-push hook

**Date:** 2026-11-07
**Status:** accepted

## Context
The constellation needs the repo's full commit history at build time. Vercel builds from a
shallow clone (`git clone --depth=10`), so `git log` there only sees the last few commits.

## Options considered
1. **A. Deep clone on Vercel** (`VERCEL_DEEP_CLONE=true`). Data always current, nothing
   extra to commit. Only community posts document the variable, not Vercel's docs.
2. **B. Committed `commits.json`, refreshed by a pre-push hook.** Works on any host. Costs
   a "refresh" commit now and then, and a second push when the data changed.
3. **C. Committed file, refreshed by hand.** Same as B but easy to forget.

## Decision
Tried A first, then fell back to B.

The test: on a `preview/deep-clone` branch, the build ran `npm run commits -- --require-full`,
which fails when git can't see the full history. Without the variable it failed, which
confirms the shallow clone. With `VERCEL_DEEP_CLONE=true` set for Preview it still failed
(fresh deploy from a new commit), so the variable didn't give the build full history.

So B: `scripts/hooks/pre-push` runs `npm run commits`. If the file changed, it commits
"chore: refresh commits.json" and stops the push; pushing again includes it. `npm install`
turns the hook on (`prepare` sets `core.hooksPath`). On Vercel the script sees the shallow
clone and keeps the committed file.

## Why
A failed, and B works anywhere with no dashboard setting to remember.

## Consequences
- Refresh commits are skipped by the script, so they never become stars.
- The live site is as current as the last push, never the build itself.
- Squash merging is off on the GitHub repo, so merges keep the hashes the stars link to.
- The `preview/deep-clone` branch and the Preview-only `VERCEL_DEEP_CLONE` variable are test
  leftovers and can be deleted.
