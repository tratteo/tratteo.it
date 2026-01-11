<template>
    <u-footer class="border-t border-t-default">
        <template #bottom>
            <u-container>
                <u-footer-columns
                    :columns="[
                        { label: 'Apps', children: sources.projects.map((p) => <FooterColumnLink>{ label: p.name, to: p.url, target: '_blank' }) },
                        { label: 'Resources', children: [{ label: 'Minecraft Mods', icon: 'vscode-icons:file-type-minecraft', to: '/minecraft-mods' }] },
                        { label: 'Support me', children: sources.support.map((p) => <FooterColumnLink>{ label: p.name, to: p.url, target: '_blank', icon: p.icon.name }) },
                    ]"
                ></u-footer-columns>
            </u-container>
        </template>
        <template #left>
            <div class="flex flex-col items-stretch gap-2">
                <div class="flex flex-row items-center gap-2">
                    <u-avatar src="/favicon.svg" alt="author, owner"></u-avatar>
                    <div class="typ-label text-start">All right reserved by {{ appMeta.author.name }}</div>
                </div>
                <CopyableText class="h-8 text-nowrap" :content="appMeta.author.email"></CopyableText>
            </div>
        </template>

        <template #right>
            <u-button :href="s.url" target="_blank" v-for="s in sources.socials ?? []" :title="s.name" :icon="s.icon.name" color="neutral" variant="ghost"> </u-button>
        </template>
    </u-footer>
</template>

<script lang="ts" setup>
import type { FooterColumnLink } from "@nuxt/ui";
import { appMeta } from "~/app.meta";
import sources from "~/data/sources.json";
</script>

<style></style>
