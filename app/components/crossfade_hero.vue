<template>
    <div class="flex items-center gap-4">
        <div class="relative overflow-hidden rounded-full bg-transparent shrink-0" :class="sizeMap">
            <animate-presence mode="popLayout">
                <motion.img
                    :key="current.index"
                    :src="current.item?.src"
                    :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }"
                    :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.8, ease: 'easeInOut' }"
                    class="absolute inset-0 w-full h-full object-cover"
                />
            </animate-presence>
        </div>
        <div v-if="current.item" class="gap-1 w-full md:min-w-[20rem]">
            <div class="flex flex-row items-center gap-0">
                <p>{{ prefix }}&nbsp;</p>
                <typewriter :text="current.item?.name" class="font-bold" :typing-delay="20"> </typewriter>
            </div>

            <div>
                <client-only>
                    <time class="text-xs text-dimmed font-normal">{{ dayjs(current.date).format("HH:mm:ss") }}</time>
                </client-only>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "@nuxt/ui";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "motion-v";

export interface CrossFadeItem {
    name: string;
    src: string;
}
const props = withDefaults(defineProps<{ items: CrossFadeItem[]; size?: ButtonProps["size"]; prefix?: string; cycleIntervalMs?: [number, number] }>(), {
    size: "md",
    prefix: "But usually I'm",
    cycleIntervalMs: () => [3000, 5000],
});
const current = ref<{ item: CrossFadeItem | undefined; date: Date; index: number }>({ item: props.items?.at(0), date: new Date(), index: 0 });

onMounted(update);

const sizeMap = computed(() => {
    switch (props.size) {
        case "xs":
            return "size-10";
        case "sm":
            return "size-12";
        case "md":
            return "size-14";
        case "lg":
            return "size-16";
        case "xl":
            return "size-18";
    }
});

function update() {
    const index = (current.value.index + 1) % props.items.length;
    current.value = { item: props.items.at(index), date: new Date(), index: index };
    setTimeout(update, remap(Math.random(), [0, 1], props.cycleIntervalMs));
}
</script>

<style></style>
