<template>
    <section class="section ds-container">
        <DsReveal>
            <DsGlassCard radius="xl" padding="lg" class="relative flex flex-col gap-6 overflow-hidden md:flex-row md:items-center md:justify-between md:gap-12">
                <div class="mods__copy">
                    <span class="eyebrow">{{ mods.label }}</span>
                    <h3 class="display-md">{{ mods.title }}</h3>
                    <p class="mods__desc">{{ mods.description }}</p>
                </div>
                <div class="mods__actions">
                    <DsPillButton :to="mods.href" icon="material-symbols:arrow-outward-rounded">Browse the mods</DsPillButton>
                    <a :href="projects.mods.github" target="_blank" rel="noopener noreferrer" class="mods__ghost">
                        <u-icon name="mdi:github" class="size-4" />
                        github.com/trat-mods
                    </a>
                </div>
                <img src="/icons/minecraft_logo.svg" alt="" aria-hidden="true" class="mods__watermark" loading="lazy" />
            </DsGlassCard>
        </DsReveal>
    </section>
</template>

<script lang="ts" setup>
import projects from "~/data/projects.json";
import { mods } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.mods__copy {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
    z-index: 1;
    max-width: 40rem;
}

.mods__desc {
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--ds-text-muted);
}

.mods__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 1;
}

.mods__ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--ds-text-dim);
    transition: color 0.3s var(--ds-ease);
}

.mods__ghost:hover {
    color: var(--ds-text);
}

.mods__watermark {
    position: absolute;
    right: -2rem;
    bottom: -3rem;
    width: 16rem;
    height: 16rem;
    opacity: 0.06;
    pointer-events: none;
}

@media (min-width: 768px) {
    .mods__watermark {
        width: 22rem;
        height: 22rem;
        right: -1rem;
        bottom: -6rem;
    }
}
</style>
