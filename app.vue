<template>
    <SplashScreen :icon="sleekConfig.icon" :loader="loader">
        <template #content>
            <div class="h-screen w-screen flex flex-col justify-start">
                <Scrollbar></Scrollbar>
                <!-- <Headline v-if="mounted"></Headline> -->
                <NuxtPage class="w-full py-[2rem] px-2 lg:px-16"></NuxtPage>
                <div class="flex-1"></div>
                <Footline></Footline>
                <Toast></Toast>
                <LoadingModal></LoadingModal>
            </div>
        </template>
        <template #logo>
            <div class="flex flex-col items-center gap-4">
                <img :src="sleekConfig.icon" alt="logo" class="h-[4rem] w-[4rem] rounded-full overflow-hidden" />
                <h3>{{ sleekConfig.name }}</h3>
            </div>
        </template>
    </SplashScreen>
</template>

<script lang="ts" setup>
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

<style lang="css"></style>
