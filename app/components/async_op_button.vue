<template>
    <LayoutGroup v-if="mounted">
        <motion.div layout :transition="layoutTransition">
            <u-button
                :title="title"
                :role="role"
                @click="onClick"
                :disabled="isAwaiting || props.disabled"
                :type="type"
                :variant="variant"
                :color="color"
                class="flex items-center"
            >
                <template #leading>
                    <motion.div key="leading" layout class="flex items-center">
                        <icon v-if="isAwaiting" name="svg-spinners:180-ring-with-bg" class="size-5"></icon>
                        <icon v-else-if="leadingIcon" :name="leadingIcon" class="size-5"></icon>
                    </motion.div>
                </template>
                <template #default>
                    <motion.div v-if="$slots.default" key="content" layout :transition="layoutTransition">
                        <slot></slot>
                    </motion.div>
                </template>
            </u-button>
        </motion.div>
    </LayoutGroup>
</template>

<script lang="ts" setup>
import { LayoutGroup, motion, type $Transition } from "motion-v";

const layoutTransition: $Transition = { type: "spring", bounce: 0.25, duration: 0.4 };

const awaitingPromise = ref(false);
const isAwaiting = computed(() => props.awaiting || awaitingPromise.value);
const mounted = useMounted();
const props = defineProps<{
    leadingIcon?: string;
    awaiting?: boolean;
    role?: string;
    title?: string;
    type?: "submit" | "reset" | "button";
    color?: "neutral" | "primary" | "error" | "success" | "warning" | "info";
    variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
    disabled?: boolean;

    promise?: () => Promise<void | any>;
}>();
const emits = defineEmits<{ (e: "click", ev: MouseEvent): void }>();

function onClick(ev: MouseEvent) {
    if (isAwaiting.value || props.disabled) return;
    emits("click", ev);
    if (!props.promise) return;
    awaitingPromise.value = true;
    props.promise().finally(() => (awaitingPromise.value = false));
}
</script>

<style></style>
