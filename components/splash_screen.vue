<template>
    <div class="w-screen h-screen" :class="{ 'overflow-hidden': !loaded }">
        <div class="flex relative h-screen w-screen items-center justify-center">
            <Transition name="fade" mode="out-in">
                <div
                    v-if="!loaded"
                    class="absolute z-[10000000] w-screen h-screen flex items-center justify-center bg-base-300"
                >
                    <slot name="logo"></slot>
                </div>
            </Transition>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
//const mounted = ref(false);
const loaded = ref<boolean>();
const props = withDefaults(defineProps<{ loader?: Function }>(), {});
const emits = defineEmits<{ (e: "load"): Promise<void> }>();

onMounted(async () => {
    if (props.loader) {
        await props.loader();
    }

    loaded.value = true;
});
</script>

<style></style>
