<template>
    <div class="flex flex-col items-center w-full gap-8 max-w-7xl self-center mb-16">
        <div class="flex flex-row items-center justify-center w-full gap-4 flex-wrap">
            <div class="flex items-start justify-center flex-row gap-4">
                <div class="flex flex-col items-center gap-2">
                    <div class="avatar">
                        <div class="w-[6rem] sm:w-[10rem] rounded-full border-2 shadow-md border-primary overflow-hidden relative">
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
                <div class="chat chat-start gap-1 w-full md:min-w-[16rem]">
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
                    <div class="chat-bubble chat-bubble-primary">I am building cool stuff.</div>
                    <div class="chat-footer">
                        <ClientOnly>
                            <time class="text-xs opacity-50">{{ fns.format(currentAction.date, "HH:mm:ss") }}</time>
                        </ClientOnly>
                    </div>
                </div>
            </div>
            <div class="relative flex p-4 lg:p-8 rounded-box flex-col border shadow-lg border-base-content/20 card-compact mb-16">
                <p class="card-title">Hey, it's Matteo!</p>
                <p>I love building cool stuff.</p>
                <div class="absolute flex items-end bottom-[-0.75rem] left-[2rem] translate-y-[100%] gap-2">
                    <SvgDrawnArrow class="fill-primary size-12 rotate-90"></SvgDrawnArrow>
                    <div class="flex flex-col items-start gap-0 mb-[-.5rem]">
                        <p class="">Tracing my path</p>
                        <!-- <p class="text-sm opacity-75">Haven't earned much yet tho 👉👈</p> -->
                    </div>
                </div>
            </div>
        </div>
        <section class="flex flex-col items-stretch gap-4 w-full">
            <h3 class="m-0">What the hell are you doing here?</h3>
            <p>My app's are way cooler than this lame website 👇</p>
            <div class="lg:grid lg:grid-cols-2 flex flex-col items-stretch gap-4 rounded-box">
                <a
                    v-for="p in sortedProjects"
                    class="card-compact cursor-pointer image-full select-none shadow group relative card card-bordered border-base-content/20 w-full overflow-clip"
                    :href="p.url ?? undefined"
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
                                    <img :src="p.icon" />
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
        <section class="flex flex-col items-stretch w-full gap-6">
            <img src="/icons/minecraft_logo.svg" alt="Minecraft logo" class="h-40" />
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

                    <div class="absolute w-full h-full opacity-50 bg-base-300 z-[-1]"></div>
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
        <!-- <div class="flex flex-col items-center gap-2">
                <div class="avatar">
                    <div class="rounded-full w-64">
                        <img src="/icon.webp" />
                    </div>
                </div>
                <h2>Matteo Beltrame</h2>
            </div> -->
    </div>
</template>

<script lang="ts" setup>
import * as fns from "date-fns";
import projects from "~/data/projects.json";

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
defineOgImageComponent("OgImageDefault", { avatarUrl: "/icon.png", subtitle: "I am building cool stuff 😎" });
</script>

<style lang="css" scoped>
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
