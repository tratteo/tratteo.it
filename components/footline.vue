<template>
    <footer class="footer footer-center bg-base-200 text-base-content p-4">
        <div class="flex flex-col">
            <div>
                <p>Support me</p>
                <ul class="self-center menu bg-base-200 menu-horizontal rounded-box items-center">
                    <li v-for="link in sleekConfig.supportLinks">
                        <a :href="link.url" :aria-label="`Support me on ${link.name}`" target="_blank">
                            <icon :name="link.icon" class="size-4"></icon>
                        </a>
                    </li>
                </ul>
            </div>
            <p class="text-sm">
                {{ sleekConfig.name }} - {{ new Date().getFullYear() }} - All right reserved by
                {{ sleekConfig.author }}
            </p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const sleekConfig = useAppConfig().sleek;
</script>

<style></style>
