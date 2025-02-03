<template>
    <div class="flex flex-col items-start gap-4">
        <label class="flex flex-row items-center gap-2">
            <SolidIcon name="lucide:table-of-contents" class="bg-orange-400 text-orange-400"></SolidIcon>
            <p class="font-bold">Table of Content</p>
        </label>
        <nav class="select-none">
            <ul v-for="t in headers" class="flex flex-col items-start gap-2">
                <li class="ml-0">
                    <a @click="() => handleAnchorClick('#' + t.id)" class="link link-hover">
                        <component :is="t.tag">{{ t.text }}</component>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
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
const handleAnchorClick = (href: string) => {
    if (href?.startsWith("#")) {
        const element = document.querySelector(href);
        scrollToEl(element);
    }
};
</script>

<style lang="css" scoped>
li {
    h1 {
        text-indent: -1em;
        line-height: 1.75em;
        @apply text-base link-hover font-bold ml-[1em] my-2;
    }
    h2 {
        text-indent: -1em;
        line-height: 1.5em !important;
        @apply text-base my-2 ml-[1em] link-hover;
    }
    h3 {
        text-indent: -1em;
        line-height: 1.25em !important;
        @apply text-sm ml-[3em] my-[0.2em] link-hover font-normal;
    }

    h1::before {
        content: "▶️ ";
    }
    h2::before {
        content: "● ";
    }
    h3::before {
        content: "- ";
    }
}
</style>
