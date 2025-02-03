<template>
    <Transition name="join" mode="out-in">
        <button v-if="y > 0" @click="scrollTop" class="btn btn-sm lg:btn-md btn-primary fixed right-8 bottom-8 lg:right-16 lg:bottom-16">
            <icon name="material-symbols:keyboard-arrow-up-rounded"></icon>
        </button>
    </Transition>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
const bp = useBreakpoints(breakpointsTailwind);
const { y } = useScrollProgress();
</script>

<style></style>
