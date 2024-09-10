<template>
    <div>
        <div class="relative" @mouseenter="open = true" @mouseleave="open = false">
            <icon
                class="hover:scale-110 transition-all duration-150 hover:text-accent ease-out cursor-pointer"
                name="material-symbols:chat-info-outline-rounded"
            ></icon>
            <Transition name="fade">
                <div v-if="open" ref="el" class="panel">
                    <slot></slot>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
const el = ref<HTMLElement | null>(null);
const open = ref(false);
const offsets = ref<{ xOffset: string; yOffset: string }>({ xOffset: "0px", yOffset: "0px" });
const windowSize = useWindowSize();

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
    transform: translateX(calc(-50% + var(--x-offset, 0px)));
    @apply absolute left-[50%] break-words text-wrap text-sm my-4 z-[100] border-[1px] border-neutral-content/25 bg-base-100 rounded-xl py-4 px-4;
}
</style>
