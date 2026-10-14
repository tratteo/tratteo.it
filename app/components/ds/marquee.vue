<template>
    <div
        class="ds-marquee"
        :style="{
            '--ds-marquee-duration': `${duration}s`,
            '--ds-marquee-direction': reverse ? 'reverse' : 'normal',
            '--ds-marquee-gap': `${gap}rem`,
        }"
    >
        <div class="ds-marquee__track">
            <div class="ds-marquee__group"><slot /></div>
            <div class="ds-marquee__group" aria-hidden="true"><slot /></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ duration?: number; reverse?: boolean; gap?: number }>(), { duration: 40, reverse: false, gap: 4 });
</script>

<style lang="css" scoped>
.ds-marquee {
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
}

.ds-marquee__track {
    display: flex;
    width: max-content;
    animation: ds-marquee var(--ds-marquee-duration, 40s) linear infinite;
    animation-direction: var(--ds-marquee-direction, normal);
}

.ds-marquee:hover .ds-marquee__track {
    animation-play-state: paused;
}

.ds-marquee__group {
    display: flex;
    align-items: center;
    gap: var(--ds-marquee-gap, 4rem);
    padding-right: var(--ds-marquee-gap, 4rem);
}

@keyframes ds-marquee {
    to {
        transform: translateX(-50%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .ds-marquee__track {
        animation: none;
    }
}
</style>
