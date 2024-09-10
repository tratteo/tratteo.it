<template>
    <SplashScreen :icon="sleekConfig.icon" :loader="loader">
        <template #content>
            <div class="h-screen w-screen flex flex-col justify-start">
                <Scrollbar v-if="mounted"></Scrollbar>
                <!-- <Headline v-if="mounted"></Headline> -->
                <NuxtPage class="w-full py-[4rem] px-2 lg:px-16"></NuxtPage>
                <div class="flex-1"></div>
                <Footline v-if="mounted"></Footline>
                <Toast v-if="mounted"></Toast>
                <LoadingModal></LoadingModal>
            </div>
        </template>
        <template #logo>
            <div class="flex flex-col items-center gap-4">
                <img :src="sleekConfig.icon" alt="logo" class="h-[4rem] w-[4rem]" />
                <h3>{{ sleekConfig.name }}</h3>
            </div>
        </template>
    </SplashScreen>
</template>

<script lang="ts" setup>
const mounted = useMounted();
const sleekConfig = useAppConfig().sleek;

useHead({
    meta: [
        { charset: "utf-8" },
        {
            name: "subtitle",
            content: sleekConfig.subtitle,
        },
    ],
    htmlAttrs: { lang: "en" },
});

onMounted(() => {
    // user.subscribe();
});

async function loader() {}
</script>

<style lang="css" scoped></style>
