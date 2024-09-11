export default defineNuxtRouteMiddleware((to, from) => {
    const config = useAppConfig().sleek;
    const match = config.routes.find((r) => r.path === to.path);
    if (match) {
        useSeoMeta({
            applicationName: match?.title ?? config.name,
            title: match?.title ?? config.name,
            ogTitle: match?.title ?? config.name,
            description: match?.description ?? config.description,
            ogDescription: match?.description ?? config.description,
            author: config.author.name,
            creator: config.author.name,
            viewport: "width=device-width, initial-scale=1.0",
        });
    }
});
