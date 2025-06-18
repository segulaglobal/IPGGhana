// apl-website/src/lib/sanity.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '42txqeur',
  dataset: 'production',
  useCdn: true, // Enable CDN for faster reads
  apiVersion: '2024-01-01', // Use current date
})

// Test function to see all document types
export async function getAllDocuments() {
  return await client.fetch(`*[0...10] { _type, _id, title }`)
}

// Helper function to get all blog posts
export async function getBlogPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        image {
          asset->{
            url
          }
        }
      }
    }
  `)
}

// Helper function to get a single blog post
export async function getBlogPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      body,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            url
          }
        }
      }
    }
  `, { slug })
}