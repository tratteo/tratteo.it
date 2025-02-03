<template>
    <a class="card group relative card-compact bg-base-300 w-full shadow-lg ease-out border border-base-content/20 cursor-pointer pt-6 unstyled-a" :href="to" target="_blank">
        <div class="absolute flex flex-row items-center justify-between left-4 right-4 top-1">
            <div class="flex gap-2 items-center">
                <icon name="mynaui:click-solid" class="size-5 text-success"></icon>
                <p class="info">Click to explore</p>
            </div>
            <icon
                name="material-symbols:arrow-outward-rounded"
                class="size-8 top-4 right-4 opacity-75 group-hover:translate-x-[8px] group-hover:translate-y-[-8px] transition-all duration-300 ease-out"
            ></icon>
        </div>
        <div class="card-body text-base">
            <slot v-if="slots.title" name="title"></slot>
            <slot name="body"></slot>
        </div>
    </a>
</template>

<script lang="ts" setup>
const slots = useSlots();
defineProps<{ to: string }>();
</script>

<style lang="css" scoped>
.card {
    @apply text-base my-8 !important;
    .info {
        @apply text-xs opacity-75 top-4 left-4 !important;
    }
}
</style>
