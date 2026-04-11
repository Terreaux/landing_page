import { defineCollection, z } from "astro:content";

const useCases = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().default("Use case"),
    pubDate: z.coerce.date().optional()
  })
});

export const collections = { useCases };
