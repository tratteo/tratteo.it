<template>
    <div class="tilt" @pointermove="onMove" @pointerleave="onLeave">
        <motion.div class="tilt__inner" :style="{ rotateX, rotateY, transformPerspective: perspective }">
            <slot />
        </motion.div>
    </div>
</template>

<script lang="ts" setup>
import { motion, useSpring } from "motion-v";

const props = withDefaults(defineProps<{ max?: number; perspective?: number }>(), { max: 9, perspective: 1100 });

const rotateX = useSpring(0, { stiffness: 160, damping: 18 });
const rotateY = useSpring(0, { stiffness: 160, damping: 18 });

function onMove(event: PointerEvent) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * props.max * 2);
    rotateX.set(-py * props.max * 2);
}

function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
}
</script>

<style lang="css" scoped>
.tilt {
    perspective: 1100px;
}

.tilt__inner {
    transform-style: preserve-3d;
    will-change: transform;
    height: 100%;
}
</style>
