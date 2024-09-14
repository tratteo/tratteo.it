<template>
    <footer class="footer footer-center bg-base-300 text-base-content p-4 text-opacity-70">
        <div class="flex flex-row items-stretch w-full justify-stretch flex-wrap gap-8">
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
            <div class="flex-1 flex flex-row md:justify-evenly justify-between flex-wrap gap-4">
                <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">SUPPORT ME</p>
                    <div class="section-col">
                        <a
                            v-for="link in sleekConfig.supportLinks"
                            :href="link.url"
                            :aria-label="`Support me on ${link.name}`"
                            target="_blank"
                            class="flex flex-row items-center gap-1 link-hover"
                        >
                            <icon :name="link.icon" class="size-4"></icon>
                            <p>{{ link.name }}</p>
                        </a>
                    </div>
                </div>
                <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">OTHER APPS</p>
                    <div class="section-col">
                        <div v-for="p in sleekConfig.linkedProjects">
                            <a :href="p.url" target="_blank" class="link-hover">
                                <p>{{ p.title }}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex flex-col items-start gap-2">
                    <p class="font-bold">LEGAL</p>
                    <div class="section-col">
                        <NuxtLink to="/privacy" class="link-hover">
                            <p>Privacy Policy</p>
                        </NuxtLink>
                    </div>
                </div> -->
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const sleekConfig = useAppConfig().sleek;
</script>

<style lang="css" scoped>
.section-col {
    @apply flex flex-col items-start gap-1 text-xs;
}
</style>
