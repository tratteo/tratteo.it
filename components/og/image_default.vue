<template>
    <div class="relative h-full w-full flex flex-col items-center justify-center gap-4 bg-[#0f1625]">
        <!-- <img src="/thumbnails/minecraft.jpeg" class="absolute w-full h-full top-0 bottom-0 left-0 right-0" /> -->
        <div class="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-[#0f1625]/75"></div>
        <div class="flex flex-row items-center gap-12 text-white">
            <!-- <img src="/favicon.webp" width="150" height="150" alt="" /> -->
            <h1 class="text-7xl font-bold text-left m-0">Matteo Beltrame</h1>
        </div>
        <p v-if="subtitle" class="text-white text-4xl font-bold">{{ subtitle }}</p>
        <img v-if="avatarUrl" class="rounded-full" :src="avatarUrl" width="150" height="150" alt="" />
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        subtitle?: string;
        avatarUrl?: string | undefined;
    }>(),
    { avatarUrl: undefined }
);
</script>
<style lang="css" scoped></style>
