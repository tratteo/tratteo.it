<template>
    <div class="flex flex-col lg:gap-12 gap-4 items-center lg:items-start w-full" :class="!reverse ? 'lg:flex-row' : 'lg:flex-row-reverse'">
        <div class="flex-1 flex flex-col items-center max-w-2xl gap-4 md:min-w-[24rem]" :class="!reverse ? 'lg:items-start lg:text-start' : 'lg:items-end lg:text-end'">
            <div class="flex flex-col gap-2">
                <div class="text-primary font-medium">
                    <slot v-if="$slots.subtitle" name="subtitle"></slot>
                    <p v-else>{{ subtitle }}</p>
                </div>
                <div class="typ-subtitle">
                    <slot v-if="$slots.title" name="title"></slot>
                    <h3 v-else>{{ title }}</h3>
                </div>
                <div class="flex flex-col gap-4 items-center" :class="!reverse ? 'lg:items-start' : 'lg:items-end'">
                    <slot v-if="$slots.description" name="description"></slot>
                    <p v-else>
                        {{ description }}
                    </p>
                </div>
            </div>
        </div>
        <div class="relative flex-1 max-w-3xl w-full flex justify-center">
            <slot name="side"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ reverse?: boolean; title?: string; subtitle?: string; description?: string }>();
</script>

<style></style>
