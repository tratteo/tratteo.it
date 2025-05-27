<template>
    <div class="flex flex-col items-center w-full gap-12 self-center mb-16">
        <header class="flex lg:flex-row flex-col items-center lg:items-start justify-center w-full gap-16">
            <div class="relative overflow-visible">
                <p class="absolute font-bold text-5xl left-0 top-0">I build cool stuff!</p>
                <div class="relative">
                    <img src="/bg.webp" alt="" class="z-[-1] mt-8 w-[32rem]" />
                    <div class="absolute inset-0 mask z-[10]"></div>
                </div>
            </div>
            <div class="flex flex-col items-stretch gap-6">
                <div class="flex items-start justify-center flex-row gap-4">
                    <div class="flex flex-col items-center gap-2">
                        <div class="avatar">
                            <div class="w-[6rem] sm:w-[8rem] rounded-full border-2 shadow-md border-primary overflow-hidden relative">
                                <Transition name="crossfade" mode="in-out">
                                    <img :key="currentAction.index" :style="{ '--duration-tr': '800ms' }" alt="Trat" :src="currentAction.action.src" />
                                </Transition>
                            </div>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <label class="flex items-center gap-2 text-sm">
                                <icon name="twemoji:flag-italy" class="size-5"></icon>
                                <p class="opacity-75">Italy</p>
                            </label>
                        </div>
                    </div>
                    <div class="chat chat-start gap-1 w-full md:min-w-[20rem]">
                        <div class="chat-header">
                            <div class="flex flex-row items-center gap-0">
                                <p>When I'm not&nbsp;</p>
                                <Transition name="join" mode="out-in">
                                    <p :key="currentAction.action.name" :style="{ '--y-tr': '4px', '--duration-tr': '400ms' }" class="font-bold">
                                        {{ currentAction.action.name }}
                                    </p>
                                </Transition>
                            </div>
                        </div>
                        <div class="chat-bubble chat-bubble-primary">I ship products like a madman.</div>
                        <div class="chat-footer">
                            <ClientOnly>
                                <time class="text-xs opacity-50">{{ fns.format(currentAction.date, "HH:mm:ss") }}</time>
                            </ClientOnly>
                        </div>
                    </div>
                </div>
                <div class="card card-compact shadow bg-base-300">
                    <div class="card-body">
                        <div class="card-title justify-between flex-wrap gap-4">
                            Let's get in touch <CopyableText class="text-sm text-nowrap" :content="sleekConfig.email"></CopyableText>
                        </div>
                        <p class="opacity-60 text-sm">What, are you afraid 🤔?</p>

                        <div class="flex flex-row items-start gap-2">
                            <a :href="s.url" target="_blank" v-for="s in sources.socials ?? []" class="btn btn-square btn-ghost btn-sm" :title="s.name">
                                <icon class="size-5" :name="s.icon.name"></icon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <FadeScroll>
            <section>
                <h3>My Experience</h3>
                <div class="flex flex-col md:flex-row items-stretch gap-4 w-full justify-start">
                    <div class="stat-card">
                        <div class="card-body">
                            <div class="card-title"><SolidIcon name="fluent:hat-graduation-12-filled" class="text-success bg-success"></SolidIcon>Education</div>
                            <div class="flex flex-col items-start gap-2">
                                <div class="flex items-center gap-4 justify-between w-full">
                                    <div class="form-control">
                                        <p>Master of Science</p>
                                        <p class="text-sm opacity-75">
                                            <a href="https://www.unitn.it/" target="_blank" class="link link-success link-hover"> University of Trento</a>
                                        </p>
                                    </div>
                                    <div class="form-control text-end">
                                        <p>Computer Science</p>
                                        <p class="info">110/110 cum laude</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 justify-between w-full">
                                <div class="flex items-center gap-4 justify-between w-full">
                                    <div class="form-control">
                                        <p>Bachelor of Science</p>
                                        <p class="text-sm opacity-75">
                                            <a href="https://www.uniroma1.it/" target="_blank" class="link link-success link-hover"> University of Roma. La Sapienza</a>
                                        </p>
                                    </div>
                                    <div class="form-control text-end">
                                        <p>Computer Engineering</p>
                                        <p class="info">110/110 cum laude</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="card-body">
                            <div class="card-title"><SolidIcon name="material-symbols:work-update" class="text-purple-500 bg-purple-500"></SolidIcon>Work Experience</div>
                            <div class="flex flex-col gap-1">
                                <div class="flex items-center gap-4 justify-between w-full">
                                    <div class="form-control">
                                        <p>Solo Founder and Creator</p>
                                        <p class="text-sm opacity-75"></p>
                                    </div>
                                    <div class="form-control text-end">
                                        <p>@ Myself</p>
                                    </div>
                                </div>
                                <p class="text-sm opacity-50">
                                    Freelance consultancy, fullstack development and shipping of solo products, from SaaS platforms to mobile applications.
                                </p>
                            </div>
                            <div class="flex flex-col gap-1">
                                <div class="flex items-center gap-4 justify-between w-full">
                                    <div class="form-control">
                                        <p>Lead Developer & Technical Manager</p>
                                        <p class="text-sm opacity-75"></p>
                                    </div>
                                    <div class="form-control text-end">
                                        <p>@ Mentally.ai</p>
                                    </div>
                                </div>
                                <p class="text-sm opacity-50">
                                    Development, management and coordination of all technical aspects of the company. Comprehension and translation of business requirements into
                                    projects.
                                </p>
                            </div>
                            <div class="flex flex-col gap-1">
                                <div class="flex items-center gap-4 justify-between w-full">
                                    <div class="form-control">
                                        <p>System Engineer</p>
                                    </div>
                                    <div class="form-control text-end">
                                        <p>@ <a href="https://www.leonardo.com" target="_blank" class="link text-purple-500 link-hover">Leonardo S.p.A</a></p>
                                    </div>
                                </div>
                                <p class="text-sm opacity-50">Development of simulation systems for Aerospace & Defense.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FadeScroll>
        <FadeScroll>
            <section>
                <h3>My Services</h3>
                <div class="services-grid">
                    <div v-for="s in services" class="item">
                        <div class="card-body">
                            <div class="card-title"><SolidIcon :name="s.icon" class="text-primary bg-primary"></SolidIcon> {{ s.title }}</div>
                            <p class="description">
                                {{ s.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </FadeScroll>
        <FadeScroll>
            <section>
                <h3>These are my creations, my products</h3>
                <div class="services-grid">
                    <a
                        v-for="p in sortedProjects"
                        class="card-compact cursor-pointer image-full select-none shadow group relative card card-bordered border-base-content/20 w-full overflow-clip"
                        :href="p.url ?? '/'"
                        target="_blank"
                    >
                        <img
                            v-if="p.thumbnail"
                            :src="p.thumbnail"
                            class="z-[-1] group-hover:scale-[106%] ease-out transition-transform duration-[300ms] object-cover absolute w-full h-full opacity-15"
                            :alt="p.title"
                        />
                        <div class="card-body">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="avatar">
                                    <div class="w-16 rounded-xl">
                                        <img :src="p.icon" :alt="p.title" />
                                    </div>
                                </div>
                                <div class="flex flex-col items-start gap-1">
                                    <p class="card-title">{{ p.title }}</p>
                                    <div
                                        class="flex items-center gap-2 px-2 py-1 rounded-btn border border-transparent transition-all duration-300 ease-out"
                                        :class="classesFromStatus(p.status)"
                                    >
                                        <icon :name="iconFromStatus(p.status)"></icon>
                                        <p class="text-sm font-semibold">{{ capitalize(p.status) }}</p>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm">{{ p.description }}</p>
                            <div class="card-side">
                                <p v-for="l in p.links" :href="l.url" class="btn btn-ghost btn-square btn-sm" target="_blank"><icon class="size-6" :name="l.icon"></icon></p>
                            </div>
                            <div class="card-actions justify-end">
                                <div v-for="t in p.tags" class="badge badge-primary">{{ t }}</div>
                            </div>
                        </div>
                        <div class="absolute top-4 right-4">
                            <icon
                                name="material-symbols:arrow-outward-rounded"
                                class="group-hover:translate-x-2 group-hover:-translate-y-2 duration-[300ms] ease-out transition-transform"
                            ></icon>
                        </div>
                    </a>
                </div>
            </section>
        </FadeScroll>
        <FadeScroll>
            <section>
                <img src="/icons/minecraft_logo.svg" alt="Minecraft logo" class="h-40 self-center" />
                <div ref="minecraftCardEl" class="relative h-fit w-full">
                    <img src="/icons/creeper.png" class="creeper" :style="{ '--x-tr': creeperTrs.x, '--y-tr': creeperTrs.y }" alt="Minecraft creeper" />
                    <NuxtLink
                        href="/minecraft-mods"
                        class="card z-[4] relative min-h-[10rem] cursor-pointer card-bordered border-base-content/20 shadow group flex flex-col items-stretch gap-4 w-full rounded-box overflow-clip"
                    >
                        <div class="card-body">
                            <h3 class="m-0">Are you here for my Minecraft mods?</h3>
                            <p>Got a dedicated page for that 😎</p>
                        </div>

                        <div class="absolute w-full h-full opacity-75 bg-base-300 z-[-1]"></div>
                        <div class="absolute top-4 right-4">
                            <icon
                                name="material-symbols:arrow-outward-rounded"
                                class="group-hover:translate-x-2 group-hover:-translate-y-2 duration-[300ms] ease-out transition-transform"
                            ></icon>
                        </div>
                        <img
                            src="/thumbnails/minecraft.jpeg"
                            class="z-[-2] group-hover:scale-[104%] ease-out transition-transform duration-[300ms] object-cover absolute w-full h-full"
                            alt="Minecraft thumbnail"
                        />
                    </NuxtLink>
                </div>
            </section>
        </FadeScroll>
    </div>
</template>

<script lang="ts" setup>
import * as fns from "date-fns";
import sources from "~/assets/sources.json";
import projects from "~/data/projects.json";
import sleekConfig from "~/sleek.config";

interface ProjectStatus {
    status: string;
}
const statusPriority: Record<string, number> = {
    shipped: 1,
    validating: 2,
    archived: 3,
};
const minecraftCardEl = ref();
const creeperTrs = ref<{ x: number | string; y: number | string }>({ x: 0, y: 0 });
const services = [
    {
        title: "ICT Business Consultancy",
        description:
            "Transform your business through strategic technology planning and digital transformation guidance. Align your tech investments with business goals to maximize ROI and competitive advantage.",
        icon: "material-symbols:business-center-rounded",
    },
    {
        title: "Software Development",
        description:
            "Full-stack development across all platforms - mobile, web, desktop, and embedded systems. 360° software solutions from concept to deployment, tailored to your specific needs and industry requirements.",
        icon: "material-symbols:code-rounded",
    },
    {
        title: "Coaching and Tutoring",
        description:
            "Accelerate your programming skills and technical knowledge through personalized mentoring and hands-on guidance. Master new technologies faster with expert support tailored to your learning style.",
        icon: "flowbite:person-chalkboard-solid",
    },
    {
        title: "MVP Development",
        description:
            "Rapidly validate your business ideas with lean, focused minimum viable products that test core assumptions. Get to market quickly while minimizing risk and development costs.",
        icon: "material-symbols:bolt-rounded",
    },
    {
        title: "SEO Consultancy",
        description:
            "Boost your online visibility and organic traffic through strategic search engine optimization and technical improvements. Drive qualified leads and increase revenue with data-driven SEO strategies.",
        icon: "material-symbols:area-chart-outline-rounded",
    },
    {
        title: "Strategic Optimization",
        description:
            "Enhance your existing systems, processes, and digital assets for peak performance and efficiency. Identify bottlenecks and implement solutions that scale with your business growth.",
        icon: "lineicons:target-revenue",
    },
];
const actions = [
    { name: "Diving 🌊", src: "/avatar/trat_dive.webp" },
    { name: "Climbing 🧗‍♂️", src: "/avatar/trat_climb.webp" },
    { name: "Skiing ❄️", src: "/avatar/trat_ski.webp" },
    { name: "Hiking 🏔️", src: "/avatar/trat_hike.webp" },
    { name: "Sleeping 💤", src: "/icon.webp" },
    { name: "Training 🤸‍♂️", src: "/avatar/trat_train.webp" },
];
const currentAction = ref<{ action: any; date: Date; index: number }>({ action: actions[0], date: new Date(), index: 0 });

function updateAction() {
    const index = (currentAction.value.index + 1) % actions.length;
    currentAction.value = { action: actions.at(index), date: new Date(), index: index };
    setTimeout(updateAction, Math.random() * 2000 + 2000);
}
function creeperPeak() {
    const width = (minecraftCardEl.value?.getBoundingClientRect()?.width ?? 128) - 64;
    creeperTrs.value = { x: `${Math.random() * width}px`, y: "-64px" };
    setTimeout(() => {
        creeperTrs.value = { x: creeperTrs.value.x, y: 0 };
        setTimeout(creeperPeak, Math.random() * 3000 + 1500);
    }, Math.random() * 3000 + 1000);
}
onMounted(() => {
    updateAction();
    setTimeout(creeperPeak, 1000);
});
const sortedProjects = computed(() => sortByStatus(projects.projects));

function sortByStatus<T extends ProjectStatus>(items: T[]): T[] {
    return [...items].sort((a, b) => {
        return statusPriority[a.status] - statusPriority[b.status];
    });
}
function iconFromStatus(status: string): string {
    switch (status) {
        case "archived":
            return "bx:bxs-archive";
        case "validating":
            return "emojione:eyes";
        case "shipped":
            return "streamline-emojis:rocket";
    }
    return "fxemoji:bolt";
}
function classesFromStatus(status: string): string[] {
    switch (status) {
        case "archived":
            return ["bg-error/15", "group-hover:border-error"];
        case "validating":
            return ["bg-warning/15", "group-hover:border-warning"];
        case "shipped":
            return ["bg-success/15", "group-hover:border-success"];
    }
    return ["bg-success/15", "border-success"];
}
useSeoMeta({
    description: "I fired myself from everywhere to become my own boss and build stuff that I love.",
});
defineOgImageComponent("OgImageDefault", { avatarUrl: "/web-app-manifest-512x512.png", subtitle: "I am building cool stuff 😎" });
</script>

<style lang="css" scoped>
.stat-card {
    @apply w-full card card-bordered card-compact md:card-normal border-base-content/20;
    .card-body {
        @apply gap-4;
    }
    .info {
        @apply text-sm text-success font-bold opacity-75;
    }
}
.mask {
    background-image: linear-gradient(to top, theme("colors.base-100") 0%, transparent 25%);
}
@screen md {
    .services-grid {
        grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr)) !important; /* Creates responsive columns */
    }
}
.services-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr)); /* Creates responsive columns */
    gap: 16px; /* Adjust the gap between grid items */
    @apply grid w-full;
    .item {
        @apply card card-bordered card-compact border-base-content/20 hover:border-primary/75 transition-all duration-200 ease-out cursor-pointer;
        .card-title {
            @apply text-base font-bold;
        }
        .description {
            @apply text-sm opacity-50;
        }
    }
}
section {
    @apply flex flex-col items-start gap-4 w-full;
}
.attribution {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
    @apply absolute bottom-[-4px] group-hover:bottom-0 w-full bg-opacity-20 group-hover:opacity-100 opacity-0 pb-4 pt-6 rounded-t-btn rounded-b-box text-base-content transition-all duration-300 ease-out;
}
.faded-image {
    -webkit-mask-image: radial-gradient(circle at center, theme("colors.base-100") 50%, transparent 70%);
    mask-image: radial-gradient(circle at center, theme("colors.base-100") 50%, transparent 70%);
}
.creeper {
    @apply z-[3] absolute w-16 left-[var(--x-tr)] top-[8px] cursor-grab transition-transform duration-[500ms] ease-out  translate-y-[var(--y-tr)];
}
.creeper:hover {
    @apply shake;
}
@keyframes shake {
    0%,
    100% {
        scale: 1;
        rotate: 0deg;
        opacity: 1;
    }
    25% {
        scale: 0.97;
        rotate: -1deg;
        opacity: 0.95;
    }
    75% {
        scale: 0.97;
        rotate: 1deg;
        opacity: 0.95;
    }
}
.shake {
    animation: shake 0.1s ease-in-out infinite;
    transform-style: preserve-3d;
}
</style>
