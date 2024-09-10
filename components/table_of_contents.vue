<template>
    <nav>
        <h2 class="mb-2">Table of Content</h2>
        <ul v-for="t in headers" class="flex flex-col items-start gap-2">
            <li class="ml-0">
                <a :href="'#' + t.id">
                    <component :is="t.tag">{{ t.text }}</component>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import type { MarkdownRoot } from "@nuxt/content";

interface TableOfContentEntry {
    id: string;
    text: string;
    tag: string;
}

const props = defineProps<{ document: MarkdownRoot }>();

const headers = computed<TableOfContentEntry[]>(() =>
    props.document.children
        .filter((c) => c.children && c.children.length > 0 && ["h1", "h2", "h3"].includes(c.tag ?? ""))
        .map((c) => <TableOfContentEntry>{ id: c.props?.id, text: c.children![0].value, tag: c.tag })
);
onMounted(() => console.log(headers.value));
</script>

<style lang="css" scoped>
li {
    h1 {
        @apply text-base link-hover link-primary my-0;
    }
    h2 {
        @apply text-base ml-10 my-0 link-hover link-secondary;
    }
    h3 {
        @apply text-base ml-20 my-0 link-hover link-secondary;
    }
    h1::before,
    h2::before {
        content: "● ";
    }
}
</style>
