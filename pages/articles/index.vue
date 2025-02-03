<template>
    <div class="flex flex-col gap-6 items-start w-full">
        <h1>List of Articles</h1>
        <input type="text" v-model="titleFilter" placeholder="Search by title" class="input input-bordered w-full" />
        <section class="flex flex-row flex-wrap items-stretch justify-center gap-8">
            <NuxtLink v-for="article in filteredArticles" v-bind:key="article._path" :to="`${article._path}`" class="flex group">
                <div class="relative card article-card">
                    <figure>
                        <img class="aspect-[2/1] group-hover:scale-110 transition-all duration-[250ms] ease-out" :src="`${article.cover}`" :alt="article.title" />
                    </figure>

                    <div class="card-body relative justify-between">
                        <p class="font-bold text-base">{{ article?.title }}</p>
                        <div class="flex flex-col items-stretch gap-2">
                            <div class="flex flex-wrap flex-row items-end justify-between gap-2">
                                <div class="card-actions gap-4 flex flex-col items-start">
                                    <div class="avatar">
                                        <div class="w-16 rounded-full">
                                            <img :src="article?.author_avatar" alt="author avatar" />
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row gap-2 items-center">
                                    <div v-for="k in article?.tags" class="badge badge-sm badge-success">{{ k }}</div>
                                </div>
                            </div>
                            <div class="flex flex-row items-center justify-end gap-2">
                                <div v-if="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7" class="badge badge-primary z-[100]">New</div>

                                <p class="text-xs flex-none opacity-75">{{ fns.format(new Date(article?.date), "dd MMM yyyy") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </section>
    </div>
</template>

<script lang="ts" setup>
import * as fns from "date-fns";
import l from "lodash";
const { data: articles } = await useAsyncData("article-home", () =>
    queryContent("/aricles").only(["title", "_path", "date", "cover", "tags", "author", "author_avatar", "author_id"]).where({ published: true }).sort({ date: -1 }).find()
);

const titleFilter = ref<string>("");

const filteredArticles = computed(() => {
    return titleFilter.value.length > 0
        ? l.take(
              l.orderBy(articles.value, (a) => similarity(a.title ?? "", titleFilter.value), "desc"),
              5
          )
        : l.orderBy(articles.value, "date", "desc");
});

// useSeoMeta({
//     title: "Scuba Diving Tips & Guides: Dive Community Blog",
//     description: "Expert free scuba diving guides, safety tips, and gear reviews from experienced divers. Learn about dive techniques and open water best practices.",
// });
</script>

<style lang="css" scoped>
.article-card {
    @apply bg-base-200 card-compact image-full border border-base-content/20 shadow-lg min-w-[15rem] w-full max-w-[28rem];
}
</style>
