<template>
    <div class="article ds-page">
        <section v-if="data" class="ds-container">
            <div class="article__head ds-matrix ds-bleed">
                <div class="ds-head-row article__head-row">
                    <div class="article__crumb">
                        <NuxtLink to="/articles" class="eyebrow article__crumb-link">
                            <u-icon name="material-symbols:north-rounded" class="size-3 article__crumb-glyph" />
                            Archive
                        </NuxtLink>
                        <span class="article__rule" aria-hidden="true" />
                        <span class="mono-micro article__crumb-read">{{ date }} · {{ readingTime }}</span>
                    </div>

                    <h1 class="display-xl article__title">{{ data.title }}</h1>

                    <p class="lead article__lead">{{ data.description }}</p>

                    <div class="article__meta">
                        <div v-if="data.tags?.length" class="article__tags">
                            <span v-for="tag in data.tags" :key="tag" class="article__tag mono-micro"> <span class="article__tag-hash">#</span>{{ tag }} </span>
                        </div>

                        <div v-if="techs.length" class="article__stack">
                            <span v-for="tech in techs" :key="tech.key" class="article__tech">
                                <span v-if="tech.icon" class="article__tech-icon">
                                    <u-icon :name="tech.icon" class="size-3.5" />
                                </span>
                                <span class="mono-micro article__tech-label">{{ tech.label }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="data" class="ds-container">
            <div class="article__body ds-matrix ds-bleed">
                <div class="article__main">
                    <!-- Wrapped in a plain element: UContentToc has no single root,
                         so a scoped class cannot reach it directly. -->
                    <div v-if="data.body.toc?.links" class="article__toc-inline">
                        <u-content-toc :links="data.body.toc.links" highlight />
                    </div>

                    <ContentRenderer :value="data" class="markdown-content article__prose" />

                    <div class="article__author">
                        <AuthorAbout :src="data.author.avatar" :name="data.author.name">
                            <template #body>
                                <p>{{ data.author.description }}</p>
                            </template>
                            <template #actions>
                                <DsButton v-if="data.author.url" :to="data.author.url" external variant="ghost" size="sm" icon="material-symbols:arrow-outward-rounded">
                                    More about me
                                </DsButton>
                            </template>
                        </AuthorAbout>
                    </div>
                </div>

                <aside class="article__aside">
                    <div class="article__aside-inner">
                        <div class="article__panel">
                            <span class="mono-micro article__panel-label">Actions</span>
                            <div class="article__actions">
                                <DsButton
                                    v-for="link in anchorLinks"
                                    :key="link.label"
                                    :to="link.to"
                                    :external="link.external"
                                    variant="ghost"
                                    size="sm"
                                    :icon="link.icon"
                                    glyph="none"
                                    block
                                >
                                    {{ link.label }}
                                </DsButton>
                                <DsButton variant="ghost" size="sm" icon="material-symbols:content-copy-outline-rounded" glyph="none" block @click="copyLink">
                                    {{ copied ? "Copied" : "Copy link" }}
                                </DsButton>
                            </div>
                        </div>

                        <div v-if="data.body.toc?.links" class="article__panel">
                            <div class="article__toc">
                                <u-content-toc :links="data.body.toc.links" highlight />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <section v-if="links?.length" class="ds-container">
            <div class="article__related ds-matrix ds-bleed">
                <div class="article__band">
                    <span class="mono-micro article__band-index">02</span>
                    <span class="eyebrow">Related articles</span>
                    <span class="article__rule" aria-hidden="true" />
                </div>

                <BlogPost v-for="item in links" :key="item.path" :article="item" />

                <span v-for="n in relatedVoids" :key="`void-${n}`" class="ds-cell ds-cell--void article__void" aria-hidden="true" />
            </div>
        </section>

        <section v-if="surround?.length" class="ds-container">
            <div class="article__steps ds-matrix ds-bleed">
                <NuxtLink v-if="surround[0]" :to="surround[0].path" class="ds-cell ds-cell--interactive article__step" :class="!surround[1] && 'article__step--solo'">
                    <span class="mono-micro article__step-label">Previous</span>
                    <span class="article__step-title ds-strong">{{ surround[0].title }}</span>
                    <span class="mono-micro article__step-desc">{{ surround[0].description }}</span>
                </NuxtLink>

                <NuxtLink v-if="surround[1]" :to="surround[1].path" class="ds-cell ds-cell--interactive article__step article__step--next">
                    <span class="mono-micro article__step-label">Next</span>
                    <span class="article__step-title ds-strong">{{ surround[1].title }}</span>
                    <span class="mono-micro article__step-desc">{{ surround[1].description }}</span>
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import l from "lodash";
import { appMeta } from "~/app.meta";

const route = useRoute();
const clipboard = useClipboard();
const copied = ref(false);

const { data } = await useAsyncData(route.path, () => queryCollection("articles").path(route.path).first());

const { data: links } = await useAsyncData(`linked-${route.path}`, async () => {
    const res = await queryCollection("articles").where("path", "NOT LIKE", data.value?.path).all();
    return l.filter(l.orderBy(res, (a) => l.intersection(a.tags, data.value?.tags).length, "desc").slice(0, 4), (a) => l.intersection(a.tags, data.value?.tags).length > 0);
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
    return queryCollectionItemSurroundings("articles", route.path, {
        fields: ["description"],
    });
});

const date = computed(() => dayjs(data.value?.date).format("DD MMM YYYY").toUpperCase());
const readingTime = computed(() => (data.value?.meta as { readingTime?: { text?: string } } | undefined)?.readingTime?.text ?? "");

/* The related grid is two up from 768px, so an odd count needs one empty slot. */
const relatedVoids = computed(() => (links.value?.length ?? 0) % 2);

/* The article frontmatter stores devicon slugs. Map them to the marks the site
   already ships, so a language reads as a proper badge rather than a word. */
const TECH_ICONS: Record<string, string> = {
    nuxt: "logos:nuxt-icon",
    typescript: "logos:typescript-icon",
    javascript: "logos:javascript",
    vue: "logos:vue",
    css3: "logos:css-3",
    html5: "logos:html-5",
    cplusplus: "logos:c-plusplus",
    c: "logos:c",
    nodejs: "logos:nodejs-icon",
    python: "logos:python",
    firebase: "logos:firebase-icon",
    tailwindcss: "logos:tailwindcss-icon",
    git: "logos:git-icon",
    markdown: "logos:markdown",
    arduino: "logos:arduino",
    bun: "logos:bun",
};

const TECH_LABELS: Record<string, string> = {
    cplusplus: "C++",
    css3: "CSS",
    html5: "HTML",
    nodejs: "Node",
    tailwindcss: "Tailwind",
};

function techIcon(tech: string) {
    return TECH_ICONS[tech.toLowerCase()];
}

function techLabel(tech: string) {
    return TECH_LABELS[tech.toLowerCase()] ?? tech;
}

/* Resolved once, so the template stays free of lookups and type assertions. */
const techs = computed(() =>
    (data.value?.techstack ?? []).map((tech) => ({
        key: tech,
        icon: techIcon(tech),
        label: techLabel(tech),
    })),
);

const anchorLinks = computed(() => {
    const items: { label: string; to: string; icon: string; external?: boolean }[] = [];
    if (data.value?.youtube_tutorial) {
        items.push({ label: "Watch the video", to: data.value.youtube_tutorial, icon: "ion:logo-youtube", external: true });
    }
    if (data.value?.github_repo) {
        items.push({ label: "Open the repository", to: data.value.github_repo, icon: "mdi:github", external: true });
    }
    items.push({ label: "All articles", to: "/articles", icon: "material-symbols:archive-outline-rounded" });

    return items;
});

async function copyLink() {
    await clipboard.copy(window.location.href);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
}

updateMeta();

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

    defineOgImage("Default.takumi", {
        title: data.value?.title ?? "Article",
        subtitle: data.value?.description,
        media: data.value?.thumbnail,
        eyebrow: `${appMeta.author.name} · Article`,
        status: "Published",
        footer: [data.value?.author?.name ?? appMeta.author.name, ...(data.value?.tags ?? []).slice(0, 2), "tratteo.it", "Read the post"],
    });
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.article__head,
.article__body,
.article__related,
.article__steps {
    grid-template-columns: 1fr;
}

.article__head-row {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
}

/* ---- head ---- */
.article__crumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 0.75rem;
}

.article__crumb-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--ds-text-muted);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.article__crumb-link:hover {
    color: var(--ds-text);
}

/* The arrow points back to the archive, so it travels left on hover. */
.article__crumb-glyph {
    transform: rotate(-90deg);
    transition: transform 0.35s var(--ds-ease);
}

.article__crumb-link:hover .article__crumb-glyph {
    transform: rotate(-90deg) translateY(2px);
}

.article__rule {
    flex: 1 1 2rem;
    height: var(--ds-hair);
    background: var(--ds-line);
}

.article__crumb-read {
    color: var(--ds-text-faint);
}

.article__title {
    margin-top: 0.25rem;
    max-width: 26ch;
}

.article__lead {
    max-width: 56ch;
}

.article__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1rem;
}

.article__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
}

.article__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
    padding: 0.3rem 0.55rem;
    border: var(--ds-hair) solid var(--ds-line-strong);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-3);
    color: var(--ds-text);
}

.article__tag-hash {
    color: var(--ds-text-faint);
}

/* Code badges: the language mark keeps its own colour, the frame is ours. */
.article__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding-left: 0.6rem;
    border-left: var(--ds-hair) solid var(--ds-line);
}

/* One rectangle, divided: the language mark sits in a square cell and the label
   takes the rest, with a single hairline between them and one frame around both. */
.article__tech {
    display: inline-flex;
    align-items: stretch;
    overflow: hidden;
    border: var(--ds-hair) solid var(--ds-line-strong);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
}

.article__tech-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    flex-shrink: 0;
    border-right: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-2);
}

.article__tech-label {
    display: flex;
    align-items: center;
    padding: 0.28rem 0.55rem;
    color: var(--ds-text-muted);
}

/* ---- body ---- */
.article__main {
    min-width: 0;
    padding: calc(var(--ds-pad) * 1.6) var(--ds-pad) calc(var(--ds-pad) * 2);
}

.article__prose {
}

/* The inline TOC is for narrow screens; from lg the panel takes over. */
.article__toc-inline {
    margin-bottom: calc(var(--ds-pad) * 1.5);
    padding-bottom: var(--ds-pad);
    border-bottom: var(--ds-hair) solid var(--ds-line);
}

.article__author {
    margin-top: calc(var(--ds-pad) * 2.5);
}

/* The right column keeps the page surface, so it reads as part of the same
   module rather than a separate panel. The inner is what sticks. */
.article__body > .article__aside {
    background: var(--ds-surface-2);
}

.article__aside-inner {
    display: flex;
    flex-direction: column;
}

.article__panel {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: var(--ds-pad);
    background: transparent;
}

.article__panel + .article__panel {
    border-top: var(--ds-hair) solid var(--ds-line);
}

.article__panel-label {
    color: var(--ds-text-faint);
}

.article__actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.4rem;
}

.article__actions > * {
    justify-content: flex-start;
}

.article__toc {
    margin: 0;
}

/* ---- related ---- */
.article__band {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: calc(var(--ds-pad) * 1.6) var(--ds-pad);
    background: var(--ds-surface-1);
}

.article__band-index {
    color: var(--ds-text-faint);
}

.article__void {
    display: none;
}

/* ---- prev / next ---- */
.article__step {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: calc(var(--ds-pad) * 1.3) var(--ds-pad);
    color: inherit;
}

.article__step--next {
    text-align: right;
}

.article__step-label {
    color: var(--ds-text-faint);
}

.article__step-title {
    font-size: 1rem;
    line-height: 1.35;
}

.article__step-desc {
    color: var(--ds-text-dim);
    text-transform: none;
    letter-spacing: 0.02em;
}

@media (min-width: 768px) {
    .article__related,
    .article__steps {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .article__step--solo {
        grid-column: 1 / -1;
    }

    .article__void {
        display: block;
    }
}

@media (min-width: 1024px) {
    .article__body {
        grid-template-columns: minmax(0, 1fr) clamp(15rem, 21vw, 18rem);
    }

    .article__toc-inline {
        display: none;
    }

    .article__aside-inner {
        position: sticky;
        top: calc(var(--ds-nav-h) + 1rem);
    }
}
</style>
