<template>
    <u-page>
        <u-page-header
            title="An actually useful blog, no yapping."
            description="Coding tutorials, tech news and much more: here you will find cool articles that just gives you useful information without yapping."
            headline="I talk and teach you about stuff."
        >
            <template #links>
                <u-field-group class="">
                    <u-content-search-button variant="outline">
                        <div class="flex items-center gap-4">
                            Search
                            <div class="flex gap-1 items-center">
                                <u-kbd variant="soft">CTRL</u-kbd>
                                <u-kbd variant="soft">K</u-kbd>
                            </div>
                        </div>
                    </u-content-search-button>
                </u-field-group>
            </template>
        </u-page-header>
        <u-page-body>
            <ClientOnly>
                <u-content-search v-model:search-term="query" shortcut="meta_k" :files="files" :navigation="navigation" :fuse="{ resultLimit: 42 }"></u-content-search>
            </ClientOnly>
            <u-empty
                v-if="(articles?.length ?? 0) <= 0"
                title="No interesting material yet"
                description="Give me some time to create some boring stuff."
                variant="naked"
                :actions="[
                    { label: 'Go back home', to: '/' },
                    { label: '😢 Complain about this!', variant: 'subtle', color: 'neutral', onClick: complain },
                ]"
            >
            </u-empty>
            <u-blog-posts v-else>
                <BlogPost v-for="article in articles" :article="article"> </BlogPost>
            </u-blog-posts>
        </u-page-body>
    </u-page>
</template>

<script lang="ts" setup>
const { data: articles } = await useAsyncData("articles-home", () => queryCollection("articles").all());
const { data: navigation } = await useAsyncData("navigation", () => queryCollectionNavigation("articles"));
const { data: files } = useLazyAsyncData("search", () => queryCollectionSearchSections("articles"), {
    server: false,
});
const query = ref("");
const toast = useToast();
definePageMeta({
    layout: "blog",
});
useSeoMeta({
    title: "The safe spot for nerds and devs",
    description: "Coding tutorials, tech news, projects of any kind and some occasional yapping.",
});
useSchemaOrg([
    defineBreadcrumb({
        itemListElement: [
            {
                name: "Home",
                item: "/",
            },
            {
                name: "Articles",
                item: "/articles",
            },
        ],
    }),
]);
function complain() {
    toast.add({ title: "Are you serious?", description: "Are you really complaining because there is no content yet? Get a life!" });
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.articles-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 0.5fr));
    gap: 1rem;
    @apply grid w-full;
}
@variant md {
    .articles-grid {
        grid-template-columns: repeat(auto-fit, minmax(22rem, 0.5fr));
    }
}
</style>
