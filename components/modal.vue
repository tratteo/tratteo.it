<template>
    <dialog ref="dialogEl" :id="id" class="modal" @animationend="onAnimationEnd">
        <form method="dialog" class="modal-backdrop">
            <button @click="close" v-if="closeOnClickOutside">close</button>
        </form>
        <div v-if="bp.smallerOrEqual('md').value" class="modal-sheet" :class="sheetClass">
            <div :key="key" class="relative w-full max-h-[90svh] min-h-[40svh] flex flex-col items-stretch py-4 px-6 gap-2">
                <button v-if="closeIcon" type="button" tabindex="-1" @click="close" class="btn btn-sm btn-circle self-end">
                    <icon name="material-symbols:close-rounded"></icon>
                </button>
                <div v-if="slots.title" class="font-bold w-full">
                    <slot name="title" :arg="arg"></slot>
                </div>
                <div class="modal-content-wrapper scrollbar-display overflow-x-hidden">
                    <slot name="content" :arg="arg"></slot>
                </div>
                <div v-if="slots.action || closeAction" class="my-2 gap-4 flex flex-row justify-end w-full">
                    <slot name="action" :arg="arg"></slot>
                    <button v-if="closeAction" @click="close" type="button" class="btn">Chiudi</button>
                </div>
            </div>
        </div>
        <div v-else class="modal-box" :class="boxClass">
            <div :key="key" class="max-h-[80svh] grow h-full flex flex-col items-stretch">
                <div class="w-full flex flex-row justify-end">
                    <button v-if="closeIcon" type="button" tabindex="-1" @click="close" class="btn btn-sm btn-circle">
                        <icon name="material-symbols:close-rounded"></icon>
                    </button>
                </div>
                <div class="font-bold mb-2">
                    <slot name="title" :arg="arg"></slot>
                </div>
                <div class="modal-content-wrapper scrollbar-display overflow-x-hidden">
                    <slot name="content" :arg="arg"></slot>
                </div>

                <div v-if="slots.action || closeAction" class="modal-action">
                    <slot name="action" :arg="arg"></slot>
                    <button v-if="closeAction" @click="close" type="button" class="btn">Chiudi</button>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

const bp = useBreakpoints(breakpointsTailwind);
const controller = useModalController();
const dialogEl = ref<HTMLDialogElement>();
const slots = useSlots();
const arg = ref<any | undefined>();
const emit = defineEmits<{ (e: "refInit", el: HTMLDialogElement | undefined): void; (e: "close"): void; (e: "open", arg: any): void }>();
const { key, refresh } = useRefreshableKey();
const animationEnded = ref(false);
function onAnimationEnd(payload: AnimationEvent) {
    setTimeout(() => {
        animationEnded.value = true;
    }, 50);
}

function onOpen() {
    arg.value = controller.queryArg(dialogEl.value);
    emit("open", arg.value);
    animationEnded.value = false;
    refresh();
}
function onClose() {
    emit("close");
}
useMutationObserver(
    dialogEl,
    (mutations) => {
        const target = mutations.at(0)?.target as HTMLElement;
        if (!target) return;
        if (target.hasAttribute("open")) {
            onOpen();
        } else {
            onClose();
        }
    },
    { attributeFilter: ["open"], attributes: true }
);

onMounted(() => {
    emit("refInit", dialogEl.value);
});

onUnmounted(() => {});

const props = withDefaults(
    defineProps<{
        id?: string;
        closeAction?: boolean;
        closeOnClickOutside?: boolean;
        closeIcon?: boolean;
        boxClass?: string[];
        sheetClass?: string[];
        actions?: boolean;
    }>(),
    {
        closeIcon: true,
        closeAction: false,
        actions: true,
        closeButton: false,
        closeOnClickOutside: true,
    }
);

function close() {
    controller.close(dialogEl.value);
}
</script>

<style lang="css" scoped>
.modal[open] .modal-sheet {
    @apply translate-y-0;
}
.modal:not([open]) * {
    @apply pointer-events-none !important;
}
.modal-sheet {
    z-index: 1000 !important;
    @apply fixed bottom-0 w-[100vw] max-h-screen translate-y-[20%] border-x-[0px] bg-base-100 h-fit rounded-t-box transition-all duration-200 ease-out text-base-content shadow-md min-h-[25svh];
}

.modal-content-wrapper {
    @apply text-sm w-full h-full p-1 gap-2 flex flex-col;
}
</style>
