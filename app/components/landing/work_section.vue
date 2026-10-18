<template>
    <section id="work" class="work ds-container">
        <div class="work__list ds-matrix ds-bleed">
            <DsSectionHead
                class="ds-head-row"
                index="02"
                eyebrow="Selected work"
                :title="['Things I built,', 'and actually shipped.']"
                lead="Some are products, some are tools, a couple are experiments that found real users. Every one of them is live (or was, until I learned what I needed to)."
            />

            <component
                v-for="(project, i) in projects"
                :key="project.title"
                :is="project.url ? 'a' : 'div'"
                :href="project.url ?? undefined"
                :target="project.url ? '_blank' : undefined"
                :rel="project.url ? 'noopener noreferrer' : undefined"
                class="ds-cell work__row"
                :class="project.url && 'ds-cell--interactive'"
            >
                <div class="work__ident">
                    <span class="work__index mono-micro">[{{ String(i + 1).padStart(2, "0") }}]</span>
                    <span class="work__fav">
                        <img :src="project.icon" :alt="project.title" class="work__fav-img" loading="lazy" />
                    </span>
                    <DsReveal class="work__name-slot" :delay="(i % 6) * 0.04">
                        <span class="work__name">
                            <span class="work__title">{{ project.title }}</span>
                            <span v-if="project.role" class="work__role mono-micro">{{ project.role }}</span>
                        </span>
                    </DsReveal>
                </div>

                <DsReveal class="work__desc-slot" :delay="(i % 6) * 0.04 + 0.06">
                    <p class="work__desc">{{ project.description }}</p>
                </DsReveal>

                <div class="work__tags">
                    <span v-for="tag in project.tags" :key="tag" class="work__tag mono-micro">{{ tag }}</span>
                </div>

                <div class="work__tail">
                    <DsBadge :tone="toneFor(project.status)">{{ capitalize(project.status) }}</DsBadge>
                    <!-- The arrow slot is always rendered, so every status badge in
                         the column starts on the same edge. A project without a
                         public link gets the archive mark instead of nothing. -->
                    <span class="work__arrow" :class="!project.url && 'work__arrow--muted'">
                        <template v-if="project.url">
                            <span class="work__glyph work__glyph--out">
                                <u-icon name="material-symbols:arrow-outward-rounded" class="size-4" />
                            </span>
                            <span class="work__glyph work__glyph--in">
                                <u-icon name="material-symbols:arrow-outward-rounded" class="size-4" />
                            </span>
                        </template>
                        <u-icon v-else name="material-symbols:archive-outline-rounded" class="size-4" />
                    </span>
                </div>
            </component>
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

/* Ordered by status. Every project carries its mark in the repo, so the list
   never depends on a remote favicon: the sites that are offline, archived or
   simply without one still show the right icon. */
const projects = computed<Project[]>(() =>
    [...(projectsData.projects as Project[])].sort((a, b) => (statusPriority[a.status] ?? 9) - (statusPriority[b.status] ?? 9)),
);

/* Status carries a colour, so a project reads at a glance: shipped is live,
   archived has stopped, validating sits in between. */
function toneFor(status: string): "ok" | "warn" | "info" {
    if (status === "archived") return "warn";
    if (status === "validating") return "info";
    return "ok";
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.work__list {
    grid-template-columns: 1fr;
}

/* One row per project, wrapping rather than switching layout, so the description
   only takes its own line when it actually needs one. */
.work__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1.2rem;
    padding: calc(var(--ds-pad) * 1.05) var(--ds-pad);
    color: inherit;
}

.work__ident {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 0 1 auto;
    min-width: 0;
}

.work__index {
    color: var(--ds-text-faint);
}

/* The mark sits in its own hairline cell, so light and dark icons both read. */
.work__fav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-3);
    overflow: hidden;
}

.work__fav-img {
    width: 1.15rem;
    height: 1.15rem;
    object-fit: contain;
}

.work__name {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.work__name-slot {
    min-width: 0;
}

.work__title {
    font-family: var(--font-heading);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.015em;
    color: var(--ds-text);
}

.work__role {
    color: var(--ds-text-dim);
}

.work__desc-slot {
    flex: 1 1 20rem;
    min-width: 0;
}

.work__desc {
    min-width: 0;
    font-size: 0.8125rem;
    line-height: 1.55;
    color: var(--ds-text-muted);
}

.work__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    flex: 0 0 auto;
}

.work__tag {
    padding: 0.2rem 0.45rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    color: var(--ds-text-dim);
}

.work__tail {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
    margin-left: auto;
}

/* The arrow keeps its square cell and the glyph swap carried over from the
   earlier language: it reads as an instrument rather than a decoration. */
.work__arrow {
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

.work__glyph {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s var(--ds-ease);
}

.work__glyph--in {
    transform: translate(-120%, 120%);
}

.work__row:hover .work__arrow {
    border-color: var(--ds-line-contrast);
    color: var(--ds-text);
}

.work__row:hover .work__glyph--out {
    transform: translate(120%, -120%);
}

.work__row:hover .work__glyph--in {
    transform: translate(0, 0);
}

/* No destination: the mark stays muted and the row is not clickable. */
.work__arrow--muted {
    color: var(--ds-text-faint);
}
</style>
