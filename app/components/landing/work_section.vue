<template>
    <section id="work" class="section ds-container">
        <DsSectionHead
            eyebrow="Selected work"
            :title="['Things I built,', 'and actually shipped.']"
            lead="Some are products, some are tools, a couple are experiments that found real users. Every one of them is live (or was, until I learned what I needed to)."
        />

        <div class="work">
            <DsReveal v-if="featured">
                <DsTiltCard :max="5">
                    <a :href="featured.url ?? '#'" target="_blank" rel="noopener noreferrer" class="work__link">
                        <DsGlassCard radius="xl" padding="none" interactive class="relative flex min-h-[26rem] items-end">
                            <img v-if="featured.thumbnail" :src="featured.thumbnail" :alt="featured.title" class="work__media" />
                            <span class="work__scrim" />
                            <div class="work__featured-body">
                                <div class="work__featured-top">
                                    <img v-if="featured.icon" :src="featured.icon" :alt="featured.title" class="work__logo" />
                                    <span class="work__badge">{{ featured.role }}</span>
                                </div>
                                <h3 class="display-md work__featured-title">{{ featured.title }}</h3>
                                <p class="work__desc work__desc--lead">{{ featured.description }}</p>
                                <div class="work__tags">
                                    <span v-for="tag in featured.tags" :key="tag" class="work__tag">{{ tag }}</span>
                                </div>
                            </div>
                            <span class="work__arrow work__arrow--featured">
                                <u-icon name="material-symbols:arrow-outward-rounded" class="size-5" />
                            </span>
                        </DsGlassCard>
                    </a>
                </DsTiltCard>
            </DsReveal>

            <div class="work__grid">
                <DsReveal v-for="(project, i) in others" :key="project.title" :delay="(i % 3) * 0.06">
                    <component
                        :is="project.url ? 'a' : 'div'"
                        :href="project.url ?? undefined"
                        :target="project.url ? '_blank' : undefined"
                        :rel="project.url ? 'noopener noreferrer' : undefined"
                        class="work__link"
                    >
                        <DsGlassCard padding="none" interactive class="flex h-full flex-col">
                            <div class="work__thumb">
                                <img v-if="project.thumbnail" :src="project.thumbnail" :alt="project.title" class="work__thumb-img" />
                                <span class="work__scrim work__scrim--soft" />
                                <span class="work__status">
                                    <u-icon :name="statusIcon(project.status)" class="size-3.5" />
                                    {{ capitalize(project.status) }}
                                </span>
                            </div>
                            <div class="work__body">
                                <div class="work__head">
                                    <img v-if="project.icon" :src="project.icon" :alt="project.title" class="work__logo work__logo--sm" />
                                    <h3 class="work__title">{{ project.title }}</h3>
                                </div>
                                <p class="work__desc">{{ project.description }}</p>
                                <div class="work__tags">
                                    <span v-for="tag in project.tags" :key="tag" class="work__tag">{{ tag }}</span>
                                </div>
                            </div>
                        </DsGlassCard>
                    </component>
                </DsReveal>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import projectsData from "~/data/projects.json";
import { capitalize } from "~~/shared/utils/string";

interface Project {
    title: string;
    role?: string;
    status: string;
    thumbnail?: string;
    description: string;
    url?: string | null;
    icon?: string;
    tags: string[];
}

const statusPriority: Record<string, number> = { shipped: 1, validating: 2, archived: 3 };

const projects = computed(() => [...(projectsData.projects as Project[])].sort((a, b) => (statusPriority[a.status] ?? 9) - (statusPriority[b.status] ?? 9)));

const featured = computed(() => projects.value.find((project) => project.title === "Reviy"));
const others = computed(() => projects.value.filter((project) => project.title !== "Reviy"));

function statusIcon(status: string): string {
    if (status === "archived") return "material-symbols:archive-outline-rounded";
    if (status === "validating") return "material-symbols:visibility-outline-rounded";
    return "material-symbols:rocket-launch-outline-rounded";
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.work {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
}

.work__link {
    display: block;
    height: 100%;
}

.work__grid {
    display: grid;
    gap: 1.15rem;
    grid-template-columns: 1fr;
}

/* featured */
.work__media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    transition: transform 0.9s var(--ds-ease), opacity 0.5s var(--ds-ease);
}

.work__link:hover .work__media {
    transform: scale(1.04);
    opacity: 0.55;
}

.work__scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, var(--ds-bg) 6%, color-mix(in srgb, var(--ds-bg) 55%, transparent) 55%, transparent 100%);
}

.work__scrim--soft {
    background: linear-gradient(to top, var(--ds-bg) 2%, transparent 70%);
}

.work__featured-body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: clamp(1.5rem, 4vw, 2.75rem);
    max-width: 46rem;
}

.work__featured-top {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.work__logo {
    width: 2.4rem;
    height: 2.4rem;
    object-fit: contain;
}

.work__logo--sm {
    width: 1.75rem;
    height: 1.75rem;
}

.work__badge {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ds-text-muted);
    padding: 0.25rem 0.6rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-hairline-strong);
}

.work__featured-title {
    margin-top: 0.15rem;
}

.work__desc {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
    flex: 1;
}

.work__desc--lead {
    font-size: 1rem;
    max-width: 44ch;
}

.work__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.work__tag {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ds-text-dim);
    padding: 0.2rem 0.5rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-hairline);
}

.work__arrow {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass-strong);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    color: var(--ds-text);
    transition: transform 0.45s var(--ds-ease);
}

.work__link:hover .work__arrow {
    transform: translate(3px, -3px);
}

/* standard cards */
.work__thumb {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--ds-bg-deep);
}

.work__thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
    transition: transform 0.8s var(--ds-ease), opacity 0.5s var(--ds-ease);
}

.work__link:hover .work__thumb-img {
    transform: scale(1.05);
    opacity: 0.78;
}

.work__status {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.06em;
    color: var(--ds-text);
    padding: 0.25rem 0.55rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass-strong);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.work__body {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.1rem 1.25rem 1.35rem;
    flex: 1;
}

.work__head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.work__title {
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--ds-text);
}

.work__tags {
    margin-top: auto;
    padding-top: 0.5rem;
}

@media (min-width: 640px) {
    .work__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .work__grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
