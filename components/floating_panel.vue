<template>
    <div ref="rootEl" class="w-full h-full">
        <div @click="() => (open = !open)" class="flex flex-row items-center w-full cursor-pointer select-none h-fit">
            <div class="w-full">
                <slot name="el"> </slot>
            </div>
            <icon v-if="arrow" class="transition-all duration-[250ms] ease-out" name="material-symbols:keyboard-arrow-down-rounded" :class="{ 'rotate-180': open }"></icon>
        </div>
        <Transition v-if="bp.greater('md').value" name="fade" mode="out-in" appear>
            <div v-if="open" ref="panelEl" class="panel-container" :style="floatingStyles">
                <slot name="panel" :close="close"></slot>
            </div>
        </Transition>
        <Modal v-else @ref-init="(el) => (modalEl = el)" @close="() => (open = false)">
            <template #content>
                <div class="text-base">
                    <slot name="panel" :close="close"></slot>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/vue";
import { breakpointsTailwind } from "@vueuse/core";

const bp = useBreakpoints(breakpointsTailwind);
const open = ref(false);
const modal = useModalController();
const panelEl = ref();
const rootEl = ref();
const modalEl = ref();
const props = withDefaults(defineProps<{ arrow?: boolean }>(), { arrow: true });

watch(open, () => {
    if (bp.greater("md").value) return;
    if (open.value) {
        modal.open(modalEl.value);
    } else {
        modal.close(modalEl.value);
    }
});

function close() {
    open.value = false;
}

const { floatingStyles } = useFloating(rootEl, panelEl, {
    middleware: [offset(10), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
});

onMounted(() => {
    window.addEventListener("click", onWindowClick);
});

onUnmounted(() => {
    window.removeEventListener("click", onWindowClick);
});

function onWindowClick(ev: MouseEvent) {
    const el = ev.target as HTMLElement;
    if (!rootEl.value.contains(el) && open.value && ((panelEl.value && !panelEl.value.contains(el)) || (modalEl.value && !modalEl.value.contains(el)))) {
        open.value = false;
    }
}
</script>

<style lang="css" scoped>
.panel-container {
    @apply absolute left-[var(--x)] top-[var(--y)] z-[1000] bg-base-100 rounded-box p-4 border-[1px] border-base-content/20;
}
</style>
