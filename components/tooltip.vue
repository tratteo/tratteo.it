<template>
    <div v-if="mounted">
        <div
            ref="rootEl"
            class="relative items-center flex flex-row gap-2 group cursor-pointer"
            @click="
                (ev) => {
                    modal.open(modalEl);
                }
            "
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
        >
            <icon class="group-hover:scale-110 transition-all duration-150 text-primary ease-out size-6" name="material-symbols:info-rounded"></icon>
            <slot v-if="slots.el" name="el"></slot>
        </div>
        <Modal v-if="bp.smallerOrEqual('xl').value" @ref-init="(el) => (modalEl = el)" :closeAction="false" :actions="false">
            <template #content>
                <div class="w-full flex flex-row items-center justify-stretch">
                    <slot></slot>
                </div>
            </template>
        </Modal>
        <Transition name="fade" mode="out-in" appear>
            <div ref="floatingEl" v-if="hovering && bp.greater('xl').value" class="panel" :style="floatingStyles">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/vue";
import { breakpointsTailwind } from "@vueuse/core";
const bp = useBreakpoints(breakpointsTailwind);

const slots = useSlots();
const mounted = useMounted();
const modalEl = ref();
const rootEl = ref();
const floatingEl = ref<HTMLElement | null>(null);

const modal = useModalController();
const hovering = ref(false);

const { floatingStyles } = useFloating(rootEl, floatingEl, {
    middleware: [offset(10), shift({ padding: 8 })],
    placement: "bottom",
    whileElementsMounted: autoUpdate,
});
</script>

<style lang="css" scoped>
.panel {
    @apply bg-base-300 text-sm border border-base-content/20 rounded-box px-4 py-4 z-[1000000] max-w-2xl shadow-xl;
}
</style>
