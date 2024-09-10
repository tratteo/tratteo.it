<template>
    <dialog :id="modal.id" class="modal select-none z-[1000000]">
        <div class="flex flex-col items-center justify-center gap-4">
            <icon class="size-16 text-primary" name="svg-spinners:bouncing-ball"></icon>
            <p class="info-text"></p>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
const modal = useLoadingModal();
</script>

<style lang="css" scoped></style>
