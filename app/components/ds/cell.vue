<template>
    <component
        :is="as"
        v-bind="$attrs"
        class="ds-cell"
        :class="[interactive && 'ds-cell--interactive', padding !== 'none' && `ds-cell--${padding}`]"
    >
        <span v-if="index" class="ds-cell__index mono-micro">{{ index }}</span>
        <slot />
    </component>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

/* A structural compartment: zero radius, one hairline, no shadow. Inside a
   DsMatrix the cell drops its own border so the matrix seam is the only line. */
withDefaults(
    defineProps<{
        as?: string;
        index?: string;
        padding?: "none" | "sm" | "md" | "lg";
        interactive?: boolean;
    }>(),
    { as: "div", padding: "md", interactive: false },
);
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ds-cell {
    position: relative;
}

/* The index sits in the same corner on every cell, so a matrix reads as a
   numbered coordinate plane rather than a pile of cards. */
.ds-cell__index {
    position: absolute;
    top: 0.7rem;
    right: 0.75rem;
    color: var(--ds-text-faint);
    pointer-events: none;
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.ds-cell--interactive:hover .ds-cell__index {
    color: var(--ds-text);
}
</style>
