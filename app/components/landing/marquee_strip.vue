<template>
    <section class="strip ds-container">
        <div class="strip__viewport ds-bleed">
            <DsMarquee :duration="38" :gap="2.6">
                <span v-for="word in about.marqueeWords" :key="word" class="strip__item">
                    <span class="strip__word">{{ word }}</span>
                    <span class="strip__mark" />
                </span>
            </DsMarquee>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { about } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.strip {
    padding-block: 1.5rem;
    border-top: var(--ds-hair) solid var(--ds-line);
}

/* The words live inside the page frame: the viewport reaches the rails and clips
   there, so nothing crosses the verticals. */
.strip__viewport {
    overflow: hidden;
}

.strip__item {
    display: inline-flex;
    align-items: center;
    gap: 2.6rem;
}

.strip__word {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3.2vw, 2.5rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--ds-text-faint);
}

/* Crosshair separator, same marker the grid intersections use. */
.strip__mark {
    position: relative;
    width: 9px;
    height: 9px;
    flex-shrink: 0;
}

.strip__mark::before,
.strip__mark::after {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    background: var(--ds-text-faint);
}

.strip__mark::before {
    width: 9px;
    height: var(--ds-hair);
}

.strip__mark::after {
    width: var(--ds-hair);
    height: 9px;
}
</style>
