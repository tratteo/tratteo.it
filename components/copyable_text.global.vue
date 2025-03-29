<template>
    <div class="rounded-btn max-w-full w-fit border justify-between border-base-content/25 px-2 py-1 gap-8 flex flex-row items-center">
        <p class="break-all font-semibold">{{ content }}</p>
        <button @click="onClick" class="relative btn btn-square btn-sm btn-ghost" title="Copy text" aria-label="copy content">
            <icon v-if="copied" class="size-6 transition-all duration-150 text-success" name="material-symbols:check-circle-rounded"></icon>
            <icon v-else name="material-symbols:content-copy-outline-rounded" class="size-6 transition-all duration-150"></icon>
        </button>
    </div>
</template>

<script lang="ts" setup>
const clipboard = useClipboard();
const copied = ref<boolean>(false);
const props = defineProps<{ content: string }>();
const emit = defineEmits<{ (e: "click", val: string, ev: MouseEvent): void }>();

function onClick(event: MouseEvent) {
    emit("click", props.content, event);
    clipboard.copy(props.content);
    copied.value = true;
    setTimeout(() => {
        console.log(false);
        return (copied.value = false);
    }, 1500);
}
</script>

<style></style>
