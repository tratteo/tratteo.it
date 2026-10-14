<template>
    <component
        :is="motion[tag]"
        class="will-change-transform"
        :initial="reduced ? undefined : { opacity: 0, y: distance, filter: 'blur(8px)' }"
        :while-in-view="reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: duration, ease: [0.16, 1, 0.3, 1], delay: delay }"
        :in-view-options="{ once: once, amount: amount }"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const props = withDefaults(
    defineProps<{
        as?: keyof HTMLElementTagNameMap;
        delay?: number;
        duration?: number;
        distance?: number;
        amount?: number;
        once?: boolean;
    }>(),
    { as: "div", delay: 0, duration: 0.8, distance: 26, amount: 0.2, once: true },
);

const prefersReduced = usePreferredReducedMotion();
const reduced = computed(() => prefersReduced.value === "reduce");
const tag = computed(() => props.as);
</script>
