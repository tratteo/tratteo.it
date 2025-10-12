<template>
    <div class="wrapper">
        <icon class="opacity-100" :name="name" :mode="mode"> </icon>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ name: string; mode?: "css" | "svg" }>();
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
.wrapper {
    @apply shrink-0 rounded-lg flex flex-col p-2 items-center  justify-center relative transition-all duration-200 ease-out;
}
</style>
