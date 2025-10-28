<template>
    <u-page>
        <u-page-header title="Welcome to my yapping place" description="Here you will find articles in which I yap about different stuff." headline="I talk about stuff.">
            <template #links>
                <u-field-group class="">
                    <u-input type="text" placeholder="Search by title" class="w-full" v-model.trim="query">
                        <template #trailing>
                            <div class="flex gap-1 items-center">
                                <u-kbd variant="soft">CTRL</u-kbd>
                                <u-kbd variant="soft">K</u-kbd>
                            </div>
                        </template>
                    </u-input>
                    <u-content-search-button variant="subtle"></u-content-search-button>
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
                <u-blog-post
                    v-for="article in articles"
                    :title="article.title"
                    :description="article.description"
                    :image="article.thumbnail"
                    :authors="[{ name: article.author, avatar: { src: article.author_avatar }, description: article.author_description }]"
                    :badge="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7 ? { label: 'New', color: 'primary' } : undefined"
                    :date="article.date"
                    :to="article.path"
                    variant="subtle"
                ></u-blog-post>
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
setPageLayout("blog");
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
