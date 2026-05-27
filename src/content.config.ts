import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const coursesCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/courses' }),
    schema: z.object({
        number: z.string(),
        title: z.string(),
        titleEn: z.string(),
        tagline: z.string(),
        scenarios: z.array(z.string()),
        painPoints: z.array(z.string()),
        techStack: z.array(z.string()),
        difficulty: z.enum(["入门", "进阶", "高级"]),
        duration: z.string(),
        prerequisite: z.string().optional(),
        content: z.object({
            items: z.array(z.object({
                phase: z.string(),
                description: z.string(),
            })),
        }),
        accent: z.enum(["red", "yellow"]),
        relatedCases: z.array(z.object({
            title: z.string(),
            image: z.string().optional(),
            link: z.string().optional(),
        })).optional(),
    }),
});

const classicCoursesCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/classic-courses' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        targetAudience: z.string(),
        duration: z.string(),
        accent: z.enum(["red", "yellow"]),
        order: z.number().default(0),
    }),
});

const testimonialsCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
    schema: z.object({
        quote: z.string(),
        name: z.string(),
        role: z.string(),
        accent: z.enum(["red", "yellow"]),
        avatar: z.string().optional(),
    }),
});

const partnersCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/partners' }),
    schema: z.object({
        name: z.string(),
        logo: z.string().nullable().optional(),
        order: z.number().default(0),
    }),
});

export const collections = {
    'courses': coursesCollection,
    'classic-courses': classicCoursesCollection,
    'testimonials': testimonialsCollection,
    'partners': partnersCollection,
};
