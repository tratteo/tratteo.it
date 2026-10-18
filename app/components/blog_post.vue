<template>
    <NuxtLink :to="article.path" class="post ds-cell ds-cell--interactive">
        <div class="post__media">
            <img :src="article.thumbnail" :alt="article.title" class="post__img" loading="lazy" />
        </div>

        <div class="post__body">
            <div class="post__text">
                <div class="post__meta mono-micro">
                    <span v-if="index" class="post__index">[{{ String(index).padStart(2, "0") }}]</span>
                    <span class="post__date">{{ date }}</span>
                    <span v-if="readingTime" class="post__read">{{ readingTime }}</span>
                    <span v-if="isNew" class="post__new">New</span>
                </div>

                <h3 class="post__title ds-strong">{{ article.title }}</h3>
                <p class="post__desc">{{ article.description }}</p>
            </div>

            <div v-if="article.tags?.length" class="post__tags">
                <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="post__tag mono-micro">
                    <span class="post__tag-hash">#</span>{{ tag }}
                </span>
                <span v-if="article.tags.length > 3" class="post__tag post__tag--more mono-micro">+{{ article.tags.length - 3 }}</span>
            </div>
        </div>

        <div class="post__foot">
            <span class="mono-micro post__author">{{ article.author.name }}</span>
            <span class="post__arrow" aria-hidden="true">
                <span class="post__glyph post__glyph--out">
                    <u-icon name="material-symbols:arrow-outward-rounded" class="size-4" />
                </span>
                <span class="post__glyph post__glyph--in">
                    <u-icon name="material-symbols:arrow-outward-rounded" class="size-4" />
                </span>
            </span>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { ArticlesCollectionItem } from "@nuxt/content";
import dayjs from "dayjs";

const props = defineProps<{ article: ArticlesCollectionItem; index?: number }>();

const date = computed(() => dayjs(props.article.date).format("DD MMM YYYY").toUpperCase());
const readingTime = computed(() => (props.article.meta as { readingTime?: { text?: string } } | undefined)?.readingTime?.text);

const isNew = computed(() => Math.abs(Date.now() - new Date(props.article.date).getTime()) < 86400000 * 7);
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* A post is a module: framed media on top, the reading above the fold of the
   cell, and the byline on the floor. Fills its grid row, so the seams line up. */
.post {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
}

.post__media {
    position: relative;
    aspect-ratio: 16 / 9;
    flex-shrink: 0;
    overflow: hidden;
    border-bottom: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
}

.post__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.85);
    transition:
        filter 0.5s var(--ds-ease),
        transform 0.7s var(--ds-ease);
}

.post:hover .post__img {
    filter: grayscale(0);
    transform: scale(1.03);
}

.post__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.6rem;
    padding: var(--ds-pad);
}

.post__text {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.post__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3rem 0.75rem;
    color: var(--ds-text-dim);
}

.post__index {
    color: var(--ds-text-faint);
}

.post__new {
    padding: 0.1rem 0.35rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    color: var(--ds-ok);
}

.post__title {
    font-size: 1.0625rem;
    line-height: 1.35;
}

.post__desc {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
}

.post__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: auto;
    padding-top: 0.5rem;
}

.post__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.1rem;
    padding: 0.2rem 0.45rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    color: var(--ds-text-muted);
}

.post__tag-hash {
    color: var(--ds-text-faint);
}

.post__tag--more {
    border-style: dashed;
}

.post__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem var(--ds-pad);
    border-top: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
}

.post__author {
    color: var(--ds-text-dim);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Same glyph hand-off the work rows use, so the whole site moves alike. */
.post__arrow {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    flex-shrink: 0;
    overflow: hidden;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-2);
    color: var(--ds-text-muted);
    transition:
        border-color var(--ds-quick) var(--ds-ease-out),
        color var(--ds-quick) var(--ds-ease-out);
}

.post__glyph {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s var(--ds-ease);
}

.post__glyph--in {
    transform: translate(-120%, 120%);
}

.post:hover .post__arrow {
    border-color: var(--ds-line-contrast);
    color: var(--ds-text);
}

.post:hover .post__glyph--out {
    transform: translate(120%, -120%);
}

.post:hover .post__glyph--in {
    transform: translate(0, 0);
}
</style>
