<template>
    <header class="flex flex-col gap-5">
        <DsReveal v-if="eyebrow || index">
            <div class="head__meta">
                <span v-if="index" class="head__index mono-micro">{{ index }}</span>
                <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
                <span class="head__rule" aria-hidden="true" />
            </div>
        </DsReveal>
        <DsReveal :delay="0.06">
            <component :is="as" :id="id" class="display-lg" :class="titleClass">
                <span v-for="(line, i) in titleLines" :key="i" class="block">{{ line }}</span>
            </component>
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
        index?: string;
        eyebrow?: string;
        title: string | string[];
        lead?: string;
        /** h1 when the head is the page's own title, h2 when it opens a section. */
        as?: "h1" | "h2";
        titleClass?: string;
        leadClass?: string;
    }>(),
    { as: "h2", titleClass: "max-w-[26ch]", leadClass: "max-w-[54ch]" },
);

const titleLines = computed(() => (Array.isArray(props.title) ? props.title : [props.title]));
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* Telemetry row: index, label, then a hairline that runs to the end of the
   container, which is what turns a heading into a section boundary. */
.head__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.head__index {
    color: var(--ds-text-faint);
}

.head__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}
</style>
