<template>
    <span class="rounded-btn max-w-full w-fit border justify-between border-base-content/25 px-2 py-1 gap-8 flex flex-row items-center">
        <p class="break-all">{{ content }}</p>
        <button @click="onClick" class="btn btn-square btn-sm btn-ghost relative" title="Copy!" aria-label="copy content">
            <div class="indicator">
                <icon name="material-symbols:content-copy-outline-rounded" class="size-6 transition-all duration-150"></icon>
                <Transition name="fade" appear>
                    <div v-if="copied" class="indicator-item"><icon class="size-4 text-success" name="material-symbols:check-circle-rounded"></icon></div>
                </Transition>
            </div>
        </button>
    </span>
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
