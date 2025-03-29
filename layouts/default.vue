<template>
    <div class="w-full flex flex-col min-h-screen items-center justify-start">
        <Headline></Headline>
        <main class="w-full flex-1 px-4 pb-[1rem] flex flex-col justify-stretch items-stretch max-w-[var(--content-width)]">
            <slot></slot>
        </main>
        <Footline></Footline>
    </div>
</template>

<script lang="ts" setup>
defineOgImage();
</script>

<style lang="css"></style>
