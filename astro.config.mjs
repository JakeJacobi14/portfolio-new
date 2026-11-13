// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The live site, for absolute URLs (Open Graph, canonical links).
  site: 'https://jakejacobi.me',
  // The CSS is small (about 27 KB in all); inlining it saves a render-blocking request.
  build: { inlineStylesheets: 'always' },
});
