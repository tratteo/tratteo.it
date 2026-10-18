<template>
    <div class="blog ds-page">
        <section class="ds-container">
            <div class="blog__grid ds-matrix ds-bleed">
                <div class="ds-head-row blog__head">
                    <DsSectionHead
                        as="h1"
                        index="01"
                        eyebrow="Archive"
                        :title="['An actually useful blog,', 'no yapping.']"
                        lead="Tutorials, technical notes and the occasional deep dive. Everything here is something I actually built, so it comes with the mistakes included."
                    />
                </div>

                <!-- Toolbar: the search lives in the module, not in a floating
                     widget, so the page keeps a single frame. -->
                <div class="blog__toolbar">
                    <UContentSearchButton
                        :collapsed="false"
                        variant="outline"
                        color="neutral"
                        block
                        class="blog__search"
                        :ui="{ base: 'justify-between w-full', trailing: 'flex items-center gap-1' }"
                    >
                        <span class="mono-micro blog__search-label">Search the archive</span>
                        <template #trailing>
                            <u-kbd variant="soft" value="CTRL" />
                            <u-kbd variant="soft" value="K" />
                        </template>
                    </UContentSearchButton>

                    <span class="mono-micro blog__count">{{ String(articles?.length ?? 0).padStart(2, "0") }} entries</span>
                </div>

                <BlogPost v-for="(article, i) in articles" :key="article.path" :article="article" :index="i + 1" />

                <div v-if="!articles?.length" class="blog__empty ds-cell">
                    <span class="mono-micro blog__empty-label">No entries</span>
                    <p class="blog__empty-text">Nothing published yet. I'm writing, not yapping: give me a minute.</p>
                    <DsButton to="/" variant="ghost" size="sm" icon="material-symbols:north-rounded" glyph="none">Back home</DsButton>
                </div>

                <!-- Keeps the mesh closed where the last row is not full: one set
                     of slots for the two column layout, one for the three. -->
                <span v-for="n in voids2" :key="`void2-${n}`" class="ds-cell ds-cell--void blog__void blog__void--2" aria-hidden="true" />
                <span v-for="n in voids3" :key="`void3-${n}`" class="ds-cell ds-cell--void blog__void blog__void--3" aria-hidden="true" />
            </div>

            <!-- The palette is portalled, so it stays outside the matrix: a grid
                 child that renders nothing would still claim a cell. -->
            <ClientOnly>
                <u-content-search v-model:search-term="query" shortcut="meta_k" :files="files" :navigation="navigation" :fuse="{ resultLimit: 42 }" />
            </ClientOnly>
        </section>
    </div>
</template>

<script lang="ts" setup>
const { data: articles } = await useAsyncData("articles-home", () => queryCollection("articles").order("date", "DESC").all());
const { data: navigation } = await useAsyncData("navigation", () => queryCollectionNavigation("articles"));
const { data: files } = useLazyAsyncData("search", () => queryCollectionSearchSections("articles"), {
    server: false,
});
const query = ref("");

/* The grid is two up from 768px and three up from 1280px, so an incomplete last
   row needs empty slots in both layouts to keep the seams closed. */
const voids2 = computed(() => (articles.value?.length ?? 0) % 2);
const voids3 = computed(() => (3 - ((articles.value?.length ?? 0) % 3)) % 3);

useSeoMeta({
    title: "The safe spot for nerds and devs",
    description: "Coding tutorials, tech news, projects of any kind and some occasional yapping.",
});
defineOgImage("Default.takumi", { subtitle: "Blog for nerds" });
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
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.blog__grid {
    grid-template-columns: 1fr;
}

.blog__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding: var(--ds-pad);
    background: var(--ds-surface-1);
}

.blog__search {
    flex: 1 1 14rem;
    max-width: 26rem;
}

.blog__count {
    margin-left: auto;
    color: var(--ds-text-faint);
}

.blog__empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: calc(var(--ds-pad) * 3) var(--ds-pad);
}

.blog__empty-label {
    color: var(--ds-text-faint);
}

.blog__empty-text {
    font-size: 0.875rem;
    color: var(--ds-text-muted);
}

.blog__void {
    display: none;
}

@media (min-width: 768px) {
    .blog__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .blog__toolbar,
    .blog__empty {
        grid-column: 1 / -1;
    }

    .blog__void--2 {
        display: block;
    }
}

@media (min-width: 1280px) {
    .blog__grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .blog__void--2 {
        display: none;
    }

    .blog__void--3 {
        display: block;
    }
}
</style>
