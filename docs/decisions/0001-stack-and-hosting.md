# 0001 — Stack and hosting

**Date:** 2026-11-04
**Status:** accepted

## Context
I want a portfolio that costs nothing to run, deploys automatically, and that I can build
quickly with Claude Code while still controlling the design closely.

## Options considered
1. **Astro on Vercel** — static by default, fast, built for content sites; free Hobby plan;
   GitHub push → deploy; preview URL per branch.
2. **Next.js on Vercel** — more React practice, but heavier than a portfolio needs.
3. **Framer / Webflow** — fast visually, but less mine and less of an engineering story.
4. **GitHub Pages / Cloudflare Pages / Netlify** — also free; fine fallbacks.

## Decision
Astro + plain CSS, code on GitHub, hosted on Vercel Hobby, built with Claude Code.

## Why
Lightest setup that still lets me write real code and own every design detail. Vercel's
preview deployments make it easy to document the design evolving.

## Consequences
- Vercel Hobby is for personal, non-commercial use — fine for a portfolio, not for client work.
- If I outgrow it, Cloudflare Pages or Netlify are drop-in alternatives for a static Astro site.
- Domain: start on `*.vercel.app`; can add a custom domain later.
