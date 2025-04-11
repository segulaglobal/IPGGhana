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
        profession: z.string(),
        institution: z.string(),
        expertise: z.string(),
        image: image(),
        email: z.string(),
        linkedin: z.string(),
        pubDate: z.date(),
    }),
});


// Publication Collections
const articleCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        image: image(),
        imageAlt: z.string()
    }),
});

export const collections = {
    posts: postsCollection,
    teams: teamsCollection,
    articles: articleCollection
}