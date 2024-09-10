<template>
    <div class="drawer-end fixed z-[10000] w-screen">
        <input id="navbar_drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side z-[1000]">
            <label for="navbar_drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-64 p-4">
                <li>
                    <NuxtLink to="/">
                        <icon name="material-symbols:home-rounded" class="size-4"></icon>
                        <p class="text-sm">Home</p>
                    </NuxtLink>
                </li>
                <div class="divider"></div>
                <li v-for="i in navItems.filter((i) => i.canShow())">
                    <NuxtLink :to="i.path">
                        <icon :name="i.icon" class="size-4"></icon>
                        <p class="text-sm">{{ i.name }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="drawer-content flex flex-col">
            <div class="navbar bg-base-100 w-full">
                <div class="mx-2 flex-1 px-2">
                    <NuxtLink class="btn btn-ghost text-xl" to="/">
                        <img width="40px" :src="sleekConfig.icon" alt="logo" />
                        {{ sleekConfig.name }}
                    </NuxtLink>
                </div>
                <div class="flex-none lg:hidden">
                    <label for="navbar_drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <icon name="material-symbols:menu-rounded"></icon>
                    </label>
                </div>
                <div class="hidden flex-none lg:block">
                    <ul class="menu menu-horizontal">
                        <!-- Navbar menu content here -->
                        <li v-for="i in navItems.filter((i) => i.canShow())">
                            <NuxtLink :to="i.path">
                                <icon :name="i.icon" class="size-4"></icon>
                                <p class="text-sm">{{ i.name }}</p>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const sleekConfig = useAppConfig().sleek;
const navItems = [{ icon: "material-symbols:newspaper-rounded", name: "Blog", path: "/articles", canShow: () => true }];
</script>

<style lang="css" scoped>
.iconify {
    @apply size-6;
}
</style>
