<template>
    <div id="author-about" class="card card-compact bg-base-300 shadow-lg border border-base-content/20">
        <div class="card-body">
            <p class="card-title">About the author</p>
            <p class="opacity-75">
                <slot name="body"></slot>
            </p>
            <div class="card-actions justify-end">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
.card {
    @apply mt-16 !important;
}
</style>
