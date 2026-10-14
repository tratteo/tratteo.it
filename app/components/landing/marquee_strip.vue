<template>
    <section class="strip" aria-hidden="true">
        <DsMarquee :duration="38" :gap="2.6">
            <span v-for="word in about.marqueeWords" :key="word" class="strip__item">
                <span class="strip__word">{{ word }}</span>
                <span class="strip__diamond" />
            </span>
        </DsMarquee>
    </section>
</template>

<script lang="ts" setup>
import { about } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.strip {
    padding-block: 1.5rem;
    border-block: 1px solid var(--ds-hairline);
}

.strip__item {
    display: inline-flex;
    align-items: center;
    gap: 2.6rem;
}

.strip__word {
    font-size: clamp(1.5rem, 3.2vw, 2.5rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--ds-text-faint);
}

.strip__diamond {
    width: 0.4rem;
    height: 0.4rem;
    rotate: 45deg;
    background: var(--ds-text-faint);
}
</style>
