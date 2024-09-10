<template>
    <div class="flex flex-col gap-4 items-start">
        <h2>List of Articles</h2>
        <input type="text" v-model="titleFilter" placeholder="Search by title" class="input input-bordered w-full" />
        <section class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
            <NuxtLink v-for="article in filteredArticles" v-bind:key="article._path" :to="`${article._path}`">
                <div class="card article-card min-h-[20rem]">
                    <figure>
                        <img class="aspect-[2/1]" :src="`${article.cover}`" :alt="article.title" />
                    </figure>

                    <div class="card-body relative justify-between">
                        <div
                            v-if="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7"
                            class="top-2 right-2 absolute badge badge-primary badge-lg font-bold"
                        >
                            New
                        </div>
                        <h2>{{ article?.title }}</h2>

                        <div class="flex flex-wrap flex-row items-end justify-between gap-2">
                            <div class="card-actions gap-4 flex flex-col items-start">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-16">
                                        <img :src="article?.author_avatar" />
                                    </div>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <div v-for="k in article?.tags" class="badge badge-secondary">{{ k }}</div>
                                </div>
                            </div>
                            <i class="text-end text-sm opacity-75"
                                >Published on {{ new Date(article?.date).toLocaleDateString() }}</i
                            >
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </section>
    </div>
</template>

<script lang="ts" setup>
import l from "lodash";
const { data: articles } = await useAsyncData("articles-home", () =>
    queryContent("/articles")
        .only(["title", "_path", "date", "cover", "tags", "author", "author_avatar"])
        .where({ published: true })
        .sort({ date: -1 })
        .find()
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
</script>

<style lang="css" scoped>
.article-card {
    @apply bg-base-200 image-full shadow-xl hover:scale-[102%] transition-all duration-200 ease-out;
}
</style>
