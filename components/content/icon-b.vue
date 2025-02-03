<template>
    <button @click="goto" class="btn btn-square btn-outline border-base-content/20" :title="title">
        <icon :name="iconName"></icon>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps<{ iconName: string; to: string; title?: string }>();
function goto() {
    navigateTo(props.to, { open: { target: "_blank" } });
}
</script>

<style></style>
