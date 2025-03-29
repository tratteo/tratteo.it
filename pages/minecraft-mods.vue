<template>
    <div v-if="mounted" class="flex flex-col items-stretch justify-start w-full">
        <div class="absolute inset-0 overflow-clip z-[-1]">
            <img src="/thumbnails/minecraft.jpeg" alt="minecraft background" width="2048px" height="1170px" class="w-full h-fit" />
            <div class="gradient-overlay"></div>
        </div>
        <div class="flex flex-row items-end gap-8">
            <div class="hidden sm:flex ml-12 relative flex-col items-end gap-4">
                <SvgDrawnArrow class="mr-8 lg:hidden w-auto h-[6rem] fill-primary scale-x-[-1] rotate-90"></SvgDrawnArrow>
                <img src="/icons/steve.png" alt="Trat steve" class="w-[12rem] lg:w-[16rem]" width="1750" height="1010" />
            </div>
            <div class="flex-1 flex items-end gap-4 mb-4">
                <SvgDrawnArrowTwist class="hidden lg:block w-auto h-[8rem] fill-primary"></SvgDrawnArrowTwist>
                <div class="card card-compact card-bordered bg-base-100/75 border-base-content/20 w-full">
                    <div class="card-body">
                        <div class="card-title justify-between flex-wrap">
                            <p>Yo nerd 😎</p>
                            <a :href="projects.mods.github" class="btn btn-ghost"><icon name="mdi:github"></icon>Github</a>
                        </div>
                        <p>Among all the stuff, I do also cool Minecraft mods.</p>

                        <p class="font-bold">If you want to support me 👉👈</p>
                        <div class="flex items-center flex-wrap justify-start gap-2">
                            <a
                                v-for="link in sources.support ?? []"
                                :href="link.url"
                                :aria-label="`Support me on ${link.name}`"
                                target="_blank"
                                class="btn btn-sm md:btn-md btn-success btn-outline"
                            >
                                <icon :name="link.icon.name" class="size-4"></icon>
                                <p>{{ link.name }}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <img src="/icons/minecraft_logo.svg" alt="Minecraft logo" class="h-64" /> -->
        <div class="lg:grid lg:grid-cols-2 flex flex-col items-stretch gap-4 border-base-content/20 bg-base-300 rounded-box md:border p-0 sm:p-10">
            <Transition v-for="(mod, i) in mods" name="join" appear mode="out-in">
                <a
                    class="card-compact cursor-pointer bg-base-100 image-full select-none shadow group relative card card-bordered border-base-content/20 w-full overflow-clip"
                    :href="mod.url"
                    :style="{ '--delay-tr': `${(i + 1) * 50}ms`, '--y-tr': '0px', '--x-tr': i % 2 === 0 ? '-20px' : '20px', '--duration-tr': '250ms' }"
                    target="_blank"
                >
                    <div class="card-body">
                        <div class="flex items-start gap-2 mb-2">
                            <div class="avatar">
                                <div class="w-16 rounded-xl border border-base-content/20 shadow-md">
                                    <img :src="mod.icon" />
                                </div>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="card-title">{{ mod.title }}</p>
                                <div class="flex flex-row flex-wrap items-center gap-2">
                                    <a class="btn btn-ghost btn-square btn-sm z-[100]" :href="mod.github" target="_blank"><icon name="mdi:github"></icon></a>
                                    <img v-for="s in mod.shields" :src="s.url" :title="s.name" />
                                </div>
                            </div>
                        </div>
                        <p class="text-sm">{{ mod.description }}</p>
                        <div class="card-side flex items-center flex-wrap gap-6 justify-start my-2">
                            <label v-for="f in mod.frameworks" class="flex items-center gap-2">
                                <img :src="f.icon" class="rounded-btn size-8" :title="f.name" />
                                <div class="flex flex-col items-center gap-1">
                                    <p class="font-semibold text-xs">{{ f.name }}</p>
                                    <icon name="material-symbols:check-circle-rounded" class="size-4 text-success"></icon>
                                </div>
                            </label>
                        </div>
                        <div class="card-actions justify-end">
                            <div v-for="t in mod.tags" class="badge badge-primary">{{ t }}</div>
                        </div>
                    </div>
                    <div class="absolute top-4 right-4">
                        <icon
                            name="material-symbols:arrow-outward-rounded"
                            class="group-hover:translate-x-2 group-hover:-translate-y-2 duration-[300ms] ease-out transition-transform"
                        ></icon>
                    </div> </a
            ></Transition>
        </div>
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
.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, oklch(var(--b1) / 1), oklch(var(--b1) / 0.25));
}
</style>
