<template>
    <article class="max-w-[80rem] mx-auto flex flex-col gap-16">
        <header clas="flex flex-col">
            <div class="card bg-base-100 image-full shadow-xl overflow-hidden">
                <img class="aspect-[2/1] object-cover h-full w-full" :src="data?.cover" :alt="data?.title" />
                <div class="card-body justify-end">
                    <h2>{{ data?.title }}</h2>
                    <h4 class="font-bold my-2">{{ data?.description }}</h4>
                    <div class="flex flex-wrap flex-row items-end justify-between gap-2">
                        <div class="card-actions gap-8 flex flex-col items-start">
                            <div class="avatar">
                                <div class="mask mask-squircle w-20">
                                    <img :src="data?.author_avatar" />
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 items-center flex-wrap">
                                <div v-for="k in data?.tags" class="badge badge-secondary">{{ k }}</div>
                            </div>
                        </div>
                        <i class="text-end text-sm opacity-75"
                            >Published on {{ new Date(data?.date).toLocaleDateString() }}</i
                        >
                    </div>
                </div>
            </div>
        </header>
        <div class="items-start flex flex-col">
            <TableOfContents v-if="data?.enable_toc && data.body" :document="data.body" />
            <div class="divider"></div>
            <div class="w-full flex justify-center text-wrap">
                <ContentRenderer :value="data ?? {}" class="article-content" />
            </div>
        </div>
        <Transition name="fade">
            <button
                v-if="scroll.y.value > 0 && bp.greaterOrEqual('lg').value"
                @click="scrollToTop"
                class="btn btn-primary fixed right-32 bottom-32"
            >
                <icon name="material-symbols:keyboard-arrow-up-rounded"></icon>
            </button>
        </Transition>
    </article>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
const bp = useBreakpoints(breakpointsTailwind);

const { params } = useRoute();
const scroll = useScrollProgress();
const { data } = useAsyncData(`article-${params.article}`, () => queryContent(`/articles/${params.article}`).findOne());

function scrollToTop() {
    window.scrollTo(0, 0);
}

useSeoMeta({
    title: data.value?.title,
    description: data.value?.description,
    articleAuthor: data.value?.author,
    articleSection: `${data.value?.keywords?.join(", ")}`,
});
</script>

<style lang="css">
html {
    scroll-padding-top: 5rem;
}
.article-content {
    @apply lg:max-w-[75%] !important;

    h1 {
        @apply my-12;
    }
    h2 {
        @apply mt-10;
    }
    h3 {
        @apply mt-6;
    }

    code {
        word-break: normal;
        overflow-wrap: anywhere;
        @apply bg-base-300 px-2 rounded-md font-inconsolata;
    }

    pre {
        @apply px-4 bg-base-300 rounded-lg my-4 text-wrap;
    }
}
</style>
