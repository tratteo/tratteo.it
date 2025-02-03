<template>
    <div v-if="mounted" ref="rootEl" class="dropdown font-normal relative scrollbar" :class="{ 'dropdown-open': open }">
        <input type="text" :required="required" :value="model" class="absolute opacity-0 bottom-0 left-0 right-0 top-0 pointer-events-none" />
        <div role="button" @click="toggleOpen" class="min-w-[inherit] max-w-[inherit] w-full">
            <div v-if="slots.button" class="w-full">
                <slot name="button" :value="model" :formatter="formatter"></slot>
            </div>
            <div v-else>
                <button type="button" class="btn btn-ghost w-full border-base-content/20">
                    <p v-if="placeholder && !model" class="opacity-75">{{ placeholder }}</p>
                    <p v-else>
                        {{ formatter?.(model) ?? model }}
                    </p>
                </button>
            </div>
        </div>
        <div
            v-if="bp.greaterOrEqual('md').value"
            ref="panelEl"
            :style="floatingStyles"
            class="dropdown-content flex flex-col items-stretch bg-base-200 z-[100] shadow border border-base-content/20 p-1 rounded-box gap-4 w-full min-w-fit"
        >
            <slot name="header"></slot>
            <ul class="max-h-[20rem] scrollbar-display flex flex-col items-stretch text-sm">
                <li v-for="(el, i) in items" @click="(ev) => elementClicked(el, i)" class="rounded-btn hover:bg-base-content/20 px-2 py-1 cursor-pointer">
                    <a>{{ formatter?.(el) ?? el }}</a>
                </li>
            </ul>
        </div>
        <Modal v-else @ref-init="(el) => (modalEl = el)" @close="() => (open = false)">
            <template #title><slot name="header"></slot></template>
            <template #content>
                <div v-if="props.items.length > 0" class="w-full">
                    <ul class="flex-col flex flex-wrap items-stretch justify-center gap-2">
                        <li :aria-label="`select ${formatter?.(i) ?? i?.toString()}`" v-for="(i, index) in props.items" class="element-button" @click="elementClicked(i, index)">
                            {{ formatter?.(i) ?? i?.toString() }}
                        </li>
                    </ul>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup generic="T extends any">
import { autoPlacement, autoUpdate, offset, shift, useFloating } from "@floating-ui/vue";
import { breakpointsTailwind } from "@vueuse/core";
const bp = useBreakpoints(breakpointsTailwind);
const mounted = useMounted();
const rootEl = ref<HTMLElement>();
const modalEl = ref<HTMLDialogElement>();
const modalController = useModalController();
const open = ref(false);
const slots = useSlots();
const model = defineModel<T>();
const panelEl = ref();
const { floatingStyles } = useFloating(rootEl, panelEl, {
    middleware: [offset(10), shift({ padding: 2 }), autoPlacement({ allowedPlacements: ["bottom", "top"] })],
    whileElementsMounted: autoUpdate,
});

const props = withDefaults(
    defineProps<{
        items: T[];
        closeOnSelect?: boolean;
        placeholder?: string;
        required?: boolean;
        formatter?: (e: T | undefined) => string;
    }>(),
    { closeOnSelect: true, placeholder: "Select" }
);
onMounted(() => {
    window.addEventListener("click", onWindowClick);
});
onUnmounted(() => {
    window.removeEventListener("click", onWindowClick);
});

function onWindowClick(ev: MouseEvent) {
    if (rootEl.value && !rootEl.value.contains(ev.target as HTMLElement)) {
        open.value = false;
    }
}

function toggleOpen() {
    if (open.value) {
        modalController.close(modalEl.value);
    } else {
        modalController.open(modalEl.value);
    }
    open.value = !open.value;
}

const emit = defineEmits<{
    (e: "changed", value: any, index: number): void;
}>();

function elementClicked(element: any, index: number) {
    model.value = element;
    emit("changed", element, index);
    if (props.closeOnSelect) {
        open.value = false;
    }
    modalController.close(modalEl.value);
}
</script>

<style lang="css" scoped>
.element-button {
    @apply btn  text-nowrap rounded-lg px-4 text-start;
}
</style>
