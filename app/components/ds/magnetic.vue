<template>
    <motion.div
        ref="root"
        class="inline-block will-change-transform"
        :style="{ x, y }"
        @pointermove="onMove"
        @pointerleave="onLeave"
    >
        <slot />
    </motion.div>
</template>

<script lang="ts" setup>
import { motion, useSpring } from "motion-v";

const props = withDefaults(defineProps<{ strength?: number; max?: number }>(), { strength: 0.3, max: 22 });

const root = useTemplateRef("root");
const x = useSpring(0, { stiffness: 260, damping: 22, mass: 0.6 });
const y = useSpring(0, { stiffness: 260, damping: 22, mass: 0.6 });

function clamp(v: number) {
    return Math.max(-props.max, Math.min(props.max, v));
}

function onMove(event: PointerEvent) {
    const el = (root.value as { $el?: HTMLElement } | null)?.$el;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(clamp(dx * props.strength));
    y.set(clamp(dy * props.strength));
}

function onLeave() {
    x.set(0);
    y.set(0);
}
</script>
