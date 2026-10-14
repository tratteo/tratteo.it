<template>
    <header class="flex flex-col gap-5">
        <DsReveal v-if="eyebrow">
            <span class="eyebrow">{{ eyebrow }}</span>
        </DsReveal>
        <DsReveal :delay="0.06">
            <h2 :id="id" class="display-lg" :class="titleClass">
                <span v-for="(line, i) in titleLines" :key="i" class="block">{{ line }}</span>
            </h2>
        </DsReveal>
        <DsReveal v-if="lead" :delay="0.12">
            <p class="lead" :class="leadClass">{{ lead }}</p>
        </DsReveal>
    </header>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        id?: string;
        eyebrow?: string;
        title: string | string[];
        lead?: string;
        align?: "start" | "center";
        titleClass?: string;
        leadClass?: string;
    }>(),
    { align: "start", titleClass: "max-w-[18ch]", leadClass: "max-w-[54ch]" },
);

const titleLines = computed(() => (Array.isArray(props.title) ? props.title : [props.title]));
</script>
