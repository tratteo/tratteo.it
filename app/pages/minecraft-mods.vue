<template>
    <u-page>
        <div class="fixed overflow-clip z-[-1] w-full">
            <img src="/thumbnails/minecraft.webp" alt="minecraft background" class="object-cover w-full" />
            <div class="gradient-overlay"></div>
        </div>
        <u-page-body>
            <u-container class="flex flex-col gap-0">
                <div class="flex flex-row items-start flex-wrap gap-4">
                    <div class="self-end hidden sm:flex ml-12 relative flex-col items-end gap-4">
                        <SvgDrawnArrow class="mr-8 lg:hidden w-auto h-24 fill-primary scale-x-[-1] rotate-90"></SvgDrawnArrow>
                        <img src="/icons/steve.png" alt="Trat steve" class="w-48 lg:w-[16rem]" width="1750" height="1010" />
                    </div>

                    <div class="flex-1 flex items-end gap-4 mb-4">
                        <SvgDrawnArrowTwist class="hidden lg:block w-auto h-32 fill-primary"></SvgDrawnArrowTwist>
                        <u-card class="min-w-48 w-full border border-default">
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center gap-2 justify-between flex-wrap">
                                    <p class="typ-label">Among all the stuff, I do also cool Minecraft mods. <br />If you want to support me 👉👈</p>
                                    <u-button :to="projects.mods.github" variant="ghost" icon="mdi:github" label="Github" color="neutral"></u-button>
                                </div>
                                <div class="flex items-center flex-wrap justify-start gap-2">
                                    <u-button
                                        v-for="link in sources.support ?? []"
                                        :to="link.url"
                                        :aria-label="`Support me on ${link.name}`"
                                        target="_blank"
                                        color="success"
                                        variant="soft"
                                        size="sm"
                                        :icon="link.icon.name"
                                        :label="link.name"
                                    >
                                    </u-button>
                                </div>
                            </div>
                        </u-card>
                    </div>
                </div>
                <!-- <img src="/icons/minecraft_logo.svg" alt="Minecraft logo" class="h-64" /> -->
                <div class="bg-transparent rounded-lg">
                    <u-page-grid class="gap-4">
                        <u-page-card v-for="(mod, i) in mods" spotlight variant="outline" :ui="{ footer: 'w-full' }" :to="mod.url" target="_blank">
                            <template #header>
                                <div class="flex items-start gap-2 mb-2">
                                    <u-avatar :src="mod.icon" :alt="mod.title" size="3xl"></u-avatar>
                                    <div class="flex flex-col items-start">
                                        <p class="card-title">{{ mod.title }}</p>
                                        <div class="flex flex-row flex-wrap items-center gap-2">
                                            <u-button
                                                icon="mdi:github"
                                                class="z-100"
                                                size="sm"
                                                variant="ghost"
                                                color="neutral"
                                                :to="mod.github"
                                                target="_blank"
                                                aria-label="Github page"
                                            ></u-button>
                                            <img v-for="s in mod.shields" :src="s.url" :title="s.name" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #description>
                                <div class="flex flex-col gap-4">
                                    <p>{{ mod.description }}</p>
                                    <div class="flex items-center flex-wrap gap-6 justify-start">
                                        <u-user v-for="f in mod.frameworks" :name="f.name" :avatar="{ src: f.icon }" size="xs"></u-user>
                                    </div>
                                </div>
                            </template>
                            <template #footer>
                                <div class="flex items-end gap-4 flex-wrap">
                                    <div class="flex items-center gap-2 justify-end flex-wrap ml-auto">
                                        <u-badge v-for="t in mod.tags" variant="soft" color="primary" :label="t"></u-badge>
                                    </div>
                                </div>
                            </template>
                        </u-page-card>
                    </u-page-grid>
                </div>
            </u-container>
        </u-page-body>
        <!-- <img src="/thumbnails/minecraft.jpeg" alt="Minecraft background" class="absolute w-full top-0 left-0 right-0 bottom-0 z-[-1]" /> -->
    </u-page>
</template>

<script lang="ts" setup>
import projects from "~/data/projects.json";
import sources from "~/data/sources.json";

const mods = projects.mods.projects;

useSeoMeta({ title: "Trat Minecraft Mods", description: "I build cool Minecraft mods with more than 500k downloads." });
useSchemaOrg([
    defineBreadcrumb({
        itemListElement: [
            {
                name: "Home",
                item: "/",
            },
            {
                name: "Minecraft Mods",
            },
        ],
    }),
]);
defineOgImageComponent("OgImageMinecraft", { avatarUrl: "/icon.png", subtitle: "Check out my awesome Minecraft mods 😎" });
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
.gradient-overlay {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, var(--ui-bg) 20%, transparent 100%);
}
</style>
