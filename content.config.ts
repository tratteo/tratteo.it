import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
    collections: {
        articles: defineCollection(
            asSitemapCollection({
                source: "articles/**/*.md",
                type: "page",
                schema: z.object({
                    title: z.string(),
                    headline: z.optional(z.string()),
                    date: z.date(),
                    description: z.string(),
                    thumbnail: z.string(),
                    tags: z.optional(z.array(z.string())),
                    author: z.object({
                        name: z.string(),
                        avatar: z.string(),
                        description: z.optional(z.string()),
                        url: z.optional(z.string()),
                    }),
                    youtube_tutorial: z.optional(z.string()),
                    github_repo: z.optional(z.string()),
                    techstack: z.optional(z.array(z.string())),
                }),
            })
        ),
    },
});
