<template>
    <div class="relative h-full w-full flex flex-row items-start gap-2 bg-[#1d1d1f] text-white">
        <div class="w-[50%] h-full">
            <div class="p-12 flex flex-col items-stretch h-full justify-start gap-10">
                <div class="flex-1 flex flex-col gap-4">
                    <p class="text-5xl font-bold">{{ title }}</p>
                    <p class="text-2xl opacity-75">{{ description }}</p>
                    <div v-if="tags" class="flex items-center flex-row gap-4 w-full">
                        <div v-for="t in tags" class="bg-[#fe9a00] border rounded-md px-2 py-1 text-black font-semibold">{{ t }}</div>
                    </div>
                    <div class="mt-auto flex flex-col gap-8 w-full">
                        <div v-if="author" class="flex flex-row items-center justify-start gap-4">
                            <img class="rounded-full" :src="author.image" width="80" height="80" alt="" />
                            <p class="font-bold text-2xl">{{ author.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[50%] flex flex-col items-center justify-center h-full">
            <div class="flex h-[80%] w-full border-2 border-white/20 rounded-l-1rem overflow-hidden relative">
                <img :src="thumbnail" class="w-full h-full object-cover rounded-l-1rem" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title?: string;
    thumbnail?: string | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
    author?:
        | {
              image: string;
              name: string;
          }
        | undefined;
}>();
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
</style>
