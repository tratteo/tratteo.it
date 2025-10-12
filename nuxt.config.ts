// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePerson } from "nuxt-schema-org/schema";

import { appMeta } from "./app/app.meta";

export default defineNuxtConfig({
    devtools: { enabled: true },

    sitemap: {
        autoLastmod: true,
        discoverImages: true,
        exclude: ["/app/**", "/api/**", "/_nuxt/**", "/__nuxt_content/**"],
        debug: false,

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
    app: {
        head: {
            meta: [
                { charset: "utf-8" },
                {
                    name: "apple-mobile-web-app-title",
                    content: appMeta.name,
                },
            ],
            link: [
                { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
                { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
                { rel: "shortcut icon", href: "/favicon.ico" },
                { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
                { rel: "manifest", href: "/site.webmanifest" },
            ],
            htmlAttrs: { lang: "en" },
        },
    },
    robots: {
        disallow: ["/app/**", "/api/**"],
    },
    site: {
        url: appMeta.url,
        name: appMeta.name,
        defaultLocale: "en",
    },
    schemaOrg: {
        identity: definePerson(appMeta.author),
    },
    router: {
        options: { scrollBehaviorType: "smooth" },
    },
    icon: {
        fetchTimeout: 4000,
        clientBundle: {
            scan: true,
        },
    },
    vite: {},
    build: { transpile: ["@vuepic/vue-datepicker"] },

    css: ["~/assets/css/main.css"],

    imports: {
        dirs: ["src/**/*", "composables/**/*"],
        global: true,
    },

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
    ui: {
        colorMode: false,
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
        defaults: { component: "OgImageDefault" },
    },
    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
    },
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt", "@nuxt/content", "@nuxtjs/seo", "@nuxt/scripts"],

    compatibilityDate: "2024-07-25",
});
