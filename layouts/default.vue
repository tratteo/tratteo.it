<template>
    <div class="w-full flex flex-col min-h-screen items-center justify-start">
        <!-- <Headline></Headline> -->
        <main class="w-full flex-1 px-4 py-[2rem] flex flex-col justify-stretch items-stretch max-w-[var(--content-width)]">
            <slot></slot>
        </main>
        <Footline></Footline>
    </div>
</template>

<script lang="ts" setup>
defineOgImage();
let removeScript: () => boolean;
onMounted(() => {
    const { load, status, remove } = useScript({
        src: `https://bubblet.vercel.app/plugin.js`,
        "data-key": "rsndvYPirJY60jqZbQ7Bv4jh2Lb2",
        "data-primary": daisyUiColorHex("--p"),
        "data-neutral": hexToRgba(daisyUiColorHex("--bc")!, 0.1),
        "data-base": daisyUiColorHex("--b1"),
        "data-text": daisyUiColorHex("--bc"),
        "data-anchor": "bottom right",
        "data-size": "md",
        "data-fontfamily": "Geist",
    });
    removeScript = remove;
});
onUnmounted(() => {
    const el = document.getElementById("bb-container");
    removeScript?.();
    el?.remove();
});
</script>

<style lang="css"></style>
