<template>
    <section id="interests" class="section ds-container">
        <DsSectionHead
            eyebrow="Off screen"
            :title="['Half of me', 'happens outside.']"
            lead="The best debugging sessions happen at 30 metres down, halfway up a wall, or an hour into a climb. Sports keep the head clear for the problems that actually need it."
        />

        <div class="interests">
            <DsReveal v-for="(interest, i) in interests" :key="interest.name" :delay="(i % 3) * 0.06">
                <figure class="interest">
                    <div class="interest__media">
                        <img :src="interest.image" :alt="interest.name" class="interest__img" loading="lazy" />
                    </div>
                    <figcaption class="interest__cap">
                        <span class="interest__name">{{ interest.name }}</span>
                        <span class="interest__note">{{ interest.note }}</span>
                    </figcaption>
                </figure>
            </DsReveal>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { interests } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.interests {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.interest {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.interest__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: var(--ds-r-md);
    border: 1px solid var(--ds-hairline);
    background: var(--ds-bg-deep);
}

.interest__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.75);
    transform: scale(1.02);
    transition:
        transform 0.9s var(--ds-ease),
        filter 0.6s var(--ds-ease);
}

.interest:hover .interest__img {
    filter: grayscale(0);
    transform: scale(1.07);
}

.interest__cap {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.interest__name {
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ds-text);
}

.interest__note {
    font-size: 0.78rem;
    line-height: 1.5;
    color: var(--ds-text-dim);
}

@media (min-width: 768px) {
    .interests {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.15rem;
    }
}

@media (min-width: 1024px) {
    .interests {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>
