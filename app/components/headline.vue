<template>
    <u-header
        mode="slideover"
        :data-scroll="scroll.y.value > 0"
        class="group"
        :ui="{
            root: 'mx-2 border-none bg-transparent backdrop-blur-none pt-4',
            container:
                'max-w-[var(--ui-container)] rounded-xl group-data-[scroll=true]:shadow-xl border border-default rounded-2xl backdrop-blur-lg bg-default/50  transition-all duration-150 ease-out',
        }"
    >
        <template #left>
            <u-user name="Matteo Beltrame" to="/" :avatar="{ src: '/favicon.svg' }"></u-user>
        </template>
        <template #body>
            <u-navigation-menu :items="navItems" orientation="vertical"></u-navigation-menu>
        </template>
        <template #right>
            <u-navigation-menu :items="navItems" class="hidden lg:block"></u-navigation-menu>
        </template>
    </u-header>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const scroll = useWindowScroll();

const navItems = computed<NavigationMenuItem[]>(() => [
    { label: "Blog", to: "/articles" },
    { label: "Mods", icon: "vscode-icons:file-type-minecraft", to: "/minecraft-mods" },
]);
</script>

<style></style>
