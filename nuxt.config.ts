// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePerson } from "nuxt-schema-org/schema";

import sleekConfig from "./sleek.config";

export default defineNuxtConfig({
    devtools: { enabled: true },

    sitemap: {
        autoLastmod: true,
        discoverImages: true,
        exclude: ["/app", "/api"],
        debug: false,
        sources: ["/api/__sitemap__/users"],
        xslColumns: [
            { label: "URL", width: "60%" },
            {
                label: "Images",
                width: "20%",
                select: "count(image:image)",
            },
            { label: "Last Modified", select: "sitemap:lastmod", width: "20%" },
        ],
    },

    robots: {
        disallow: ["/app/**", "/api/**"],
    },
    site: {
        url: sleekConfig.url,
        name: sleekConfig.name,
        defaultLocale: "en",
    },
    schemaOrg: {
        identity: definePerson(sleekConfig.author),
    },
    router: {
        options: { scrollBehaviorType: "smooth" },
    },
    icon: {
        size: "24px",
        fetchTimeout: 4000,
        clientBundle: {
            scan: true,
        },
    },
    vite: {},
    build: { transpile: ["@vuepic/vue-datepicker"] },

    css: [],
    tailwindcss: {
        exposeConfig: true,
    },

    imports: {
        dirs: ["src/**/*", "composables/**/*"],
        global: true,
    },
    watch: ["sleek.config.ts"],
    appConfig: {},
    runtimeConfig: {},
    routeRules: {
        "/_nuxt/**": {
            cache: {
                maxAge: 2592000,
                staleMaxAge: 31536000,
            },
        },
        "/sitemap.xml": {
            isr: 3600,
        },
    },
    nitro: {
        debug: false,
        experimental: { openAPI: false },
        compressPublicAssets: { brotli: true },

        prerender: {
            crawlLinks: true,
            failOnError: true,
            ignore: ["/api", "/app"],
            routes: ["/", "sitemap.xml"],
        },
    },
    ogImage: {
        strictNuxtContentPaths: true,
        defaults: { component: "OgImageDefault" },
    },
    googleFonts: {
        preload: true,
        families: {
            Poppins: true,
            Inconsolata: true,
        },
    },

    modules: [
        "@nuxtjs/sitemap",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@nuxt/icon",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@nuxtjs/robots",
        "@nuxt/content",
        "@nuxt/image",
        "@nuxtjs/seo",
        "nuxt-og-image",
        "nuxt-schema-org",
    ],

    compatibilityDate: "2024-07-25",
});
