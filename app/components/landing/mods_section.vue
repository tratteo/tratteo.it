<template>
    <section class="mods ds-container">
        <div class="mods__band ds-matrix ds-bleed">
            <div class="mods__cell mods__copy">
                <img src="/icons/minecraft_logo.svg" alt="" aria-hidden="true" class="mods__watermark" loading="lazy" />
                <div class="mods__copy-inner">
                    <div class="mods__label">
                        <span class="mono-micro mods__index">05</span>
                        <span class="eyebrow">{{ mods.label }}</span>
                    </div>
                    <h3 class="display-md mods__title">{{ mods.title }}</h3>
                    <p class="mods__desc">{{ mods.description }}</p>
                </div>
            </div>

            <div class="mods__cell mods__stat">
                <span class="mods__stat-value">{{ mods.downloads }}</span>
                <span class="mono-micro mods__stat-label">{{ mods.downloadLabel }}</span>
                <DsBadge tone="ok" class="mods__stat-badge">{{ mods.modCount }} mods live</DsBadge>
            </div>

            <div class="mods__cell mods__actions">
                <DsButton :to="mods.href" icon="material-symbols:arrow-outward-rounded">Browse the mods</DsButton>
                <a :href="projects.mods.github" target="_blank" rel="noopener noreferrer" class="mods__ghost mono-micro">
                    <u-icon name="mdi:github" class="size-3.5" />
                    github.com/trat-mods
                </a>
            </div>
        </div>

        <!-- Breaks the frame on purpose: it is what gives this band depth. -->
        <img src="/icons/creeper.webp" alt="" aria-hidden="true" class="mods__creeper" width="312" height="536" loading="lazy" />
    </section>
</template>

<script lang="ts" setup>
import projects from "~/data/projects.json";
import { mods } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.mods {
    position: relative;
}

.mods__band {
    grid-template-columns: 1fr;
}

.mods__cell {
    padding: calc(var(--ds-pad) * 1.2) var(--ds-pad);
}

/* ---- copy ---- */
.mods__copy {
    position: relative;
    overflow: hidden;
}

.mods__copy-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    max-width: 38rem;
}

.mods__watermark {
    position: absolute;
    top: 0.5rem;
    right: -1rem;
    width: 10rem;
    height: auto;
    opacity: 0.14;
    pointer-events: none;
}

.mods__label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.mods__index {
    color: var(--ds-text-faint);
}

.mods__title {
    margin-top: 0.2rem;
}

.mods__desc {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--ds-text-muted);
}

/* ---- downloads ---- */
.mods__stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    justify-content: center;
    background: var(--ds-surface-1);
}

.mods__stat-value {
    font-family: var(--font-heading);
    font-size: clamp(1.9rem, 3.4vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    color: var(--ds-text);
}

.mods__stat-label {
    color: var(--ds-text-dim);
}

.mods__stat-badge {
    margin-top: 0.5rem;
    align-self: flex-start;
}

/* ---- actions ---- */
.mods__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem;
    justify-content: center;
}

.mods__ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--ds-text-dim);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.mods__ghost:hover {
    color: var(--ds-text);
}

/* ---- breakout ---- */
.mods__creeper {
    position: absolute;
    right: 0.5rem;
    bottom: calc(var(--ds-pad) * -1);
    height: 9rem;
    width: auto;
    z-index: 2;
    pointer-events: none;
}

@media (min-width: 768px) {
    .mods__band {
        grid-template-columns: minmax(0, 1.7fr) minmax(0, 0.8fr) minmax(0, 1fr);
    }
}

/* The creeper steps out past the page frame once the frame exists. */
@media (min-width: 1280px) {
    .mods__creeper {
        right: calc(var(--ds-pad) * -1.6);
        bottom: calc(var(--ds-pad) * -1.4);
        height: 11rem;
    }
}
</style>
