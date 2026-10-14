<template>
    <DsGlassCard radius="xl" padding="none" class="flex flex-col gap-6 p-6 sm:gap-7 sm:p-7" data-hero-widget>
        <!-- identity -->
        <div class="widget__head">
            <div class="widget__avatar">
                <ClientOnly>
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            :key="image"
                            :src="image"
                            :alt="role"
                            :initial="{ opacity: 0, scale: 1.15 }"
                            :animate="{ opacity: 1, scale: 1 }"
                            :exit="{ opacity: 0, scale: 0.9 }"
                            :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }"
                        />
                    </AnimatePresence>
                </ClientOnly>
            </div>
            <div class="widget__role">
                <span class="eyebrow">Products out, then I'm</span>
                <div class="widget__role-name">
                    <ClientOnly>
                        <AnimatePresence mode="wait">
                            <motion.span
                                :key="role"
                                :initial="{ opacity: 0, y: 10 }"
                                :animate="{ opacity: 1, y: 0 }"
                                :exit="{ opacity: 0, y: -10 }"
                                :transition="{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }"
                            >
                                {{ role }}
                            </motion.span>
                        </AnimatePresence>
                    </ClientOnly>
                </div>
            </div>
        </div>

        <span class="widget__divider" />

        <!-- what I'm building -->
        <div class="widget__block">
            <span class="eyebrow">Currently building</span>
            <div class="widget__brands">
                <a v-for="brand in brands" :key="brand.name" class="widget__brand" :href="brand.href" target="_blank" rel="noopener noreferrer">
                    <span class="widget__brand-copy">
                        <span class="widget__brand-name">{{ brand.name }}</span>
                        <span class="widget__brand-role">{{ brand.role }}</span>
                    </span>
                    <span class="widget__brand-logo" :class="brand.tile && 'widget__brand-logo--tile'">
                        <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" class="widget__brand-img" />
                        <img v-if="brand.logoDark" :src="brand.logoDark" :alt="brand.name" class="widget__brand-img dark-only" />
                        <img v-if="brand.logoLight" :src="brand.logoLight" :alt="brand.name" class="widget__brand-img light-only" />
                    </span>
                </a>
            </div>
        </div>

        <span class="widget__divider" />

        <!-- signals -->
        <div class="widget__stats">
            <div v-for="stat in widgetStats" :key="stat.label" class="widget__stat">
                <span class="widget__stat-value">{{ stat.value }}</span>
                <span class="widget__stat-label">{{ stat.label }}</span>
            </div>
        </div>
    </DsGlassCard>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from "motion-v";

import { hero, stats } from "~/data/landing";

interface Brand {
    name: string;
    role: string;
    href: string;
    logo?: string;
    logoDark?: string;
    logoLight?: string;
    tile?: boolean;
}

const brands: Brand[] = [
    { name: "Hybrida", role: "Chief Technology Officer", href: "https://hybrida.io", logo: "/logos/hybrida.svg" },
    {
        name: "Reviy",
        role: "Founder & CTO",
        href: "https://reviy.app?utm_source=personal_site",
        logoDark: "/logos/reviy-white.svg",
        logoLight: "/logos/reviy-black.svg",
        tile: true,
    },
];

const widgetStats = [stats[0], stats[1]].filter(Boolean) as { value: string; label: string }[];

const roleIndex = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
    timer = setInterval(() => {
        roleIndex.value = (roleIndex.value + 1) % hero.roles.length;
    }, 2800);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const role = computed(() => hero.roles[roleIndex.value] ?? hero.roles[0]);
const image = computed(() => hero.images[roleIndex.value] ?? hero.images[0]);
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* The glass surface, the tray behind it and the inner rhythm all come from
   DsGlassCard (utilities are passed through because scoped classes cannot
   reach a child component's inner element). Everything below styles elements
   this component owns inside the slot. */

.widget__head {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.widget__avatar {
    position: relative;
    width: 4.5rem;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: var(--ds-r-full);
    overflow: hidden;
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-bg-deep);
}

.widget__avatar img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.widget__role {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
}

.widget__role-name {
    font-size: 1.45rem;
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--ds-text);
    min-height: 1.5em;
}

.widget__divider {
    display: block;
    height: 1px;
    width: 100%;
    background: var(--ds-hairline);
}

.widget__block {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.widget__brands {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.widget__brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.55rem 0.7rem;
    /* horizontal bleed only: vertical negative margins used to collide the rows */
    margin: 0 -0.6rem;
    border-radius: var(--ds-r-md);
    border: 1px solid transparent;
    transition:
        background-color 0.3s var(--ds-ease),
        border-color 0.3s var(--ds-ease);
}

.widget__brand:hover {
    background: var(--ds-glass);
    border-color: var(--ds-glass-border);
}

.widget__brand-copy {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
}

.widget__brand-name {
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ds-text);
}

.widget__brand-role {
    font-size: 0.72rem;
    color: var(--ds-text-dim);
}

.widget__brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.widget__brand-logo--tile {
    width: 2rem;
    height: 2rem;
    border-radius: 0.6rem;
    background: color-mix(in srgb, var(--ds-text) 9%, transparent);
}

.widget__brand-img {
    height: 1.35rem;
    width: auto;
    object-fit: contain;
}

.widget__brand-logo--tile .widget__brand-img {
    height: 1.05rem;
}

.widget__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.widget__stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.widget__stat-value {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--ds-text);
}

.widget__stat-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.02em;
    color: var(--ds-text-dim);
}
</style>
