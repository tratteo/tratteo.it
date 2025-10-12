<template>
    <div class="flex items-center p-2 rounded-md border border-muted w-fit">
        <icon :name="iconName"></icon>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ iconName: string }>();
</script>

<style></style>
