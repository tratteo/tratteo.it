<template>
    <nuxt-layout>
        <nuxt-page></nuxt-page>
    </nuxt-layout>
</template>

<script lang="ts" setup>
defineOgImage();

onMounted(() => {
    useScript(
        {
            src: `https://bubblet.vercel.app/plugin.js`,
            "data-key": "rsndvYPirJY60jqZbQ7Bv4jh2Lb2",
            "data-primary": cssColor("--ui-primary", 1, "hex"),
            "data-neutral": cssColor("--ui-bg-toned", 0.1, "hex"),
            "data-base": cssColor("--ui-bg", 1, "hex"),
            "data-text": cssColor("--ui-text", 1, "hex"),
            "data-anchor": "bottom right",
            "data-size": "md",
            "data-fontfamily": "Poppins",
        },
        { trigger: "client" },
    );
});
onUnmounted(() => {});
</script>
