<template>
    <footer class="footer footer-center bg-base-300 text-base-content p-4">
        <div class="flex flex-row items-stretch w-full justify-stretch flex-wrap gap-4">
            <div class="flex flex-row items-start gap-2">
                <div class="avatar">
                    <div class="w-10 rounded-full">
                        <img :src="sleekConfig.icon" />
                    </div>
                </div>
                <p class="text-sm text-start">
                    {{ sleekConfig.name }} - {{ new Date().getFullYear() }} <br />
                    All right reserved by
                    <a :href="sleekConfig.author.website" class="link" target="_blank">{{ sleekConfig.author.name }}</a>
                </p>
            </div>
            <div class="flex-1 flex flex-row justify-evenly flex-wrap">
                <div class="flex flex-col items-center gap-0">
                    <p>Support me ❤️</p>
                    <div class="flex flex-col items-center">
                        <ul class="self-center menu bg-transparent menu-horizontal rounded-box items-center">
                            <li v-for="link in sleekConfig.supportLinks">
                                <a :href="link.url" :aria-label="`Support me on ${link.name}`" target="_blank">
                                    <icon :name="link.icon" class="size-4"></icon>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-col items-start">
                    <p class="font-bold opacity-60">OTHER APPS</p>
                    <div v-for="p in sleekConfig.linkedProjects">
                        <a :href="p.url" target="_blank" class="link-hover">
                            <p>{{ p.title }}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const sleekConfig = useAppConfig().sleek;
</script>

<style></style>
