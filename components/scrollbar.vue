<template>
    <div v-if="breakpoints.greater('md').value && mounted" class="scroll-indicator" :style="{ '--scale': scale }"></div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const scroll = useScrollProgress();
const scale = computed(() => scroll.y.value);
const mounted = useMounted();
</script>

<style lang="css" scoped>
.scroll-indicator {
    z-index: 100;
    height: calc(var(--scale, 0) * 100%);
    @apply fixed right-0 top-0 w-[0.4rem] rounded-b-full bg-primary/100 z-[100000];
}
</style>
