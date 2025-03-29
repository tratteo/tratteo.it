<template>
    <div id="__root">
        <CustomScrollbar target="__root"></CustomScrollbar>
        <ToastOverlay></ToastOverlay>
        <NuxtLayout>
            <NuxtPage></NuxtPage>
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
useHead({
    meta: [{ charset: "utf-8" }],
    link: [
        {
            rel: "icon",
            type: "image/webp",
            href: "/favicon.webp",
        },
    ],
    htmlAttrs: { lang: "en" },
});
</script>

<style lang="css"></style>
