import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
