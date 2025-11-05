<template>
    <u-page :ui="{ center: 'lg:col-span-7!' }">
        <template #right>
            <u-page-aside :ui="{ root: 'lg:col-span-3!' }">
                <u-page-anchors :links="anchorLinks"></u-page-anchors>
                <u-content-toc v-if="data" :links="data.body.toc?.links" highlight></u-content-toc>
                <u-field-group class="w-full">
                    <u-button @click="share" label="Share this article" icon="material-symbols:share" variant="outline" color="neutral" class="grow"> </u-button>
                    <u-dropdown-menu :items="[{ label: 'Copy URL', icon: 'mdi:link-variant', onSelect: copyLink }]">
                        <u-button icon="i-lucide-chevron-down" variant="subtle" color="neutral"></u-button>
                    </u-dropdown-menu>
                </u-field-group>
            </u-page-aside>
        </template>
        <u-page-header :title="data?.title" :description="data?.description" :headline="data?.headline ?? 'Blog'">
            <div class="flex items-end gap-4 justify-between mt-4 flex-wrap">
                <div class="flex flex-col gap-4">
                    <u-user
                        :name="data?.author.name"
                        :description="data?.author.description"
                        :avatar="{ src: data?.author.avatar }"
                        :to="data?.author.url"
                        target="_blank"
                        class="cursor-default"
                        @click="() => authorEl?.scrollIntoView()"
                    ></u-user>
                    <div class="flex flex-row gap-2 items-center flex-wrap">
                        <u-badge v-for="k in data?.tags" color="primary" variant="soft">{{ k }}</u-badge>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <div class="flex items-center gap-2" v-if="data?.techstack">
                        <u-tooltip v-for="l in data.techstack" :text="l" :delay-duration="200">
                            <icon :name="`devicon:${l}`" class="size-6"></icon>
                        </u-tooltip>
                    </div>
                    <div class="flex flex-row items-center gap-4">
                        <p class="flex flex-row items-center gap-1 typ-label">
                            <icon name="material-symbols:calendar-today-rounded" class="text-primary"></icon> {{ dayjs(data?.date).format("DD MMM YYYY") }}
                        </p>
                        <p class="flex flex-row items-center gap-1 typ-label"><icon name="material-symbols:alarm-rounded" class="text-primary"></icon> {{ readingTimeText }}</p>
                    </div>
                </div>
            </div>
        </u-page-header>

        <u-content-toc v-if="data" :links="data.body.toc?.links" highlight class="lg:hidden"> </u-content-toc>
        <u-page-body>
            <ContentRenderer v-if="data" id="content" :value="data" class="markdown-content flex-1" />
            <div v-if="(links?.length ?? 0) > 0" class="flex flex-col gap-4 items-stretch">
                <u-separator></u-separator>
                <p class="font-semibold">Related articles</p>
                <u-carousel id="related-articles" v-slot="{ item, index }" :items="links!" dots :ui="{ item: 'md:basis-1/2 ' }" :autoplay="{ delay: 3000 }" class="mb-4">
                    <BlogPost :article="item"></BlogPost>
                </u-carousel>
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
const clipboard = useClipboard();
const toast = useToast();
const readingTimeText = computed(() => (data.value?.meta as any).readingTime?.text);

definePageMeta({
    layout: "blog",
});
const { data } = await useAsyncData(route.path, () => queryCollection("articles").path(route.path).first());

const { data: links } = await useAsyncData(`linked-${route.path}`, async () => {
    const res = await queryCollection("articles").where("path", "NOT LIKE", data.value?.path).all();
    return l.filter(l.orderBy(res, (a) => l.intersection(a.tags, data.value?.tags).length, "desc").slice(0, 5), (a) => l.intersection(a.tags, data.value?.tags).length > 0);
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
    links.push({ label: "All articles", to: "/articles", icon: "material-symbols:article-rounded" });

    return links;
});

function scrollTop() {
    document.documentElement.scrollTo({ top: 0 });
    navigateTo(route.path, { replace: true });
}

async function copyLink() {
    await clipboard.copy(window.location.href);
    toast.add({ title: "Copied to clipboad", icon: "material-symbols:check-circle-rounded", color: "success" });
}
async function share() {
    await navigator.share({ url: route.fullPath });
}

function updateMeta() {
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
                {
                    name: data.value?.title,
                },
            ],
        }),
        defineArticle({
            headline: data.value?.title,
            description: data.value?.description,
            image: data.value?.thumbnail,
            datePublished: dayjs(data.value?.date, "YYYY-MM-DD").toDate().toString(),
            keywords: data.value?.tags,
            author: {
                url: data.value?.author.url,
                name: data.value?.author.name,
                description: data.value?.author.description,
                image: data.value?.author.avatar,
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
            image: data.value?.author.avatar,
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

@variant max-lg {
    * {
        scroll-margin-top: calc(var(--ui-header-height) + 4rem) !important;
    }
}
</style>
