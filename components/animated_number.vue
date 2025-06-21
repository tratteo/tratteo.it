<template>
    <span ref="el">{{ animated }}</span>
</template>

<script lang="ts" setup>
import { TransitionPresets } from "@vueuse/core";
import { useInView } from "motion-v";
const el = ref();
const res = useInView(el);
const props = withDefaults(defineProps<{ value: number; precision?: number }>(), { precision: 1 });
const baseVal = ref(0);
const animated = useTransition(baseVal, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
});
</script>

<style></style>
