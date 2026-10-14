<template>
    <section id="about" class="section ds-container">
        <DsSectionHead :eyebrow="about.eyebrow" :title="about.title" title-class="max-w-[22ch]" />

        <div class="about__intro">
            <div class="about__copy">
                <DsReveal v-for="(paragraph, i) in about.paragraphs" :key="i" :delay="i * 0.08">
                    <p class="lead about__paragraph">{{ paragraph }}</p>
                </DsReveal>
            </div>

            <DsReveal :delay="0.12" class="about__media">
                <DsGlassCard radius="xl" padding="sm">
                    <img src="/trat.jpg" alt="Portrait of Matteo Beltrame" width="1024" height="1024" class="about__portrait" loading="lazy" />
                </DsGlassCard>
            </DsReveal>
        </div>

        <div class="about__stats">
            <div v-for="stat in stats" :key="stat.label" class="about__stat">
                <span class="about__stat-value">{{ stat.value }}</span>
                <span class="about__stat-label">{{ stat.label }}</span>
            </div>
        </div>

        <div class="about__details">
            <div class="about__col">
                <span class="eyebrow">Experience</span>
                <ul class="timeline">
                    <li v-for="entry in experience" :key="entry.role" class="timeline__item">
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
                                    <u-icon v-if="entry.orgHref" name="material-symbols:arrow-outward-rounded" class="size-3.5 opacity-50" />
                                </component>
                            </div>
                            <div class="timeline__meta">
                                <span class="timeline__kind">{{ entry.kind }}</span>
                                <span class="timeline__period">{{ entry.period }}</span>
                            </div>
                        </div>
                        <p class="timeline__desc">{{ entry.description }}</p>
                    </li>
                </ul>
            </div>

            <div class="about__col">
                <span class="eyebrow">Education</span>
                <div class="edu">
                    <DsGlassCard v-for="item in education" :key="item.title" padding="md" class="flex flex-col gap-2.5">
                        <div class="edu__head">
                            <p class="edu__title">{{ item.title }}</p>
                            <span class="edu__grade">{{ item.grade }}</span>
                        </div>
                        <a :href="item.schoolHref" target="_blank" rel="noopener noreferrer" class="edu__school">
                            {{ item.school }}
                            <u-icon name="material-symbols:arrow-outward-rounded" class="size-3.5 opacity-50" />
                        </a>
                        <p class="edu__thesis">{{ item.thesis }}</p>
                        <p class="edu__abstract">{{ item.abstract }}</p>
                    </DsGlassCard>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { about, education, experience, stats } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.about__intro {
    margin-top: 3rem;
    display: grid;
    gap: 2.5rem;
    align-items: start;
}

.about__copy {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.about__paragraph {
    max-width: 56ch;
}

.about__media {
    max-width: 24rem;
}

.about__portrait {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: calc(var(--ds-r-xl) - 0.375rem);
    filter: grayscale(0.35) contrast(1.02);
    transition: filter 0.6s var(--ds-ease);
}

.about__media:hover .about__portrait {
    filter: grayscale(0) contrast(1.02);
}

/* stats */
.about__stats {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid var(--ds-hairline);
}

.about__stat {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1.5rem 1rem;
    border-right: 1px solid var(--ds-hairline);
    border-bottom: 1px solid var(--ds-hairline);
}

.about__stat:nth-child(2n) {
    border-right: none;
}

.about__stat-value {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    color: var(--ds-text);
}

.about__stat-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: var(--ds-text-dim);
}

/* details */
.about__details {
    margin-top: 4rem;
    display: grid;
    gap: 3.5rem;
}

.about__col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* timeline */
.timeline {
    display: flex;
    flex-direction: column;
}

.timeline__item {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 1.35rem 0;
    border-top: 1px solid var(--ds-hairline);
    transition: padding-left 0.4s var(--ds-ease);
}

.timeline__item:last-child {
    border-bottom: 1px solid var(--ds-hairline);
}

.timeline__item:hover {
    padding-left: 0.6rem;
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
    gap: 0.15rem;
}

.timeline__role {
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--ds-text);
}

.timeline__org {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: var(--ds-text-muted);
    width: fit-content;
    transition: color 0.3s var(--ds-ease);
}

a.timeline__org:hover {
    color: var(--ds-text);
}

.timeline__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
    flex-shrink: 0;
}

.timeline__kind,
.timeline__period {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ds-text-dim);
}

.timeline__desc {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
    max-width: 50ch;
}

/* education */
.edu {
    display: grid;
    gap: 1rem;
}

.edu__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
}

.edu__title {
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--ds-text);
}

.edu__grade {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    white-space: nowrap;
    color: var(--ds-text);
    padding: 0.2rem 0.5rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-hairline-strong);
}

.edu__school {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: var(--ds-text-muted);
    width: fit-content;
}

.edu__school:hover {
    color: var(--ds-text);
}

.edu__thesis {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--ds-text);
    letter-spacing: -0.01em;
}

.edu__abstract {
    font-size: 0.82rem;
    line-height: 1.6;
    color: var(--ds-text-dim);
}

@media (min-width: 768px) {
    .about__stats {
        grid-template-columns: repeat(4, 1fr);
    }
    .about__stat:nth-child(2n) {
        border-right: 1px solid var(--ds-hairline);
    }
    .about__stat:nth-child(4n) {
        border-right: none;
    }
    .about__details {
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
    }
}

@media (min-width: 1024px) {
    .about__intro {
        grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr);
        gap: 4rem;
    }
    .about__media {
        max-width: none;
    }
}
</style>
