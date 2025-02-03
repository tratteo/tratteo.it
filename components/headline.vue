<template>
    <div class="drawer-end fixed z-[10000] w-screen max-w-[var(--max-content-width)] h-[var(--headline-height)]">
        <input id="navbar_drawer" type="checkbox" class="drawer-toggle" />
        <!-- Side menu -->
        <div class="drawer-side z-[10000]">
            <label for="navbar_drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <nav class="min-h-full bg-base-100 w-64 pt-4">
                <ul class="menu">
                    <li>
                        <NuxtLink to="/">
                            <icon name="material-symbols:home-rounded" class="size-4"></icon>
                            <p class="text-sm">Home</p>
                        </NuxtLink>
                    </li>

                    <li v-for="i in navItems.filter((i) => i.canShow())">
                        <NuxtLink :to="i.path">
                            <icon :name="i.icon" class="size-4"></icon>
                            <p class="text-sm">{{ i.name }}</p>
                        </NuxtLink>
                    </li>
                </ul>
                <div class="divider h-0"></div>
                <ul v-if="route.path === '/'" class="menu menu-vertical w-full">
                    <li v-for="sec in sections" class="text-start">
                        <a v-if="sec.subsections.length <= 0" @click="(ev) => focusNavigationSection(sec.id)">
                            {{ sec.name }}
                        </a>
                        <details v-else>
                            <summary>{{ sec.name }}</summary>
                            <ul>
                                <li v-for="s in sec.subsections" @click="(ev) => focusNavigationSection(s.id)">
                                    <a>{{ s.name }}</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Navbar menu -->
        <div
            class="drawer-content h-full flex flex-col transition-all duration-100 ease-out rounded-box border-base-content/20 px-2 mt-2"
            :class="transparentBar ? ['bg-transparent'] : ['shadow-md', 'border', 'bg-base-100']"
        >
            <div class="navbar bg-transparent w-full h-full gap-4">
                <NuxtLink v-if="route.path !== '/'" class="btn btn-sm" to="/">
                    <icon name="ic:round-arrow-back-ios-new"></icon>
                    Home
                </NuxtLink>
                <div v-if="route.path === '/'" class="hidden lg:flex flex-1 flex-row items-center gap-2 justify-center">
                    <ul class="menu menu-horizontal items-center gap-2">
                        <li v-for="sec in sections">
                            <button v-if="sec.subsections.length <= 0" @click="(ev) => focusNavigationSection(sec.id)" class="btn btn-ghost btn-sm">
                                {{ sec.name }}
                            </button>
                            <details v-else class="p-0 nav-dropdown">
                                <summary>{{ sec.name }}</summary>
                                <ul class="relative text-start bg-transparent flex flex-col items-stretch text-base-content">
                                    <div
                                        class="z-[1] absolute top-0 bottom-0 left-0 right-0 bg-base-100 border-base-content/20 border rounded-btn opacity-50 pointer-events-none"
                                    ></div>
                                    <div class="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-md rounded-btn pointer-events-none"></div>
                                    <li v-for="s in sec.subsections" @click="(ev) => focusNavigationSection(s.id)" class="z-[2] items-start btn btn-ghost btn-sm font-normal">
                                        {{ s.name }}
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                <div v-else class="flex-1"></div>
                <nav class="hidden flex-none lg:block">
                    <ul class="flex flex-row items-center gap-0">
                        <!-- Navbar menu content here -->
                        <li v-for="i in navItems.filter((i) => i.canShow())">
                            <NuxtLink :to="i.path" class="btn btn-sm btn-ghost">
                                <icon :name="i.icon" class="size-4"></icon>
                                <p class="text-xs">{{ i.name }}</p>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <div class="flex-1 lg:flex-none flex flex-row items-center gap-2 justify-end">
                    <label for="navbar_drawer" aria-label="open sidebar" class="lg:hidden btn btn-square btn-ghost">
                        <icon name="material-symbols:menu-rounded"></icon>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface NavigationSection {
    id: string;
    name: string;
    subsections: NavigationSection[];
}
const sections = ref<NavigationSection[]>([]);
const route = toRef(useRoute());
const navItems: any[] = [];
const wscroll = useScrollProgress();

const transparentBar = ref(true);

watch(wscroll.y, updateBarTransparency);

watch(
    () => route.value.path,
    async () => {
        if (route.value.path === "/") {
            buildSectionElements();
        }
        updateBarTransparency();
    }
);
onMounted(() => {
    if (route.value.path === "/") {
        buildSectionElements();
    }
});
function focusMainCta() {
    scrollToEl(document?.getElementById("main-cta"));
}
function updateBarTransparency() {
    const progress = wscroll.y.value / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    transparentBar.value = isNaN(progress) || progress <= 0;
}
function homeClicked(ev: Event) {
    if (route.value.path !== "/") {
        navigateTo("/");
    } else {
        scrollTop();
    }
}
async function buildSectionElements() {
    await nextTick();
    const sectionsElements = Array.from(document.querySelectorAll("section[navigation]:not(section[navigation] section[navigation])"));
    const newSec: NavigationSection[] = [];
    for (const sec of sectionsElements) {
        const s = sec.querySelectorAll("section");
        var obj = <NavigationSection>{ id: sec.id, name: sec.getAttribute("name"), subsections: Array.from(s).map((s) => ({ id: s.id, name: s.getAttribute("name") })) };
        newSec.push(obj);
    }
    sections.value = newSec;
}

function focusNavigationSection(id: string | undefined) {
    scrollToEl(document.querySelector(`section#${id}[navigation]`));
}
onMounted(() => {
    window.addEventListener("click", function (e) {
        document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
            if (!dropdown.contains(e.target as HTMLElement)) {
                dropdown.removeAttribute("open");
            }
        });
    });
});
</script>

<style lang="css" scoped></style>
