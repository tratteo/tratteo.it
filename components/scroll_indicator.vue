<template>
    <div v-if="mounted">
        <div v-if="breakpoints.greater('md').value" class="v-scroll-indicator" :style="{ '--scale': scale }"></div>
        <div v-else class="h-scroll-indicator" :style="{ '--scale': scale }"></div>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const mounted = useMounted();
const wScroll = useScrollProgress();
const scale = computed(() => wScroll.y.value);
</script>

<style lang="css" scoped>
.v-scroll-indicator {
    z-index: 100;
    height: calc(var(--scale, 0) * 100%);
    @apply fixed right-0 top-0 w-[0.2rem] rounded-b-full bg-primary/100 z-[100000];
}
.h-scroll-indicator {
    z-index: 100;
    width: calc(var(--scale, 0) * 100%);
    @apply fixed left-0 top-0 h-[0.2rem] rounded-r-full bg-primary/100 z-[100000];
}
</style>
