<template>
    <div class="collapse collapse-arrow bg-base-300">
        <input class="cursor-pointer" @click="() => (expanded = !expanded)" type="radio" :checked="expanded" />
        <div class="collapse-title">
            <slot name="title"></slot>
        </div>
        <div class="collapse-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ initExpanded?: boolean }>(), { initExpanded: false });

const expanded = ref(props.initExpanded);
const emit = defineEmits<{ (e: "changedState", expanded: boolean): void }>();

watch(expanded, () => emit("changedState", expanded.value));
</script>

<style lang="css" scoped>
.expand-enter-active,
.expand-leave-active {
    transition: height 0.25s ease-out;
    overflow: hidden;
}
</style>
