<template>
    <u-header
        mode="slideover"
        :ui="{
            root: 'mx-2 top-4 border-none bg-transparent backdrop-blur-none',
            container: 'max-w-[var(--ui-container)] rounded-xl border border-default shadow-xl rounded-2xl backdrop-blur-lg bg-default/50',
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

const navItems = computed<NavigationMenuItem[]>(() => [
    { label: "Blog", to: "/articles" },
    { label: "Mods", icon: "vscode-icons:file-type-minecraft", to: "/minecraft-mods" },
]);
</script>

<style></style>
