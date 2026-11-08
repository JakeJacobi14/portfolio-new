# 0017 — Site structure: one long home page plus project pages

**Date:** 2026-11-08
**Status:** accepted

## Context
The home page had placeholder work rows, an About paragraph and placeholder contact lines.
Earlier plans had stub pages (/about, /making-of, /lab, /colophon) and a custom 404; those
were all gone with the Nov 7 revert, so only `index.astro` existed. I wanted one long home
page (hero, selected work, after hours, contact) and a page per project, with content I can
edit as files.

## Options considered
1. **Content in component code** (as before). Quick, but every project page would be
   hand-built.
2. **Astro content collections (chosen).** `work` as Markdown (title, slug, year, role,
   team, stack, summary, cover, links, order; the body is problem → what I did → result →
   what I'd change) and `after-hours` as one YAML file per photo. Typed and checked at
   build time, and the project pages come from one template.

## Decision
- Home: hero, `01 / selected work`, `02 / after hours`, `03 / say hola`, footer. Nav:
  Work, After hours, Contact.
- `/work/[slug]` from the `work` collection, with "← back to work" to `/#work`.
- Six entries (EVC go-kart vision, Project ECHO, physics engine, chess engine, Jarvis,
  Minecraft server), with facts from my résumé (Oct 24, 2026) only; everything else TODO.
  Years are absolute ("2026" for ECHO, not "present").
- Contact: the email large with a copy button, then linkedin · github · resume.pdf. The
  résumé link appears only when `public/resume.pdf` exists at build time: the current
  résumé has my phone number on it, and I'll add a web version without it.
- A minimal 404 in the site's style. The About section and the minors / Oregon → Indiana
  text are gone, and don't need a new home.
- Only the home page builds itself (the build-in), and not when arriving at a section by
  link.

## Why
Collections keep content out of components and give project pages for free. Résumé facts
only, so nothing on the site is invented.

## Consequences
- Links, years and most sections of four projects are TODO until I write them.
- Typed elements in the build-in now get their original HTML back when they finish (it used
  to be plain text), so links and `lang` spans survive.
- Free agents in the build-in take sections on screen first. Scrolling quickly past the
  work rows can still leave the next section empty for a few seconds while every agent is
  busy typing rows.
