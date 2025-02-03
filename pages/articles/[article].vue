<template>
    <article v-if="data" class="mx-auto flex flex-col items-center my-4 gap-12">
        <header clas="flex flex-col">
            <div class="max-w-6xl card card-compact lg:card-normal bg-base-100 image-full shadow-xl shadow-primary/10 overflow-hidden">
                <img class="aspect-[5/2] object-cover w-full h-full" :src="data?.cover" :alt="data?.title" />
                <div class="card-body justify-start">
                    <h2 class="mb-2">{{ data?.title }}</h2>
                    <p class="hidden md:block font-semibold text-sm md:text-base">{{ data?.description }}</p>
                    <div class="flex-1 flex flex-wrap flex-row items-end justify-between gap-2">
                        <div class="card-actions gap-4 flex flex-col items-start">
                            <div class="flex flex-row items-center gap-4">
                                <div class="avatar">
                                    <div class="w-20 rounded-full">
                                        <img :src="publisher?.image" alt="article author avatar" />
                                    </div>
                                </div>
                                <div class="flex flex-col items-start">
                                    <p class="font-bold">{{ publisher?.name }}</p>
                                    <p v-if="publisher?.description" class="text-sm opacity-85">{{ publisher.description }}</p>
                                    <button v-if="authorEl" @click="focusAboutAuthor" class="btn btn-outline btn-xs mt-1">
                                        <icon name="material-symbols:chat-info-rounded" class="size-4"></icon>
                                        About
                                    </button>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 items-center flex-wrap">
                                <div v-for="k in data?.tags" class="badge badge-success">{{ k }}</div>
                            </div>
                        </div>

                        <div class="flex flex-row items-center gap-6">
                            <p class="flex flex-row items-center gap-1 text-sm opacity-85">
                                <icon name="material-symbols:calendar-today-rounded" class="text-primary"></icon> {{ fns.format(new Date(data?.date), "dd MMM yyyy") }}
                            </p>
                            <p v-if="data?.read_time" class="flex flex-row items-center gap-1 text-sm opacity-85">
                                <icon name="material-symbols:alarm-rounded" class="text-primary"></icon> {{ data?.read_time }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="items-start flex flex-col max-w-4xl">
            <h1 class="mb-2">{{ data.title }}</h1>
            <p class="font-semibold">{{ data.description }}</p>
            <TableOfContents v-if="data?.enable_toc && data.body" class="mt-8" :document="data.body" />
            <div class="divider"></div>
            <div class="w-full flex justify-center text-wrap">
                <ContentRenderer v-if="mounted" :value="data" class="markdown-content" @vue:mounted="onContentMounted" />
            </div>
        </div>
        <div class="divider h-0"></div>
        <FunnelCard></FunnelCard>
        <ScrollTopFab></ScrollTopFab>
    </article>
    <div v-else>
        <FunnelCard></FunnelCard>
    </div>
</template>

<script lang="ts" setup>
import * as fns from "date-fns";
import sleekConfig from "~/sleek.config";
const { params } = useRoute();

const mounted = useMounted();
const { data } = await useAsyncData(`article-${params.article}`, () => queryContent(`/articles/${params.article}`).findOne(), { deep: true, immediate: true });

const publisher = ref();
const authorEl = ref<HTMLElement | null>();

updateMeta();

//const minutesRead = computed(() => (data.value?.body?.toString()?.split(/\s+/).length ?? 0) / 200);
function updateMeta() {
    publisher.value = {
        name: data.value?.author,
        url: sleekConfig.author.url,
        description: data.value?.author_description,
        image: `${sleekConfig.url}${data.value?.author_avatar}`,
    };
    useSchemaOrg([
        defineArticle({
            "@type": "BlogPosting",
            headline: data.value?.title,
            description: data.value?.description,
            image: `${sleekConfig.url}${data.value?.cover}`,
            datePublished: data.value?.date,
            dateModified: data.value?.date,
            keywords: data.value?.keywords,
            author: publisher.value,
            publisher: publisher.value,
            mainEntityOfPage: { "@id": sleekConfig.url },
        }),
    ]);
    useSeoMeta({
        title: data.value?.title,
        description: data.value?.description,
        author: data.value?.author,
        articleSection: `${data.value?.keywords?.join(", ")}`,
        articleTag: data.value?.tags,
        articleModifiedTime: data.value?.date,
    });

    defineOgImageComponent("Article", {
        thumbnail: data.value?.cover,
        title: data.value?.title,
        author: {
            name: publisher.value.name,
            image: data.value?.author_avatar,
        },
    });
}

function onContentMounted() {
    setTimeout(() => {
        authorEl.value = document.getElementById("author-about");
    }, 500);
}
function focusAboutAuthor() {
    scrollToEl(authorEl.value);
}
</script>

<style lang="css"></style>
