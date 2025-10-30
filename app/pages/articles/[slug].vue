<template>
    <u-page :ui="{ center: 'lg:col-span-7!' }">
        <template #right>
            <u-page-aside :ui="{ root: 'lg:col-span-3!' }">
                <u-page-anchors :links="anchorLinks"></u-page-anchors>

                <u-content-toc v-if="data" :links="data.body.toc?.links" highlight></u-content-toc>
                <div class="w-full flex items-center flex-wrap gap-1">
                    <u-button @click="scrollTop" label="Scroll top" class="grow" icon="material-symbols:keyboard-arrow-up-rounded" variant="soft" color="neutral"> </u-button>
                    <u-button @click="share" label="Share this article" class="grow" icon="material-symbols:share" variant="soft" color="neutral"> </u-button>
                    <u-button label="All articles" class="grow" icon="material-symbols:article-rounded" to="/articles" variant="soft" color="neutral"> </u-button>
                    <u-button
                        v-if="(links?.length ?? 0) > 0"
                        @click="() => relatedArticlesEl?.scrollIntoView()"
                        label="Related articles"
                        class="grow"
                        icon="material-symbols:keyboard-arrow-down-rounded"
                        variant="soft"
                        color="neutral"
                    >
                    </u-button>
                </div>
            </u-page-aside>
        </template>
        <u-page-header :title="data?.title" :description="data?.description" :headline="data?.headline ?? 'Blog'">
            <div class="flex items-end gap-4 justify-between mt-4">
                <div class="flex flex-col gap-4">
                    <u-user
                        :name="data?.author"
                        :description="data?.author_description"
                        :avatar="{ src: data?.author_avatar }"
                        class="cursor-default"
                        @click="() => authorEl?.scrollIntoView()"
                    ></u-user>
                    <div class="flex flex-row gap-2 items-center flex-wrap">
                        <u-badge v-for="k in data?.tags" color="primary" variant="soft">{{ k }}</u-badge>
                    </div>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <p class="flex flex-row items-center gap-1 typ-sublabel">
                        <icon name="material-symbols:calendar-today-rounded" class="text-primary"></icon> {{ dayjs(data?.date).format("DD MMM YYYY") }}
                    </p>
                    <p class="flex flex-row items-center gap-1 typ-sublabel"><icon name="material-symbols:alarm-rounded" class="text-primary"></icon> {{ readingTimeText }}</p>
                </div>
            </div>
        </u-page-header>

        <div class="lg:hidden w-fit flex items-center flex-wrap gap-2 my-2">
            <u-button @click="share" label="Share this article" class="grow" icon="material-symbols:share" variant="subtle" color="neutral"> </u-button>
            <u-button label="All articles" class="grow" icon="material-symbols:article-rounded" to="/articles" variant="subtle" color="neutral"> </u-button>
            <u-button
                @click="() => relatedArticlesEl?.scrollIntoView()"
                label="Related articles"
                class="grow"
                icon="material-symbols:keyboard-arrow-down-rounded"
                variant="subtle"
                color="neutral"
            >
            </u-button>
        </div>
        <u-content-toc v-if="data" :links="data.body.toc?.links" highlight class="lg:hidden"> </u-content-toc>
        <u-page-body>
            <ContentRenderer v-if="data" id="content" :value="data" class="markdown-content flex-1" />
            <div v-if="(links?.length ?? 0) > 0" class="flex flex-col gap-2 items-stretch">
                <u-separator></u-separator>
                <p class="font-semibold">Related articles</p>
                <u-blog-posts id="related-articles">
                    <u-blog-post
                        v-for="article in links"
                        :title="article.title"
                        :image="article.thumbnail"
                        :authors="[{ name: article.author, avatar: { src: article.author_avatar }, description: article.author_description }]"
                        :badge="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7 ? { label: 'New', color: 'primary' } : undefined"
                        :date="article.date"
                        :to="article.path"
                        variant="subtle"
                    ></u-blog-post>
                </u-blog-posts>
            </div>
            <u-content-surround :surround="surround"></u-content-surround>
        </u-page-body>
    </u-page>
</template>

<script lang="ts" setup>
import type { PageAnchor } from "@nuxt/ui";
import dayjs from "dayjs";
import l from "lodash";
import { appMeta } from "~/app.meta";

const route = useRoute();
const authorEl = ref<HTMLElement | null>();
const relatedArticlesEl = ref<HTMLElement | null>();
const readingTimeText = computed(() => (data.value?.meta as any).readingTime?.text);
definePageMeta({
    layout: "blog",
});
const { data } = await useAsyncData(route.path, () => queryCollection("articles").path(route.path).first());
const { data: links } = await useAsyncData(`linked-${route.path}`, async () => {
    const res = await queryCollection("articles").where("path", "NOT LIKE", data.value?.path).all();
    return l.orderBy(res, (a) => l.intersection(a.tags, data.value?.tags).length, "desc").slice(0, 5);
});
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
    return queryCollectionItemSurroundings("articles", route.path, {
        fields: ["description"],
    });
});

updateMeta();

const anchorLinks = computed(() => {
    const links: PageAnchor[] = [];
    if (data.value?.youtube_tutorial) {
        links.push({ label: "YouTube video", to: data.value?.youtube_tutorial, icon: "mdi:youtube", target: "_blank" });
    }
    if (data.value?.github_repo) {
        links.push({ label: "Repository", to: data.value?.github_repo, icon: "mdi:github", target: "_blank" });
    }
    return links;
});

function scrollTop() {
    document.documentElement.scrollTo({ top: 0 });
    navigateTo(route.path, { replace: true });
}
async function share() {
    await navigator.share({ url: route.fullPath });
}

function updateMeta() {
    useSchemaOrg([
        defineArticle({
            headline: data.value?.title,
            description: data.value?.description,
            image: data.value?.thumbnail,
            datePublished: dayjs(data.value?.date, "YYYY-MM-DD").toDate().toString(),
            keywords: data.value?.tags,
            author: {
                name: data.value?.author,
                description: data.value?.author_description,
                image: data.value?.author_avatar,
            },
            publisher: definePerson({
                name: appMeta.author.name,
                description: appMeta.author.description,
                image: appMeta.author.image,
                url: appMeta.author.url,
            }),
        }),
    ]);

    useSeoMeta({
        title: data.value?.title,
        description: data.value?.description,
    });

    defineOgImageComponent("Article", {
        thumbnail: data.value?.thumbnail,
        title: data.value?.title,
        tags: data.value?.tags,
        author: {
            name: data.value?.author,
            image: data.value?.author_avatar,
        },
    });
}

onMounted(() => {
    const contentEl = document.getElementById("content");
    authorEl.value = contentEl?.querySelector("#author-about");
    relatedArticlesEl.value = document.documentElement?.querySelector("#related-articles") as HTMLElement | undefined;
});
</script>

<style lang="css">
@reference "~/assets/css/main.css";
</style>
