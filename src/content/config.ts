import { defineCollection, z } from 'astro:content';

// Blog collection
const postsCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string(),
        image: image(),
        tags: z.array(z.string()),
    }),
});


// People Collections
const teamsCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        name: z.string(),
        title: z.string(),
        institution: z.string(),
        image: image(),
        email: z.string(),
        linkedin: z.string(),
    }),
});

export const collections = {
    posts: postsCollection,
    teams: teamsCollection,
}