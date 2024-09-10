<template>
    <dialog ref="dialogEl" :id="id" class="modal">
        <div :key="renderKey" class="modal-box" :class="classes">
            <button
                v-if="closeIcon"
                type="button"
                tabindex="-1"
                @click="close"
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                <icon name="material-symbols:close-rounded"></icon>
            </button>
            <slot name="title"></slot>
            <slot name="content"></slot>
            <div v-if="actions" class="modal-action">
                <slot name="action"></slot>
                <button v-if="closeButton" @click="close" type="button" class="btn">Close</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<script lang="ts" setup>
const controller = useModalController();
const dialogEl = ref<HTMLDialogElement>();
const mounted = useMounted();
const renderKey = ref(0);
const props = withDefaults(
    defineProps<{
        id: string;
        closeButton?: boolean;
        closeOnClickOutside?: boolean;
        closeIcon?: boolean;
        classes?: string[];
        actions?: boolean;
    }>(),
    {
        closeIcon: true,
        actions: true,
        closeButton: false,
        closeOnClickOutside: true,
    }
);

const observer = useMutationObserver(
    dialogEl,
    (mutations) => {
        if (mutations.length <= 0) return;
        const open = (mutations[0].target as HTMLDialogElement).open;
        if (open) {
            renderKey.value++;
        }
    },
    { attributes: true, attributeFilter: ["open"] }
);

function close() {
    controller.close(props.id);
}
</script>

<style lang="css"></style>
