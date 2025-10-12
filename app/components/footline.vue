<template>
    <footer class="border-t border-default bg-default p-10 w-full flex justify-center">
        <div class="flex flex-row items-stretch max-w-[var(--content-width)] w-full justify-stretch flex-wrap gap-8">
            <div class="flex flex-col items-stretch gap-2">
                <div class="flex flex-row items-start gap-2">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="/favicon.svg" alt="author, owner" width="40px" height="40px" />
                        </div>
                    </div>
                    <div class="typ-label text-start">
                        {{ appMeta.name }} - {{ new Date().getFullYear() }} <br />
                        All right reserved by {{ appMeta.author.name }}
                        <!-- <p class="text-xs">VAT Number: {{ sources.legal?.vat }}</p> -->
                    </div>
                </div>
                <CopyableText v-if="mounted" class="h-8 text-nowrap" :content="appMeta.author.email"></CopyableText>
                <div class="flex flex-row items-start gap-2">
                    <a :href="s.url" target="_blank" v-for="s in sources.socials ?? []" class="btn btn-square btn-ghost btn-xs" :title="s.name">
                        <icon class="size-5" :name="s.icon.name"></icon>
                    </a>
                </div>
            </div>

            <div class="flex-1 flex flex-row md:justify-evenly justify-between flex-wrap gap-4">
                <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">SUPPORT ME</p>
                    <div class="section-col">
                        <a
                            v-for="link in sources.support ?? []"
                            :href="link.url"
                            :aria-label="`Support me on ${link.name}`"
                            target="_blank"
                            class="flex flex-row items-center gap-1 link-hover"
                        >
                            <icon :name="link.icon.name" class="size-4"></icon>
                            <p>{{ link.name }}</p>
                        </a>
                    </div>
                </div>
                <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">MY APPS</p>
                    <div class="section-col">
                        <div v-for="p in l.filter(sources.projects ?? [], (p) => p.name !== appMeta.name)">
                            <a :href="p.url" target="_blank" class="link-hover">
                                <p>{{ p.name }}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">LEGAL</p>
                    <div class="section-col">
                        <NuxtLink v-for="doc in data" :to="doc._path" class="link-hover">
                            <p>{{ doc.title }}</p>
                        </NuxtLink>
                        <button @click="() => modal.open(cookieBannerModalId)" class="link-hover">
                            <p>Cookie Settings</p>
                        </button>
                    </div>
                </div> -->
                <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">RESOURCES</p>
                    <div class="section-col">
                        <NuxtLink to="/minecraft-mods" class="link-hover flex items-center gap-1">
                            <icon name="vscode-icons:file-type-minecraft" class="size-5"></icon>
                            <p>Minecraft Mods</p>
                        </NuxtLink>
                        <!-- <NuxtLink to="/tools" class="link-hover">
                            <p>Free tools</p>
                        </NuxtLink> -->
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import l from "lodash";

import { appMeta } from "~/app.meta";
import sources from "~/assets/sources.json";
const mounted = useMounted();

//const { data } = await useAsyncData("legal-docs", () => queryContent("/docs").only(["date", "_path", "title"]).find());
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
.section-col {
    @apply flex flex-col items-start gap-1 text-xs;
}
</style>
