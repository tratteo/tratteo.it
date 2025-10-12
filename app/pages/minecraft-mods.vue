<template>
    <div v-if="mounted" class="flex flex-col items-stretch justify-start gap-2 w-full">
        <div class="fixed inset-0 overflow-clip z-[-1]">
            <img src="/thumbnails/minecraft.webp" alt="minecraft background" width="2048px" height="1170px" class="object-cover h-full" />
            <div class="gradient-overlay"></div>
        </div>
        <u-button icon="material-symbols-light:home-rounded" to="/" label="Home" color="neutral" variant="subtle" class="w-fit"> </u-button>
        <div class="flex flex-row items-start flex-wrap gap-4">
            <div class="self-end hidden sm:flex ml-12 relative flex-col items-end gap-4">
                <SvgDrawnArrow class="mr-8 lg:hidden w-auto h-[6rem] fill-primary scale-x-[-1] rotate-90"></SvgDrawnArrow>
                <img src="/icons/steve.png" alt="Trat steve" class="w-[12rem] lg:w-[16rem]" width="1750" height="1010" />
            </div>

            <div class="flex-1 flex items-end gap-4 mb-4">
                <SvgDrawnArrowTwist class="hidden lg:block w-auto h-[8rem] fill-primary"></SvgDrawnArrowTwist>
                <u-card class="min-w-[12rem] w-full border border-default">
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
        <u-card class="" variant="soft">
            <div class="items-grid">
                <a
                    v-for="(mod, i) in mods"
                    class="cursor-pointer group select-none relative w-full overflow-auto"
                    :href="mod.url"
                    :style="{ '--delay-tr': `${(i + 1) * 50}ms`, '--y-tr': '0px', '--x-tr': i % 2 === 0 ? '-20px' : '20px', '--duration-tr': '250ms' }"
                    target="_blank"
                >
                    <u-card>
                        <div class="flex items-start gap-2 mb-2">
                            <u-avatar :src="mod.icon" :alt="mod.title" size="3xl"></u-avatar>

                            <div class="flex flex-col items-start">
                                <p class="card-title">{{ mod.title }}</p>
                                <div class="flex flex-row flex-wrap items-center gap-2">
                                    <u-button
                                        icon="mdi:github"
                                        class="z-[100]"
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
                        <p class="typ-sublabel">{{ mod.description }}</p>
                        <div class="flex items-center flex-wrap gap-6 justify-start my-2">
                            <label v-for="f in mod.frameworks" class="flex items-center gap-2">
                                <u-avatar :src="f.icon" :title="f.name" :alt="f.name" size="sm"></u-avatar>
                                <div class="flex flex-col items-center gap-1">
                                    <p class="font-semibold text-xs">{{ f.name }}</p>
                                    <icon name="material-symbols:check-circle-rounded" class="size-4 text-success"></icon>
                                </div>
                            </label>
                        </div>
                        <div class="flex items-center gap-2 justify-end flex-wrap">
                            <u-badge v-for="t in mod.tags" size="sm" variant="soft" color="primary" :label="t"></u-badge>
                        </div>
                    </u-card>
                    <div class="absolute top-4 right-4">
                        <icon
                            name="material-symbols:arrow-outward-rounded"
                            class="group-hover:translate-x-2 group-hover:-translate-y-2 duration-[300ms] ease-out transition-transform"
                        ></icon>
                    </div>
                </a>
            </div>
        </u-card>
        <!-- <img src="/thumbnails/minecraft.jpeg" alt="Minecraft background" class="absolute w-full top-0 left-0 right-0 bottom-0 z-[-1]" /> -->
    </div>
</template>

<script lang="ts" setup>
import sources from "~/assets/sources.json";
import projects from "~/data/projects.json";
const mounted = useMounted();
const mods = projects.mods.projects;

useSeoMeta({ title: "Trat Minecraft Mods", description: "I build cool Minecraft mods with more than 500k downloads." });
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
@variant md {
    .items-grid {
        grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr)) !important; /* Creates responsive columns */
    }
}
.items-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr)); /* Creates responsive columns */
    gap: 16px; /* Adjust the gap between grid items */
    @apply grid w-full;
}
</style>
