// https://nuxt.com/docs/api/configuration/nuxt-config
import { sleekConfig } from "./sleek.config";

export default defineNuxtConfig({
    devtools: { enabled: true },

    site: {
        url: sleekConfig.app.homepage,
        name: sleekConfig.app.name,
        description: sleekConfig.app.description,
        defaultLocale: "en",
    },
    router: {
        options: { scrollBehaviorType: "smooth" },
    },
    vite: {},
    routeRules: {
        "/api/**": {
            security: {
                rateLimiter: {
                    interval: 60000,
                    tokensPerInterval: 120,
                    headers: true,
                },
            },
        },
    },
    security: {
        enabled: true,
        xssValidator: false,
        headers: {
            xXSSProtection: false,
            crossOriginOpenerPolicy: false,
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: false,
        },
    },
    watch: ["sleek.config.ts"],
    icon: {
        size: "24px",
    },
    tailwindcss: {
        exposeConfig: true,
    },

    imports: {
        dirs: ["src/**/*", "composables/**/*"],
        global: true,
    },
    appConfig: {
        sleek: sleekConfig.app,
    },
    runtimeConfig: {
        sleek: sleekConfig.runtime,
    },
    nitro: {
        experimental: { openAPI: true },
        prerender: {
            crawlLinks: true,
            failOnError: false,
            routes: ["/", "/articles/**"],
            ignore: ["/api", "/app/**"],
        },
    },

    googleFonts: {
        preload: true,
        families: {
            "Noto Sans": true,
        },
    },
    multiCache: {
        data: { enabled: true },
    },

    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@nuxt/icon",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "nuxt-multi-cache",
        "nuxt-security",
        "@nuxtjs/seo",
        "@nuxt/content",
    ],

    compatibilityDate: "2024-07-25",
});
