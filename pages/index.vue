<template>
    <div v-if="mounted" class="flex flex-col xl:flex-row items-stretch w-full gap-8">
        <div class="xl:flex-[1] flex flex-col gap-2 items-stretch xl:items-start">
            <div class="avatar">
                <div class="w-[12rem] rounded-full ring-primary ring-2">
                    <img :src="sleekConfig.icon" />
                </div>
            </div>
            <section class="flex flex-col items-stretch xl:items-start gap-2 xl:gap-4 xl:w-full">
                <h2 class="m-0 font-bold">Matteo Beltrame</h2>
                <div class="flex flex-row gap-8">
                    <div class="flex flex-row items-center gap-2 justify-start">
                        <icon name="twemoji:flag-italy"></icon>
                        <p>Italy</p>
                    </div>
                    <button
                        @click="
                            () => {
                                clipboard.copy('bltmtt@gmail.com');
                                toast.add({
                                    type: ToastType.success,
                                    durationMs: 2000,
                                    message: 'Email copied, hit me up! 📬',
                                });
                            }
                        "
                        class="flex cursor-pointer flex-row items-center gap-2 justify-start"
                    >
                        <icon name="material-symbols:mail-rounded"></icon>
                        <p class="underline">bltmtt@gmail.com</p>
                    </button>
                </div>
                <div class="card bg-primary/15 card-compact self-center xl:self-auto">
                    <div class="card-body italic flex flex-row items-center group select-none">
                        <icon
                            name="ic:baseline-format-quote"
                            class="rotate-180 mb-8 group-hover:text-primary transition-all duration-200 group-hover:scale-110"
                        ></icon>
                        <p class="transition-all duration-200 group-hover:scale-[102%]">
                            Don't do it just for the goal, do it for the person you need to embody to achieve the goal
                        </p>
                        <icon
                            name="ic:baseline-format-quote"
                            class="mt-8 group-hover:text-primary transition-all duration-200 group-hover:scale-110"
                        ></icon>
                    </div>
                </div>

                <div class="flex flex-row items-center justify-center gap-8 my-2">
                    <div class="tooltip" data-tip="LinkedIn">
                        <a href="https://www.linkedin.com/in/matteo-beltrame" target="_blank">
                            <icon class="social-icon" name="skill-icons:linkedin"></icon>
                        </a>
                    </div>
                    <div class="tooltip" data-tip="Github">
                        <a href="https://github.com/tratteo" target="_blank">
                            <icon class="social-icon" name="mdi:github"></icon>
                        </a>
                    </div>
                    <div class="tooltip" data-tip="Instagram">
                        <a href="https://www.instagram.com/tratteo" target="_blank">
                            <icon class="social-icon" name="skill-icons:instagram"></icon>
                        </a>
                    </div>
                    <div class="tooltip" data-tip="Buy Me A Coffee">
                        <a href="https://www.buymeacoffee.com/tratteo" target="_blank">
                            <icon class="social-icon" name="fluent-emoji-flat:kiwi-fruit"></icon>
                        </a>
                    </div>
                    <div class="tooltip" data-tip="Product Hunt">
                        <a href="https://www.producthunt.com/@tratteo" target="_blank">
                            <icon class="social-icon" name="logos:producthunt"></icon>
                        </a>
                    </div>
                </div>
                <Accordion>
                    <template #title>
                        <p>✏️ Something about me</p>
                    </template>
                    <template #content>
                        <p class="text-sm">
                            My path began in a pretty standard way. I studied Computer Engineering and then Computer
                            Science. <br />
                            I easily landed a job in a big corporate months before graduating, I was excited and happy
                            to be thrown into the real world. However, my expectation were actually in conflict with my
                            nature.<br /><br />
                            Since the first day at my new job, I felt
                            <b
                                >something was off, things were not as I imagined, suddenly I did not felt the
                                protagonist of my own life anymore</b
                            >.<br />
                            After less than 3 months, I got offered an important remote position in an American startup,
                            I immediately quitted my corporate job and grasped this opportunity.
                            <b
                                >This new job was better aligned with my identity, yet I still felt something was
                                missing.</b
                            ><br /><br />
                            During this period, I founded the startup
                            <a href="https://wildspace.it?locale=en" target="_blank" class="link">wildspace.it</a> with
                            a close friend of mine.<br />
                            This was the spark that I needed:
                            <b
                                >I understood that my path was different, I wanted to live a life at its fullest, I
                                wanted to be the main protagonist of my life.</b
                            ><br />
                            <span class="font-bold text-secondary"
                                >For the second time in less than a year, I decided to quit my job to dedicate all my
                                time to my startup, to what I have created and to what I will create in the
                                future.</span
                            >
                        </p>
                    </template>
                </Accordion>
            </section>
        </div>
        <div class="xl:flex-[2] flex flex-col gap-4">
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
                                    <div v-html="p.title"></div>
                                    <div
                                        v-if="
                                            (p as any).date &&
                                            new Date().getTime() -
                                                fns.parse((p as any).date, 'dd/MM/yyyy', new Date()).getTime() <
                                                8.6e7 * 31
                                        "
                                    >
                                        <div class="badge badge-accent">NEW</div>
                                    </div>
                                </h2>
                                <p class="text-sm" v-html="p.description"></p>
                                <div class="card-side"></div>
                                <div class="card-actions justify-end">
                                    <div v-for="t in (p as any).tags ?? []" class="badge badge-primary">{{ t }}</div>
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
const clipboard = useClipboard();
const toast = useToast();
const openedSection = ref<number>(0);
const mounted = useMounted();
const sleekConfig = useAppConfig().sleek;
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
