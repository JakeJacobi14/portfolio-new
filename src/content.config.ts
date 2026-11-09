// Content collections (ADR 0017, ADR 0018).
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** Projects: one Markdown file each. The body follows the template
    problem → what I did → result → what I'd change. Unknown facts say "TODO". */
const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work", generateId: ({ data }) => String(data.slug) }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      year: z.string(), // absolute ("2026", "2025–26"), never "present"
      role: z.string(),
      team: z.string(),
      stack: z.array(z.string()),
      summary: z.string(), // one line, shown on the home page
      cover: image().optional(), // under the links, full text width (DESIGN.md §8)
      coverAlt: z.string().optional(), // required with a cover: what it shows
      // A live demo run in place, at the full page width; the cover is its poster.
      demo: z.url().optional(),
      // A drag-to-turn model in place of the cover (ADR 0021), slimmed by scripts/slim-model.mjs.
      model: z
        .object({
          src: z.string(), // path under public/
          alt: z.string(), // what the model shows, for screen readers
          credit: z.object({ name: z.string(), url: z.url() }).optional(),
        })
        .optional(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      order: z.number().int(),
    }),
});

/** After hours photos: one YAML file each, next to its image in images/. */
const afterHours = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/content/after-hours" }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string(), // what the photo shows, for screen readers
      caption: z.string(), // place or activity, lowercase: "lima"
      country: z.string(), // lowercase: "peru"
      order: z.number().int(),
    }),
});

export const collections = { work, "after-hours": afterHours };
