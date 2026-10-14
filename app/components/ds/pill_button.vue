<template>
    <motion.div :while-hover="{ y: -3 }" :while-tap="{ y: 0 }" :transition="{ type: 'spring', stiffness: 400, damping: 26 }" class="inline-block">
        <component
            :is="component"
            :href="to"
            :target="external ? '_blank' : undefined"
            :rel="external ? 'noopener noreferrer' : undefined"
            class="ds-pill"
            :class="`ds-pill--${variant}`"
        >
            <span class="ds-pill__label"><slot /></span>
            <span v-if="icon" class="ds-pill__icon">
                <u-icon :name="icon" class="size-4 ds-pill__glyph" />
            </span>
        </component>
    </motion.div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const props = withDefaults(
    defineProps<{
        to: string;
        icon?: string;
        variant?: "solid" | "ghost" | "glass";
        external?: boolean;
    }>(),
    { variant: "solid", external: false },
);

const component = computed(() => {
    return props.to.startsWith("/") && !props.to.startsWith("//") ? resolveComponent("NuxtLink") : "a";
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ds-pill {
    @apply inline-flex items-center gap-3 select-none cursor-pointer;
    padding: 0.4rem 0.4rem 0.4rem 1.4rem;
    border-radius: var(--ds-r-full);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    transition:
        background-color 0.4s var(--ds-ease),
        color 0.4s var(--ds-ease),
        border-color 0.4s var(--ds-ease);
}

.ds-pill__icon {
    @apply flex size-9 shrink-0 items-center justify-center;
    border-radius: var(--ds-r-full);
    transition:
        transform 0.45s var(--ds-ease),
        background-color 0.4s var(--ds-ease);
}

.ds-pill__glyph {
    transition: transform 0.45s var(--ds-ease);
}

.ds-pill:hover .ds-pill__glyph {
    transform: translate(2px, -2px);
}

.ds-pill:hover .ds-pill__icon {
    transform: scale(1.06);
}

/* solid: pure contrast inversion, white on dark, black on light */
.ds-pill--solid {
    background: var(--ds-ink);
    color: var(--ds-bg);
}
.ds-pill--solid .ds-pill__icon {
    background: color-mix(in srgb, var(--ds-bg) 16%, transparent);
    color: var(--ds-bg);
}

.ds-pill--ghost {
    background: transparent;
    color: var(--ds-text);
    border: 1px solid var(--ds-hairline-strong);
}
.ds-pill--ghost .ds-pill__icon {
    background: color-mix(in srgb, var(--ds-text) 8%, transparent);
}
.ds-pill--ghost:hover {
    background: var(--ds-glass);
}

.ds-pill--glass {
    background: var(--ds-glass);
    color: var(--ds-text);
    border: 1px solid var(--ds-glass-border);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow: inset 0 1px 0 0 var(--ds-glass-highlight);
}
.ds-pill--glass .ds-pill__icon {
    background: color-mix(in srgb, var(--ds-text) 8%, transparent);
}
</style>
