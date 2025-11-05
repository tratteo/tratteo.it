<template>
    <u-blog-post
        :title="article.title"
        :description="article.description"
        :image="article.thumbnail"
        :authors="[{ name: article.author.name, avatar: { src: article.author.avatar }, description: article.author.description, to: article.author.url, target: '_blank' }]"
        :badge="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7 ? { label: 'New', color: 'success' } : undefined"
        :date="article.date"
        :to="article.path"
        variant="naked"
    >
        <template #description>
            <div class="flex flex-col gap-2">
                <p>{{ article.description }}</p>
                <div class="flex flex-row justify-between gap-2 flex-wrap">
                    <div class="flex flex-row gap-2 items-center flex-wrap">
                        <u-badge v-for="k in article?.tags" color="primary" variant="soft">{{ k }}</u-badge>
                    </div>
                    <div class="flex items-center gap-2" v-if="article?.techstack">
                        <u-tooltip v-for="l in article.techstack" :text="l" :delay-duration="200">
                            <icon :name="`devicon:${l}`"></icon>
                        </u-tooltip>
                    </div>
                </div>
            </div>
        </template>
    </u-blog-post>
</template>

<script lang="ts" setup>
import type { ArticlesCollectionItem } from "@nuxt/content";

const props = defineProps<{ article: ArticlesCollectionItem }>();
</script>

<style></style>
