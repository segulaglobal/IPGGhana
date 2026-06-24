import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2025-06-18","projectId":"42txqeur","dataset":"production","useCdn":false}
          );

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
