// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
// Import your schemas here, e.g.,
// import { schemaTypes } from './schemas';

export default defineConfig({
  // Replace with your actual project ID and dataset
  projectId: '42txqeur',
  dataset: 'production',

  // You can set a name for your studio (optional)
  name: 'default-studio',
  title: 'Apl Studio',

  // The base path for your studio, matching studioBasePath in astro.config.mjs
  basePath: '/admin',

  plugins: [
    structureTool(),
    visionTool(), // Sanity Vision for GROQ queries
    // Add any other Sanity plugins you might be using
  ],

  // Define your schema types here
  // If you have a 'schemas' directory, you'll typically import them:
  // schema: {
  //   types: schemaTypes,
  // },
  // If you don't have a separate schemas file, you can define them inline:
  schema: {
    types: [
      // Example schema for a 'post' type
      {
        name: 'post',
        title: 'Post',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
          },
          {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
          },
          {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
          },
        ],
      },
      // ... other schema types
    ],
  },
});
