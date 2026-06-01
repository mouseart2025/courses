import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const partnersCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/partners' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().nullable().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  partners: partnersCollection,
};
