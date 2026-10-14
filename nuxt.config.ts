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
    content: {
        experimental: {
            sqliteConnector: "native",
        },
        build: {
            markdown: {
                highlight: {
                    theme: "dark-plus",
                    langs: ["js", "jsx", "json", "ts", "tsx", "vue", "css", "html", "vue", "bash", "md", "mdc", "yaml", "cpp", "c", "py"],
                },
                toc: {
                    depth: 3,
                    searchDepth: 3,
                },
                remarkPlugins: {
                    "remark-reading-time": {},
                    "remark-math": {},
                },
                rehypePlugins: { "rehype-katex": {} },
            },
        },
    },
    app: {
        head: {
            meta: [
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
        disallow: ["/app/**", "/api/**", "/_nuxt/**"],
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
        fetchTimeout: 8000,
        clientBundle: {
            // The default scan glob skips plain .ts files, so icons declared in
            // app/data/*.ts were never bundled. Include them.
            scan: {
                globInclude: ["**/*.{vue,jsx,tsx,md,mdc,mdx,ts}"],
            },
            // Explicit list of every icon the landing page needs, so bundling
            // never depends on the scanner.
            icons: [
                "material-symbols:arrow-outward-rounded",
                "material-symbols:south-rounded",
                "material-symbols:north-rounded",
                "material-symbols:dark-mode-rounded",
                "material-symbols:light-mode-rounded",
                "material-symbols:mail-outline-rounded",
                "material-symbols:content-copy-outline-rounded",
                "material-symbols:check-rounded",
                "material-symbols:code-rounded",
                "material-symbols:bolt-rounded",
                "material-symbols:auto-awesome-rounded",
                "material-symbols:travel-explore-rounded",
                "material-symbols:business-center-rounded",
                "material-symbols:rocket-launch-rounded",
                "material-symbols:school-rounded",
                "material-symbols:trending-up-rounded",
                "material-symbols:archive-outline-rounded",
                "material-symbols:visibility-outline-rounded",
                "material-symbols:rocket-launch-outline-rounded",
                "material-symbols:favorite-rounded",
                "mdi:github",
                "mdi:instagram",
                "mdi:linkedin",
                "ion:logo-youtube",
            ],
            sizeLimitKb: 1024,
        },
    },
    vite: {},
    css: ["katex/dist/katex.min.css", "~/assets/css/main.css"],
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
        "/minecraft-mods": {
            appLayout: "fullwidth",
        },
    },
    colorMode: {
        preference: "dark",
        fallback: "dark",
        classSuffix: "",
        disableTransition: true,
    },
    ui: {
        colorMode: true,
    },
    nitro: {
        debug: false,
        experimental: { openAPI: false },
        compressPublicAssets: { brotli: true },

        prerender: {
            crawlLinks: true,
            failOnError: true,
            ignore: ["/api", "/app"],
            routes: ["/"],
        },
    },
    ogImage: {
        defaults: {},
    },
    fonts: {
        defaults: {
            weights: [300, 400, 500, 600, 700],
        },
        families: [
            { name: "Geist", provider: "google", weights: [300, 400, 500, 600, 700], subsets: ["latin"] },
            { name: "Geist Mono", provider: "google", weights: [400, 500], subsets: ["latin"] },
        ],
    },
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt", "@nuxt/content", "@nuxtjs/seo", "@nuxt/scripts"],

    compatibilityDate: "2025-07-15",
});
