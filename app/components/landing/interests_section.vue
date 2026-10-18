<template>
    <section id="interests" class="interests ds-container">
        <div class="interests__grid ds-matrix ds-bleed">
            <DsSectionHead
                class="ds-head-row"
                index="04"
                eyebrow="Off screen"
                :title="['Half of me', 'happens outside.']"
                lead="The best debugging sessions happen at 30 metres down, halfway up a wall, or an hour into a climb. Sports keep the head clear for the problems that actually need it."
            />

            <div class="interests__term">
                <DsCmdWidget :lines="shellLines" prompt="whoami" :label="`Shell ready · ${interests.length} interests indexed`" />
            </div>
            <figure v-for="(interest, i) in interests" :key="interest.name" class="interest">
                <div class="interest__media">
                    <img :src="interest.image" :alt="interest.name" class="interest__img" loading="lazy" />
                </div>
                <figcaption class="interest__cap">
                    <span class="mono-micro interest__index">[{{ String(i + 1).padStart(2, "0") }}]</span>
                    <DsReveal :delay="(i % 5) * 0.05">
                        <div class="interest__text">
                            <span class="interest__name">{{ interest.name }}</span>
                            <span class="interest__note">{{ interest.note }}</span>
                        </div>
                    </DsReveal>
                </figcaption>
            </figure>

            <!-- Keeps the mesh closed where the last row is not full. -->
            <span class="ds-cell ds-cell--void interests__void" aria-hidden="true" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { interests } from "~/data/landing";

/* The shell session reads the same source as the tiles, so the two can never
   drift apart. */
const shellLines = interests.map((interest) => `${interest.name}: ${interest.note}`);
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.interests__grid {
    grid-template-columns: 1fr;
}

/* The console is its own band across the section. */
.interests__term {
    grid-column: 1 / -1;
}

.interest {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.interest__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: var(--ds-surface-1);
    border-bottom: var(--ds-hair) solid var(--ds-line);
}

.interest__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.8);
    transform: scale(1.01);
    transition:
        transform 0.7s var(--ds-ease),
        filter 0.5s var(--ds-ease);
}

.interest:hover .interest__img {
    filter: grayscale(0);
    transform: scale(1.04);
}

.interest__cap {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.85rem var(--ds-pad) 1rem;
    flex: 1;
}

.interest__index {
    color: var(--ds-text-faint);
}

.interest__text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.interest__name {
    font-family: var(--font-heading);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.015em;
    color: var(--ds-text);
}

.interest__note {
    margin-top: 0.15rem;
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--ds-text-dim);
}

.interests__void {
    display: none;
}

@media (min-width: 640px) {
    .interests__grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .interests__void {
        display: block;
    }
}

@media (min-width: 1024px) {
    .interests__grid {
        grid-template-columns: repeat(5, 1fr);
    }

    /* Five tiles fill the row exactly, so the void would add an empty one. */
    .interests__void {
        display: none;
    }
}
</style>
