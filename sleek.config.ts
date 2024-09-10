export const sleekConfig = {
    app: {
        id: "tratteo",
        name: "Matteo Beltrame",
        description: "Bootstrap your projects with Sleek",
        subtitle: "Create web applications in a blink with Sleek",
        author: "Matteo Beltrame",
        homepage: "https://sleek.it/",
        icon: "/trat.webp",
        email: "bltmtt+sleek@gmail.com",
        routes: [
            { path: "/support", title: "Help", description: "Get help and write me" },
            { path: "/docs", title: "Docs", description: "Learn how to use the app" },
            { path: "/app", title: "App", description: "Dashboard of the app" },
            { path: "/articles", title: "Blog", description: "Welcome to Sleek's blog" },
            { path: "/", title: "Welcome", description: "Welcome to the Sleek template" },
            { path: "/login", title: "Get started", description: "Get started with the Sleek template" },
        ],
        supportLinks: [
            {
                name: "PayPal",
                url: "https://paypal.me/tratteo",
                icon: "logos:paypal",
            },
            {
                name: "BuyMeACoffee",
                url: "https://www.buymeacoffee.com/tratteo",
                icon: "fluent-emoji-flat:kiwi-fruit",
            },
            {
                name: "Github Sponsor",
                url: "https://github.com/tratteo",
                icon: "mdi:github",
            },
        ],
        apiKey: process.env.NUXT_API_KEY,
        firebase: {
            enabled: false,
            enableEmulators: false,
            redirectToDashboard: false,
            apiKey: process.env.NUXT_FIREBASE_API_KEY,
            authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NUXT_FIREBASE_APP_ID,
        },
    },
    runtime: {
        apiKey: process.env.NUXT_API_KEY,
        stripe: {
            test: {
                secretApiKey: process.env.NUXT_STRIPE_SECRET_TEST_API_KEY,
            },
            secretApiKey: process.env.NUXT_STRIPE_SECRET_API_KEY,
        },
    },
};
