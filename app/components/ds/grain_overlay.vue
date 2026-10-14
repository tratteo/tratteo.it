<template>
    <div class="ds-grain" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter :id="filterId">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" :filter="`url(#${filterId})`" />
        </svg>
    </div>
</template>

<script lang="ts" setup>
const filterId = useId();
</script>

<style lang="css" scoped>
/* A fixed, pointer-events-none film of noise. Never attached to scrolling content. */
.ds-grain {
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    opacity: calc(var(--ds-grain-opacity) * 0.07);
    mix-blend-mode: soft-light;
}

.dark .ds-grain {
    mix-blend-mode: overlay;
}
</style>
