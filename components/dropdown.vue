<template>
    <div class="relative">
        <button ref="buttonEl" :aria-label="`menu`" class="btn w-full">
            {{ props.label }}
        </button>
        <div
            ref="el"
            :style="{
                '--max-h': maxHeight,
                '--min-w': minWidth,
                '--x-offset': offsets.xOffset,
                '--y-offset': offsets.yOffset,
            }"
            class="vertical-panel"
            v-if="open"
        >
            <div class="w-full">
                <slot></slot>
            </div>
            <div v-if="props.items.length > 0" class="mt-2 overflow-y-scroll max-h-[var(--max-h)]">
                <div class="flex flex-col gap-2">
                    <ul class="flex-col items-center justify-center gap-2 top-[-50%]">
                        <li
                            :class="elementStyle(index, i)"
                            :aria-label="`select ${itemsFormatter?.(i) ?? i.toString()}`"
                            v-for="(i, index) in props.items"
                            class="element-button"
                            @click="elementClicked(i, index)"
                        >
                            {{ itemsFormatter?.(i) ?? i.toString() }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const open = ref(false);
const el = ref<HTMLElement | null>(null);
const buttonEl = ref<HTMLElement | null>(null);
const minWidth = ref<string>();
const offsets = ref<{ xOffset: string; yOffset: string }>({
    xOffset: "0px",
    yOffset: "0px",
});

const windowSize = useWindowSize();

const model = defineModel<any>();

const props = withDefaults(
    defineProps<{
        label: string;
        items: any[];
        itemsFormatter?: (e: any) => string;
        selectedItems?: any[];
        maxHeight?: string;
    }>(),
    {
        label: "Dropdown",
        selectedItems: <any>[],
        maxHeight: "20rem",
    }
);
const emit = defineEmits<{
    (e: "changed", value: any, index: number): void;
    (e: "changedStatus", open: boolean): void;
}>();

function elementClicked(element: any, index: number) {
    emit("changed", element, index);
    open.value = false;
    model.value = element;
}

const elementStyle = computed(() => (index: number, i: any) => {
    if (!props.selectedItems) return [];
    if (
        (typeof i === "string" && props.selectedItems.includes(i.toLocaleLowerCase())) ||
        props.selectedItems.includes(i)
    ) {
        return ["bg-accent/50"];
    }

    return [];
});

watch(open, () => emit("changedStatus", open.value));

watch(el, () => {
    if (!el.value) {
        offsets.value = { xOffset: "0px", yOffset: "0px" };
        return;
    }
    minWidth.value = (el.value?.clientWidth ?? 0) + "px";
    let bbox = el.value.getBoundingClientRect();
    if (bbox.x <= 0) {
        offsets.value.xOffset = -bbox.x + "px";
    } else if (bbox.x > windowSize.width.value - bbox.width) {
        offsets.value.xOffset = windowSize.width.value - bbox.width - bbox.x + "px";
        console.log(offsets.value.xOffset);
    }
    if (bbox.y < 0) {
        offsets.value.yOffset = -bbox.y + "px";
    } else if (bbox.y > windowSize.height.value - bbox.height) {
        offsets.value.yOffset = -(windowSize.height.value - bbox.height) + "px";
    }
});
onMounted(() => {
    window.addEventListener("click", function (e) {
        if (e.target != el.value && !el.value?.contains(e.target as Node) && open.value) {
            open.value = false;
        } else if (e.target == buttonEl.value) {
            open.value = !open.value;
        }
        console.log(open.value);
    });
});
</script>

<style lang="css" scoped>
.vertical-panel {
    z-index: 10;
    transform: translateX(calc(-50% + var(--x-offset, 0px)));
    @apply absolute min-w-[var(--min-w,0)] left-[50%] rounded-2xl border-none bg-base-300 py-2 pl-[10px] pr-[10px];
}
.element-button {
    @apply btn btn-ghost w-full text-nowrap rounded-lg px-4 text-start;
}
* {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Scroll bar stylings */
::-webkit-scrollbar {
    display: none;
    width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    @apply rounded-[var(--border-radius)] bg-base-100;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    @apply bg-neutral-content;
}
</style>
