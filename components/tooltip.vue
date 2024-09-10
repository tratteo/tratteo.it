<template>
    <div>
        <div
            class="relative"
            @click="
                (ev) => {
                    modal.open(tooltipModalId);
                }
            "
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
        >
            <icon
                class="hover:scale-110 transition-all duration-150 text-secondary ease-out cursor-pointer"
                name="material-symbols:info-outline-rounded"
            ></icon>
        </div>
        <Modal
            v-if="bp.smallerOrEqual('xl').value"
            :id="tooltipModalId"
            :close-button="false"
            :close-icon="false"
            :actions="false"
        >
            <template #content> <slot></slot></template>
        </Modal>
        <Transition name="fade" mode="out-in" appear>
            <div
                ref="el"
                :style="{ '--x-offset': offsets.xOffset, '--y-offset': offsets.yOffset }"
                v-if="hovering && bp.greater('xl').value"
                class="panel border-default"
            >
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
const bp = useBreakpoints(breakpointsTailwind);

const tooltipModalId = "tooltip_modal";
const el = ref<HTMLElement | null>(null);
const offsets = ref<{ xOffset: string; yOffset: string }>({ xOffset: "0px", yOffset: "0px" });
const windowSize = useWindowSize();
const modal = useModalController();

const hovering = ref(false);

watch(el, () => {
    if (!el.value) {
        offsets.value = { xOffset: "0px", yOffset: "0px" };
        return;
    }
    let bbox = el.value.getBoundingClientRect();
    if (bbox.x <= 0) {
        offsets.value.xOffset = -bbox.x + "px";
    } else if (bbox.x > windowSize.width.value - bbox.width) {
        offsets.value.xOffset = -(windowSize.width.value - bbox.width) + "px";
    }
    if (bbox.y < 0) {
        offsets.value.yOffset = -bbox.y + "px";
    } else if (bbox.y > windowSize.height.value - bbox.height) {
        offsets.value.yOffset = -(windowSize.height.value - bbox.height) + "px";
    }
});
</script>

<style lang="css" scoped>
.panel {
    transform: translateX(calc(-50% + var(--x-offset, 0px))) translateY(var(--y-offset, 0px));
    @apply absolute bg-base-300 rounded-box px-4 py-4 z-[1000000] border-[1px];
}
</style>
