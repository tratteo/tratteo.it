<template>
    <span class="ds-chip" :class="tone === 'live' && 'ds-chip--live'">
        <span v-if="tone === 'live'" class="ds-chip__dot" />
        <u-icon v-else-if="icon" :name="icon" class="size-3.5 opacity-70" />
        <span><slot>{{ label }}</slot></span>
    </span>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ label?: string; icon?: string; tone?: "default" | "live" }>(), { tone: "default" });
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ds-chip {
    @apply inline-flex items-center gap-2 whitespace-nowrap;
    padding: 0.3rem 0.7rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.04em;
    color: var(--ds-text-muted);
}

.ds-chip--live {
    color: var(--ds-text);
}

.ds-chip__dot {
    position: relative;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--ds-live);
}

.ds-chip__dot::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--ds-live);
    animation: chip-pulse 2.4s var(--ds-ease-out) infinite;
}

@keyframes chip-pulse {
    0% {
        transform: scale(1);
        opacity: 0.55;
    }
    100% {
        transform: scale(3.2);
        opacity: 0;
    }
}
</style>
