<template>
    <div class="w-screen h-screen">
        <div class="relative w-full flex flex-col min-h-screen justify-start items-center">
            <ScrollIndicator></ScrollIndicator>
            <Headline v-if="router.currentRoute.value.path !== '/'"></Headline>
            <main
                class="w-full flex flex-col justify-stretch pb-[1rem] px-2 lg:px-16 max-w-[var(--max-content-width)] self-center flex-1"
                :class="{ ' pt-[calc(var(--headline-height)+1rem)]': router.currentRoute.value.path !== '/' }"
            >
                <slot></slot>
            </main>
            <Footline></Footline>
            <ToastOverlay></ToastOverlay>
            <div class="fixed top-0 bottom-0 left-0 right-0 overflow-clip z-[-1]">
                <div id="hidden" class="absolute top-0 z-[-2]"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import sleekConfig from "~/sleek.config";

const router = useRouter();

const props = withDefaults(defineProps<{ splashScreen?: boolean }>(), { splashScreen: true });

router.afterEach((to, from) => {
    if (to.path === from.path) return;
    setTimeout(jumpTop, 0);
});
defineOgImage();
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
