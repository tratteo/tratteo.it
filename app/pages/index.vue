<template>
    <div class="flex flex-col items-center w-full mt-8 gap-32 self-center mb-16">
        <header class="flex flex-row flex-wrap items-start justify-center w-full gap-16">
            <div class="relative overflow-visible">
                <p class="absolute font-bold text-5xl left-0 top-0 text-highlighted!">I solve problems.</p>
                <div class="relative">
                    <img src="/bg.webp" alt="" class="z-[-1] mt-20 md:mt-8 w-[32rem]" />
                    <div class="absolute inset-0 mask z-[10]"></div>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-stretch gap-6">
                <div class="flex items-center justify-center flex-row gap-4">
                    <div class="flex flex-col items-center gap-2">
                        <div class="relative size-18 rounded-full overflow-clip">
                            <Transition name="crossfade" mode="in-out">
                                <img :key="currentAction.index" :style="{ '--duration-tr': '800ms' }" alt="Trat" :src="currentAction.action.src" />
                            </Transition>
                        </div>
                    </div>
                    <div class="gap-1 w-full md:min-w-[20rem]">
                        <div class="flex flex-row items-center gap-0">
                            <p>But usually I'm&nbsp;</p>
                            <Typewriter :text="currentAction.action.name" class="font-bold" :typing-speed="20"> </Typewriter>
                        </div>

                        <div>
                            <ClientOnly>
                                <time class="text-xs opacity-50">{{ fns.format(currentAction.date, "HH:mm:ss") }}</time>
                            </ClientOnly>
                        </div>
                    </div>
                </div>
                <u-card variant="subtle">
                    <u-form class="w-full flex flex-col gap-2">
                        <u-input placeholder="Describe your need, I am sure i will help you!" v-model="query" :maxlength="100"></u-input>
                        <StickyElement :amplitude="16" class="ml-auto">
                            <u-button @click="askNeed" class="group" type="submit"><AnimatedArrow>Ask!</AnimatedArrow> </u-button>
                        </StickyElement>
                    </u-form>
                    <u-separator> Need something more specific?</u-separator>
                    <div class="flex flex-col gap-2">
                        <p class="typ-label">Let's get in touch, you can write me at any hour (almost).</p>
                        <CopyableText class="text-sm text-nowrap" :content="appMeta.author.email"></CopyableText>
                    </div>
                    <div class="flex flex-row items-start gap-2">
                        <u-button :to="s.url" target="_blank" :icon="s.icon.name" color="neutral" v-for="s in sources.socials ?? []" class="" variant="ghost" :title="s.name">
                        </u-button>
                    </div>
                </u-card>
                <Modal
                    v-if="mounted"
                    ref="servicesModalEl"
                    :title="
                        (
                            arg:
                                | FuseResult<{
                                      title: string;
                                      description: string;
                                      icon: string;
                                  }>[]
                                | undefined
                        ) => (arg !== undefined && arg.length > 0 ? `I have found ${arg.length} services for you!` : `Let's talk about it!`)
                    "
                    :description="
                        (
                            arg:
                                | FuseResult<{
                                      title: string;
                                      description: string;
                                      icon: string;
                                  }>[]
                                | undefined
                        ) =>
                            arg !== undefined && arg.length > 0
                                ? 'You can write me indicating which service you are interested in.'
                                : `Write me an email with your need and we will find a solution for it!`
                    "
                    :ui-box-variants="{ content: 'max-w-3xl' }"
                >
                    <template
                        #body="{
                            arg,
                        }: {
                            arg:
                                | FuseResult<{
                                      title: string;
                                      description: string;
                                      icon: string;
                                  }>[]
                                | undefined;
                        }"
                    >
                        <ul v-if="arg" class="flex flex-col items-stretch gap-4">
                            <li v-for="a in arg">
                                <div class="flex flex-col gap-2">
                                    <div class="flex items-center gap-2 text-default!"><OutlinedIcon :icon-name="a.item.icon"></OutlinedIcon> {{ a.item.title }}</div>
                                    <p class="typ-label">
                                        {{ a.item.description }}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template #footer>
                        <div class="flex flex-col items-start gap-2 w-full">
                            Hit me up, I will answer as soon as possible 🫡
                            <CopyableText class="text-sm text-nowrap" :content="appMeta.author.email"></CopyableText>
                        </div>
                    </template>
                </Modal>
            </div>
        </header>

        <AnimateEnter :stagger-children="0">
            <section>
                <h3 class="typ-subtitle">My Experience</h3>
                <div class="flex flex-col md:flex-row items-stretch gap-4 w-full justify-start">
                    <Motion :variants="item" class="flex-1">
                        <u-card class="h-full" variant="subtle">
                            <div class="flex items-center gap-2 font-bold">
                                <OutlinedIcon icon-name="fluent:hat-graduation-12-filled" class="text-primary"></OutlinedIcon>Education
                            </div>
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col items-stretch gap-2">
                                    <div class="flex items-start gap-2 justify-between">
                                        <div class="flex flex-col">
                                            <p>Master of Science, Computer Science</p>
                                            <p class="text-sm">
                                                <u-link href="https://www.unitn.it/" target="_blank"> University of Trento</u-link>
                                            </p>
                                        </div>
                                        <u-badge label="110/110 cum laude" color="primary" variant="soft"></u-badge>
                                    </div>
                                    <div class="flex items-start gap-1">
                                        <icon name="material-symbols:book-2-rounded"></icon>
                                        <p class="typ-label">EQDR: Elite Quantum Diffusion Recombination Operator</p>
                                    </div>
                                    <p class="typ-sublabel">
                                        Devising a novel quantum recombination operator for a Genetic Quantum Optimization algorithm to extend Grover quantum search algorithm to
                                        fitness based real world optimization problems.
                                    </p>
                                </div>
                                <u-separator></u-separator>
                                <div class="flex flex-col items-stretch gap-2">
                                    <div class="flex items-start gap-2 justify-between">
                                        <div class="flex flex-col">
                                            <p>Bachelor of Science, Computer Engineering</p>
                                            <p class="text-sm">
                                                <u-link href="https://www.uniroma1.it/" target="_blank"> University of Roma. La Sapienza</u-link>
                                            </p>
                                        </div>
                                        <u-badge label="110/110 cum laude" color="primary" variant="soft"></u-badge>
                                    </div>
                                    <div class="flex items-start gap-1">
                                        <icon name="material-symbols:book-2-rounded"></icon>
                                        <p class="typ-label">EnNEAT: An Enhanced Neuroevolution of Augmenting Topologies algorithm</p>
                                    </div>
                                    <p class="typ-sublabel">
                                        Combining DGAs (Dynamic Genetic Algorithms) and the Neuroevolution of Augmenting Topologies algorithm NEAT in a novel and enhanced
                                        unsupervised learning algorithm.
                                    </p>
                                </div>
                            </div>
                        </u-card>
                    </Motion>
                    <Motion :variants="itemReverse" class="flex-1">
                        <u-card class="h-full" variant="subtle">
                            <div class="flex items-center gap-2 font-bold">
                                <OutlinedIcon icon-name="material-symbols:work-update" class="text-primary"></OutlinedIcon>Experience
                            </div>
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-4 justify-between w-full">
                                        <p>Strategic and technical consultancy</p>
                                        <u-badge variant="soft" label="Freelancing"></u-badge>
                                    </div>
                                    <p class="typ-sublabel">Strategic, technical and development consultancy.</p>
                                </div>
                                <u-separator></u-separator>
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-4 justify-between w-full">
                                        <p>Solo Founder and Creator</p>
                                        <u-badge variant="soft" label="Entrepreneur"></u-badge>
                                    </div>
                                    <p class="typ-sublabel">Fullstack development and shipping of multiple products, from SaaS platforms to mobile applications.</p>
                                </div>
                                <u-separator></u-separator>
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-4 justify-between w-full">
                                        <p>Lead Developer & Chief Technical Manager</p>
                                        <u-badge variant="soft" label="@Mentally.ai"></u-badge>
                                    </div>
                                    <p class="typ-sublabel">
                                        Development, management and coordination of all technical aspects of the company. Comprehension and translation of business requirements
                                        into projects.
                                    </p>
                                </div>
                                <u-separator></u-separator>
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-4 justify-between w-full">
                                        <p>System Engineer</p>
                                        <u-badge variant="soft" label="@Leonardo S.p.A"></u-badge>
                                    </div>
                                    <p class="typ-sublabel">Development of simulation systems for Aerospace & Defense.</p>
                                </div>
                            </div>
                        </u-card>
                    </Motion>
                </div>
            </section>
        </AnimateEnter>

        <AnimateEnter>
            <section>
                <h3 class="typ-subtitle">My Services</h3>
                <div class="services-grid">
                    <motion.div :variants="itemVertical" v-for="s in services">
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2"><OutlinedIcon :icon-name="s.icon" class="text-primary"></OutlinedIcon> {{ s.title }}</div>
                            <p class="typ-label">
                                {{ s.description }}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </AnimateEnter>

        <AnimateEnter>
            <section>
                <h3 class="typ-subtitle">These are my creations, my products</h3>
                <div class="services-grid">
                    <motion.a :variants="itemVertical" :href="p.url ?? '/'" v-for="p in sortedProjects">
                        <u-card
                            class="cursor-pointer image-full select-none group relative w-full overflow-clip h-full"
                            :href="p.url ?? '/'"
                            target="_blank"
                            :ui="{ body: 'h-full' }"
                        >
                            <img
                                v-if="p.thumbnail"
                                :src="p.thumbnail"
                                class="z-[0] left-0 top-0 group-hover:scale-[106%] ease-out transition-transform duration-[300ms] object-cover absolute w-full h-full opacity-15"
                                :alt="p.title"
                            />
                            <div class="flex-1 z-[1] flex flex-col gap-2">
                                <div class="flex items-center gap-2 mb-4">
                                    <u-avatar :src="p.icon" :alt="p.title" size="xl"></u-avatar>
                                    <div class="flex flex-col items-start gap-1">
                                        <p class="flex items-center gap-2 font-semibold">{{ p.title }}</p>
                                        <u-badge
                                            :icon="iconFromStatus(p.status)"
                                            :label="capitalize(p.status)"
                                            size="sm"
                                            variant="soft"
                                            :color="colorFromStatus(p.status)"
                                        ></u-badge>
                                    </div>
                                </div>
                                <p class="text-sm">{{ p.description }}</p>

                                <div class="flex items-center gap-2 justify-end mt-auto">
                                    <u-badge v-for="t in p.tags" :label="t" size="sm" color="primary" variant="subtle"></u-badge>
                                </div>
                            </div>
                            <div class="absolute top-4 right-4">
                                <icon
                                    name="material-symbols:arrow-outward-rounded"
                                    class="group-hover:translate-x-2 group-hover:-translate-y-2 duration-[300ms] ease-out transition-transform"
                                ></icon>
                            </div>
                        </u-card>
                    </motion.a>
                </div>
            </section>
        </AnimateEnter>

        <AnimateEnter>
            <section>
                <motion.img :variants="itemVertical" src="/icons/minecraft_logo.svg" alt="Minecraft logo" class="h-40 self-center" />
                <motion.div :variants="itemVertical" ref="minecraftCardEl" class="relative h-fit w-full max-w-2xl self-center">
                    <img src="/icons/creeper.png" class="creeper" :style="{ '--x-tr': creeperTrs.x, '--y-tr': creeperTrs.y }" alt="Minecraft creeper" />
                    <NuxtLink class="z-[4] relative min-h-[12rem] border border-default rounded-lg flex flex-col items-stretch gap-4 w-full rounded-box overflow-clip">
                        <div class="flex-1 z-[0] flex flex-col gap-2 p-4">
                            <h3 class="font-semibold">Are you here for my Minecraft mods?</h3>
                            <p>Got a dedicated page for that 😎</p>
                            <u-button to="/minecraft-mods" class="w-fit mt-auto" color="neutral">
                                <AnimatedArrow> Check them out </AnimatedArrow>
                            </u-button>
                        </div>

                        <div class="absolute w-full h-full opacity-75 bg-default z-[-1]"></div>

                        <img src="/thumbnails/minecraft.jpeg" class="z-[-2] object-cover absolute w-full h-full" alt="Minecraft thumbnail" />
                    </NuxtLink>
                </motion.div>
            </section>
        </AnimateEnter>
    </div>
</template>

<script lang="ts" setup>
import type { BadgeProps } from "@nuxt/ui";
import * as fns from "date-fns";
import Fuse, { type FuseResult } from "fuse.js";
import { Motion, motion } from "motion-v";
import { appMeta } from "~/app.meta";
import sources from "~/assets/sources.json";
import type { ModalElement } from "~/components/modal.vue";
import projects from "~/data/projects.json";

const item = {
    hidden: { opacity: 0, transform: "translateX(-10px)" },
    show: { opacity: 1, transform: "translateX(0px)" },
};
const itemVertical = {
    hidden: { opacity: 0, transform: "translateY(10px)" },
    show: { opacity: 1, transform: "translateX(0px)" },
};
const itemReverse = {
    hidden: { opacity: 0, transform: "translateX(10px)" },
    show: { opacity: 1, transform: "translateX(0px)" },
};
interface ProjectStatus {
    status: string;
}
const mounted = useMounted();
const servicesModalEl = ref<ModalElement>();
const statusPriority: Record<string, number> = {
    shipped: 1,
    validating: 2,
    archived: 3,
};
const query = ref("");
const minecraftCardEl = ref();
const creeperTrs = ref<{ x: number | string; y: number | string }>({ x: 0, y: 0 });

const services = [
    {
        title: "ICT Business Consultancy",
        description:
            "Transform your business through strategic technology planning and digital transformation guidance. Align your tech investments with business goals to maximize ROI and competitive advantage.",
        keywords: "consultancy, business strategy, information and communication technology, digital transformation, research and development, r&d, optimization strategies",
        icon: "material-symbols:business-center-rounded",
    },
    {
        title: "Software Development",
        description:
            "Full-stack development across all platforms - mobile, web, desktop, and embedded systems. 360° software solutions from concept to deployment, tailored to your specific needs and industry requirements.",
        keywords:
            "web app, create a website, create an app, mobile app, embedded system, artificial intelligence, data analysis, website, landing page, saas, software as a service",
        icon: "material-symbols:code-rounded",
    },

    {
        title: "Coaching and Tutoring",
        description:
            "Accelerate your programming skills and technical knowledge through personalized mentoring and hands-on guidance. Master new technologies faster with expert support tailored to your learning style.",
        keywords: "programming lessons, coaching, tutoring, lessons, teaching, learn programming, master programming, improve skills",
        icon: "flowbite:person-chalkboard-solid",
    },
    {
        title: "MVP Development",
        description:
            "Rapidly validate your business ideas with lean, focused minimum viable products that test core assumptions. Get to market quickly while minimizing risk and development costs.",
        keywords: "create the mvp, minimum viable product, mvp, validate idea, low budget, minimal costs, product",
        icon: "material-symbols:bolt-rounded",
    },
    {
        title: "SEO & AEO Consultancy",
        description:
            "Boost your online visibility and organic traffic through strategic Search Engine Optimization and Anser Engine Optimization. Drive qualified leads and increase revenue with data-driven SEO & AEO strategies.",
        keywords:
            "search engine optimization, landing page seo, improve visibility, improve ranking, google, artifical intelligence, answer engine optimization, chatbots suggestions, ai recommendations, search console",
        icon: "material-symbols:area-chart-outline-rounded",
    },
    {
        title: "Strategic Optimization & Growth",
        description:
            "Enhance your existing systems, processes, and digital assets for peak performance and efficiency. Identify bottlenecks and implement solutions that scale with your business growth.",
        keywords: "growth hacking, process optimization, business optimization, resolve bottlenecks, scale business, business growth",
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

const fuse = new Fuse(services, {
    keys: ["keywords"],
    threshold: 0.55,
    ignoreDiacritics: true,
    ignoreLocation: true,
});

function askNeed() {
    if (isNullOrEmpty(query.value)) return;
    const match = fuse.search(toValue(query));
    const results = match.map((m) => m.item);
    servicesModalEl.value?.open(match);
    console.log(results);
}

function updateAction() {
    const index = (currentAction.value.index + 1) % actions.length;
    currentAction.value = { action: actions.at(index), date: new Date(), index: index };
    setTimeout(updateAction, Math.random() * 2000 + 3000);
}
function creeperPeak() {
    const width = (minecraftCardEl.value?.getBoundingClientRect()?.width ?? 128) - 64;
    creeperTrs.value = { x: `${Math.random() * width}px`, y: "-64px" };
    setTimeout(
        () => {
            creeperTrs.value = { x: creeperTrs.value.x, y: 0 };
            setTimeout(creeperPeak, Math.random() * 3000 + 1500);
        },
        Math.random() * 3000 + 1000
    );
}
onMounted(() => {
    updateAction();
    setTimeout(creeperPeak, 1000);
});
const sortedProjects = computed(() => sortByStatus(projects.projects));

function sortByStatus<T extends ProjectStatus>(items: T[]): T[] {
    return [...items].sort((a, b) => {
        return statusPriority[a.status]! - statusPriority[b.status]!;
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
function colorFromStatus(status: string): BadgeProps["color"] {
    switch (status) {
        case "archived":
            return "warning";
        case "validating":
            return "warning";
        case "shipped":
            return "success";
    }
    return "success";
}
useSeoMeta({
    description: "I fired myself from everywhere to become my own boss and build stuff that I love.",
});
defineOgImageComponent("OgImageDefault", { avatarUrl: "/web-app-manifest-512x512.png", subtitle: "I am building cool stuff 😎" });
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.mask {
    background-image: linear-gradient(to top, var(--ui-bg) 0%, transparent 25%);
}
@variant md {
    .services-grid {
        grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr)) !important; /* Creates responsive columns */
    }
}
.services-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr)); /* Creates responsive columns */
    gap: 24px; /* Adjust the gap between grid items */
    @apply grid w-full;
    .item {
        @apply transition-all duration-200 ease-out cursor-pointer;

        .description {
            @apply text-sm opacity-50;
        }
    }
}
section {
    @apply flex flex-col items-start gap-8 w-full;
}

.creeper {
    @apply z-[3] absolute w-16 left-[var(--x-tr)] top-[8px] cursor-grab transition-transform duration-[500ms] ease-out  translate-y-[var(--y-tr)];
}

.creeper:hover {
    animation: shake 0.1s ease-in-out infinite;
    transform-style: preserve-3d;
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
</style>
