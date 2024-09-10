<template>
    <div class="flex flex-col xl:flex-row items-stretch w-full gap-8 xl:gap-0">
        <div class="xl:flex-[1] flex flex-col gap-2 items-start px-4">
            <div class="avatar">
                <div class="w-[12rem] rounded-full">
                    <img src="/trat.webp" />
                </div>
            </div>
            <section class="flex flex-col items-start gap-2">
                <h2 class="m-0 font-bold">Matteo Beltrame</h2>
                <div class="flex flex-row gap-8">
                    <div class="flex flex-row items-center gap-2 justify-start">
                        <icon name="twemoji:flag-italy"></icon>
                        <p>Italy</p>
                    </div>
                    <div class="flex flex-row items-center gap-2 justify-start">
                        <icon name="material-symbols:mail-rounded"></icon>
                        <p>bltmtt@gmail.com</p>
                    </div>
                </div>
                <p class="italic text-secondary">Do it to be the kind of person you need to be to achieve your goal</p>
                <div class="flex flex-row items-center justify-center gap-8 my-2">
                    <a href="https://www.linkedin.com/in/matteo-beltrame" target="_blank"
                        ><icon class="social-icon" name="skill-icons:linkedin"></icon
                    ></a>
                    <a href="https://github.com/tratteo" target="_blank"
                        ><icon class="social-icon" name="mdi:github"></icon
                    ></a>
                    <a href="https://www.instagram.com/tratteo" target="_blank"
                        ><icon class="social-icon" name="skill-icons:instagram"></icon
                    ></a>
                </div>
            </section>
        </div>
        <div class="xl:flex-[2] flex flex-col gap-4 px-4">
            <div class="flex flex-row items-center justify-between gap-2 flex-wrap">
                <h3>Check out what I have been creating 👇</h3>
                <p>{{ projectsCount }} published projects 😎</p>
            </div>
            <div v-for="(s, key, index) in projectsData" class="collapse collapse-arrow bg-base-300">
                <input
                    type="radio"
                    @click="() => openSection(index)"
                    name="sections_accordion"
                    class="cursor-pointer"
                    :checked="openedSection === index"
                />
                <div class="collapse-title flex flex-row gap-2">
                    <icon :name="s.icon" :class="{ 'text-primary': openedSection === index }"></icon>
                    <p>{{ key }}</p>
                </div>
                <div
                    class="collapse-content flex flex-row items-stretch justify-center xl:justify-start flex-wrap gap-8"
                >
                    <div
                        v-for="p in s.projects"
                        class="card card-compact bg-neutral w-64 md:w-[20rem] shadow-xl cursor-pointer hover:scale-[102%] transition-all duration-150"
                    >
                        <a :href="p.url" target="_blank">
                            <div class="card-body">
                                <h2 class="card-title">
                                    <div class="avatar">
                                        <div class="w-12 rounded-full">
                                            <img :src="p.icon" />
                                        </div>
                                    </div>
                                    <div>
                                        {{ p.title }}
                                        <p
                                            class="text-sm text-primary font-thin"
                                            v-if="(p as any).role"
                                            v-html="(p as any).role"
                                        ></p>
                                    </div>
                                    <div
                                        v-if="
                                            (p as any).date &&
                                            new Date().getTime() -
                                                fns.parse((p as any).date, 'dd/MM/yyyy', new Date()).getTime() <
                                                8.6e7 * 31
                                        "
                                    >
                                        <div class="badge badge-secondary">NEW</div>
                                    </div>
                                </h2>
                                <p class="text-sm" v-html="p.description"></p>
                                <div class="card-side"></div>
                                <div class="card-actions justify-end">
                                    <div v-for="t in (p as any).tags ?? []" class="badge badge-accent">{{ t }}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as fns from "date-fns";
import projectsData from "~/data/projects.json";

const openedSection = ref<number>(0);

const projectsCount = computed(() => {
    let count = 0;
    Object.values(projectsData).forEach((v) => (count += v.projects.length));
    return count;
});

function openSection(index: number) {
    if (openedSection.value === index) {
        openedSection.value = -1;
    } else {
        openedSection.value = index;
    }
}
</script>

<style lang="css" scoped>
.social-icon {
    @apply grayscale hover:grayscale-0 transition-all duration-150 hover:scale-110;
}
</style>
