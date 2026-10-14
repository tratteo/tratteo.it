<template>
    <div class="ds-panel" :class="[radiusClass, interactive && 'ds-panel--interactive']">
        <component :is="as" v-bind="$attrs" class="ds-glass ds-card" :class="[radiusClass, paddingClass]">
            <slot />
        </component>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        as?: string;
        padding?: "none" | "sm" | "md" | "lg";
        radius?: "md" | "lg" | "xl";
        interactive?: boolean;
    }>(),
    { as: "div", padding: "md", radius: "lg", interactive: false },
);

const paddingMap = { none: "", sm: "p-4", md: "p-5 sm:p-6", lg: "p-6 sm:p-8 lg:p-10" };
/* Shell and core share one radius so the bezel never reads as two mismatched corners. */
const radiusMap = { md: "rounded-(--ds-r-md)", lg: "rounded-(--ds-r-lg)", xl: "rounded-(--ds-r-xl)" };

const paddingClass = computed(() => paddingMap[props.padding]);
const radiusClass = computed(() => radiusMap[props.radius]);
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ds-panel {
    position: relative;
    height: 100%;
    transition:
        border-color 0.4s var(--ds-ease),
        transform 0.5s var(--ds-ease),
        box-shadow 0.5s var(--ds-ease);
}

.ds-card {
    position: relative;
    height: 100%;
    overflow: hidden;
    transition: background-color 0.4s var(--ds-ease);
}

/* A hairline of light sweeping the top edge on hover. */
.ds-panel--interactive > .ds-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(70% 120% at 50% 0%, var(--ds-glass-highlight), transparent 62%);
    opacity: 0;
    transition: opacity 0.5s var(--ds-ease);
    pointer-events: none;
}

.ds-panel--interactive {
    cursor: pointer;
}

.ds-panel--interactive:hover {
    border-color: var(--ds-hairline-strong);
    transform: translateY(-3px);
    box-shadow: var(--ds-shadow-lift);
}

.ds-panel--interactive:hover > .ds-card::before {
    opacity: 0.45;
}
</style>
