<template>
    <section id="about" class="about ds-container">
        <div class="about__grid ds-matrix ds-bleed">
            <DsSectionHead class="ds-head-row" index="03" :eyebrow="about.eyebrow" :title="about.title" title-class="max-w-[22ch]" />

            <DsReveal class="about__item about__item--copy" as="div">
                <div class="about__copy">
                    <p v-for="(paragraph, i) in about.paragraphs" :key="i" class="lead about__paragraph">{{ paragraph }}</p>
                </div>
            </DsReveal>

            <div class="about__item about__item--media">
                <img src="/trat.jpg" alt="Portrait of Matteo Beltrame" width="1024" height="1024" class="about__portrait" loading="lazy" />
            </div>

            <div v-for="(stat, i) in stats" :key="stat.label" class="about__item about__item--stat">
                <div class="about__stat">
                    <DsReveal :delay="0.1 + i * 0.04">
                        <div class="about__stat-text">
                            <span class="about__stat-index mono-micro">[{{ String(i + 1).padStart(2, "0") }}]</span>
                            <span class="about__stat-value">{{ stat.value }}</span>
                            <span class="about__stat-label mono-micro">{{ stat.label }}</span>
                        </div>
                    </DsReveal>
                </div>
            </div>

            <!-- Experience and education share one grid: row n of each column is
                 entry n, and the unused education rows stay empty. -->
            <div class="about__colhead about__item--exp">
                <span class="eyebrow">Experience</span>
                <span class="about__rule" aria-hidden="true" />
            </div>

            <DsReveal v-for="(entry, i) in experience" :key="entry.role" class="about__item about__item--exp" :delay="(i % 4) * 0.04" as="div">
                <div class="timeline__item">
                    <span class="timeline__index mono-micro">{{ String(i + 1).padStart(2, "0") }}</span>
                    <div class="timeline__content">
                        <div class="timeline__row">
                            <div class="timeline__identity">
                                <p class="timeline__role">{{ entry.role }}</p>
                                <component
                                    :is="entry.orgHref ? 'a' : 'span'"
                                    :href="entry.orgHref"
                                    :target="entry.orgHref ? '_blank' : undefined"
                                    :rel="entry.orgHref ? 'noopener noreferrer' : undefined"
                                    class="timeline__org"
                                >
                                    {{ entry.org }}
                                    <u-icon v-if="entry.orgHref" name="material-symbols:arrow-outward-rounded" class="size-3 opacity-50" />
                                </component>
                            </div>
                            <div class="timeline__meta">
                                <span class="timeline__kind mono-micro">{{ entry.kind }}</span>
                                <span class="timeline__period mono-micro">{{ entry.period }}</span>
                            </div>
                        </div>
                        <p class="timeline__desc">{{ entry.description }}</p>
                    </div>
                </div>
            </DsReveal>

            <div class="about__colhead about__item--edu">
                <span class="eyebrow">Education</span>
                <span class="about__rule" aria-hidden="true" />
            </div>

            <DsReveal
                v-for="(item, i) in education"
                :key="item.title"
                class="about__item about__item--edu"
                :delay="0.08 + i * 0.04"
                as="div"
            >
                <div class="edu__cell">
                    <div class="edu__head">
                        <span class="edu__index mono-micro">[{{ String(i + 1).padStart(2, "0") }}]</span>
                        <p class="edu__title">{{ item.title }}</p>
                        <span class="edu__grade mono-micro">{{ item.grade }}</span>
                    </div>
                    <a :href="item.schoolHref" target="_blank" rel="noopener noreferrer" class="edu__school">
                        {{ item.school }}
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-3 opacity-50" />
                    </a>
                    <p class="edu__thesis">{{ item.thesis }}</p>
                    <p class="edu__abstract">{{ item.abstract }}</p>
                </div>
            </DsReveal>

            <span v-for="n in voids" :key="`void-${n}`" class="ds-cell ds-cell--void about__void" aria-hidden="true" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { about, education, experience, stats } from "~/data/landing";

/* One empty slot per experience row that education has no entry for. */
const voids = computed(() => Array.from({ length: Math.max(0, experience.length - education.length) }, (_, i) => i));
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.about__grid {
    grid-template-columns: 1fr;
}

.about__copy {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: var(--ds-pad);
}

.about__paragraph {
    max-width: 58ch;
}

.about__portrait {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    filter: grayscale(0.6);
    transition: filter 0.5s var(--ds-ease);
}

.about__portrait:hover {
    filter: grayscale(0);
}

/* ---- stats ---- */
.about__stat {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: var(--ds-pad);
    height: 100%;
    justify-content: center;
}

.about__stat-text {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.about__stat-index {
    color: var(--ds-text-faint);
}

.about__stat-value {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 2.4vw, 2.1rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    color: var(--ds-text);
}

.about__stat-label {
    color: var(--ds-text-dim);
}

/* ---- column heads ---- */
.about__colhead {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem var(--ds-pad);
    background: var(--ds-surface-1);
}

.about__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}

/* ---- experience ---- */
.timeline__item {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr);
    gap: 0.5rem;
    padding: var(--ds-pad);
    height: 100%;
}

.timeline__index {
    color: var(--ds-text-faint);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.timeline__item:hover .timeline__index {
    color: var(--ds-text);
}

.timeline__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.timeline__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
}

.timeline__identity {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.timeline__role {
    font-family: var(--font-heading);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.015em;
    color: var(--ds-text);
}

.timeline__org {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    width: fit-content;
    font-size: 0.8125rem;
    color: var(--ds-text-muted);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

a.timeline__org:hover {
    color: var(--ds-text);
}

.timeline__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    flex-shrink: 0;
}

.timeline__kind,
.timeline__period {
    color: var(--ds-text-dim);
}

.timeline__desc {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
    max-width: 46ch;
}

/* ---- education ---- */
.edu__cell {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: var(--ds-pad);
    height: 100%;
}

.edu__head {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
}

.edu__index {
    color: var(--ds-text-faint);
}

.edu__title {
    flex: 1;
    font-family: var(--font-heading);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.015em;
    color: var(--ds-text);
}

.edu__grade {
    flex-shrink: 0;
    padding: 0.15rem 0.4rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    color: var(--ds-text);
    white-space: nowrap;
}

.edu__school {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    width: fit-content;
    font-size: 0.8125rem;
    color: var(--ds-text-muted);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.edu__school:hover {
    color: var(--ds-text);
}

.edu__thesis {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ds-text);
    padding-top: 0.4rem;
    border-top: var(--ds-hair) solid var(--ds-line);
}

.edu__abstract {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
}

.about__void {
    display: none;
}

/* From here the whole section is one four track grid. Dense flow lets the
   education column slot into the rows the experience column left open, so the
   seams line up across both, regardless of DOM order. */
@media (min-width: 768px) {
    .about__grid {
        grid-template-columns: repeat(4, 1fr);
        grid-auto-flow: row dense;
    }

    .about__item--copy {
        grid-column: span 3;
    }

    .about__item--media {
        grid-column: span 1;
    }

    .about__item--stat {
        grid-column: span 1;
    }

    .about__item--exp {
        grid-column: 1 / 3;
    }

    .about__item--edu {
        grid-column: 3 / 5;
    }

    .about__void {
        display: block;
        grid-column: 3 / 5;
    }
}
</style>
