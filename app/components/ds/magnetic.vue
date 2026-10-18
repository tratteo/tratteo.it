<template>
    <div ref="hit" class="ds-magnetic" @pointerenter="onEnter" @pointermove="onMove" @pointerleave="onLeave">
        <motion.div class="ds-magnetic__inner" :style="{ x, y }">
            <slot />
        </motion.div>
    </div>
</template>

<script lang="ts" setup>
import { motion, useSpring } from "motion-v";

const props = withDefaults(defineProps<{ strength?: number; max?: number }>(), { strength: 0.3, max: 22 });

/* The hit area is a separate, static box and the content moves inside it. If the
   measured element were the one being translated, every move would shift its own
   centre, and the pointer would drift out of the element and fire leave/enter
   over and over. A fixed hit box removes both problems. */
const hit = useTemplateRef<HTMLElement>("hit");
const x = useSpring(0, { stiffness: 260, damping: 22, mass: 0.6 });
const y = useSpring(0, { stiffness: 260, damping: 22, mass: 0.6 });

let centre: { x: number; y: number } | null = null;

function clamp(value: number) {
    return Math.max(-props.max, Math.min(props.max, value));
}

function measure() {
    const el = hit.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    centre = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function onEnter() {
    measure();
}

function onMove(event: PointerEvent) {
    if (!centre) measure();
    if (!centre) return;
    x.set(clamp((event.clientX - centre.x) * props.strength));
    y.set(clamp((event.clientY - centre.y) * props.strength));
}

function onLeave() {
    centre = null;
    x.set(0);
    y.set(0);
}
</script>

<style lang="css" scoped>
.ds-magnetic {
    display: inline-block;
    /* Size to the content: a flex or grid parent would otherwise stretch the hit
       area to the full column, and the pull would read as if the content were
       centred instead of where it actually sits. */
    width: fit-content;
    max-width: 100%;
}

.ds-magnetic__inner {
    will-change: transform;
}
</style>
