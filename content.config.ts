import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
    collections: {
        docs: defineCollection(
            asSitemapCollection({
                source: "docs/**/*.md",
                type: "page",
                schema: z.object({
                    date: z.date(),
                    title: z.string(),
                }),
            })
        ),
    },
});
