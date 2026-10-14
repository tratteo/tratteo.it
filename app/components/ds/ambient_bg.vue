<template>
    <div class="ambient" aria-hidden="true">
        <div class="ds-grid-bg absolute inset-0" />
        <div class="ds-orb orb orb--a" />
        <div class="ds-orb orb orb--b" />
        <div class="ds-orb orb orb--c" />
    </div>
</template>

<script lang="ts" setup>
/* Pure CSS ambient field: cheaper than JS, always 60fps, honours reduced motion. */
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ambient {
    position: fixed;
    inset: 0;
    z-index: -10;
    overflow: hidden;
    pointer-events: none;
    background:
        radial-gradient(120% 70% at 50% -10%, var(--ds-glass-faint), transparent 60%),
        var(--ds-bg);
}

.orb {
    transform: translate3d(0, 0, 0);
    animation: drift 26s var(--ds-ease-in-out) infinite;
}

.orb--a {
    top: -14%;
    left: -6%;
    width: 46vw;
    height: 46vw;
    max-width: 640px;
    max-height: 640px;
    background: var(--ds-orb-1);
}

.orb--b {
    top: 24%;
    right: -12%;
    width: 42vw;
    height: 42vw;
    max-width: 560px;
    max-height: 560px;
    background: var(--ds-orb-2);
    animation-delay: -9s;
    animation-duration: 32s;
}

.orb--c {
    bottom: -18%;
    left: 28%;
    width: 38vw;
    height: 38vw;
    max-width: 520px;
    max-height: 520px;
    background: var(--ds-orb-3);
    animation-delay: -16s;
    animation-duration: 38s;
}

@keyframes drift {
    0%,
    100% {
        transform: translate3d(0, 0, 0) scale(1);
    }
    33% {
        transform: translate3d(6%, 4%, 0) scale(1.12);
    }
    66% {
        transform: translate3d(-5%, 6%, 0) scale(0.94);
    }
}

@media (prefers-reduced-motion: reduce) {
    .orb {
        animation: none;
    }
}
</style>
