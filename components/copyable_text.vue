<template>
    <div
        class="rounded-btn max-w-full border-[1.5px] justify-between border-neutral-content/25 px-2 py-1 gap-8 flex flex-row items-center"
    >
        <p class="break-all">{{ content }}</p>
        <button @click="onClick" class="btn btn-circle btn-sm btn-ghost relative">
            <icon
                :class="{ 'text-secondary': copied, 'text-neutral-content': !copied }"
                name="material-symbols:content-copy-outline-rounded"
                class="size-6 transition-all duration-150"
            ></icon>
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
    setTimeout(() => (copied.value = false), 1500);
}
</script>

<style></style>
