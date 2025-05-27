<template>
    <motion.div
        :initial="{ opacity: 0, marginTop: marginTop, marginLeft: marginLeft, marginRight: marginRight }"
        :whileInView="{ opacity: 1, marginTop: 0, marginLeft: 0, marginRight: 0 }"
        :transition="{ duration: 0.6, type: 'tween', ease: 'easeOut', staggerChildren: 0.2 }"
        :inViewOptions="{ once: true, margin: '0px 0px -40% 0px' }"
        class="w-full"
    >
        <slot></slot>
    </motion.div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";
const props = withDefaults(defineProps<{ marginTop?: number; marginLeft?: number; marginRight?: number }>(), { marginTop: 24, marginLeft: 0, marginRight: 0 });
</script>

<style></style>
