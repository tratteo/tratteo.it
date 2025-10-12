<template>
    <motion.div
        initial="hidden"
        while-in-view="show"
        :variants="containerVariants"
        :transition="{ duration: 0.6, type: 'spring', bounce: 0.25, staggerChildren: staggerChildren, delayChildren: delayChildren }"
        :in-view-options="{ once: true, amount: 0.35 }"
        class="w-full"
    >
        <slot></slot>
    </motion.div>
</template>

<script lang="ts" setup>
import { motion, type VariantType } from "motion-v";

const props = withDefaults(defineProps<{ marginTop?: number; staggerChildren?: number; delayChildren?: number }>(), { marginTop: 64, staggerChildren: 0.1, delayChildren: 0.3 });

const containerVariants: { [k: string]: VariantType } = {
    hidden: { opacity: 0, marginTop: props.marginTop },
    show: { opacity: 1, marginTop: 0, marginLeft: 0, marginRight: 0 },
};
</script>

<style></style>
