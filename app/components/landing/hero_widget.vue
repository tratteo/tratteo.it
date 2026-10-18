<template>
    <div class="console ds-matrix ds-matrix--inset ds-matrix--closed">
        <!-- console bar: identity of the instrument, then a live readout -->
        <motion.div v-bind="enter(0)" class="console__item console__item--wide">
            <div class="console__bar">
                <span class="mono-micro console__bar-live">
                    <span class="ds-pip" />
                    Live console
                </span>
                <span class="mono-micro console__bar-read">matteo@tratteo.it</span>
                <span class="console__fill" aria-hidden="true" />
                <span class="mono-micro console__bar-read">{{ lanes.length }} lanes · {{ signals.length }} signals</span>
            </div>
        </motion.div>

        <!-- identity: the rotating role, which is what the console is for -->
        <motion.div v-bind="enter(1)" class="console__item">
            <DsCell padding="none" class="console__cell console__identity">
                <div class="console__avatar">
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
                <div class="console__role">
                    <span class="mono-micro console__label">Products out, then I'm</span>
                    <div class="console__role-name">
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
            </DsCell>
        </motion.div>

        <motion.div v-bind="enter(2)" class="console__item">
            <DsCell padding="none" class="console__cell console__signal">
                <span class="mono-micro console__label">{{ signals[0].label }}</span>
                <span class="console__value">{{ signals[0].value }}</span>
                <span class="mono-micro console__sub">{{ signals[0].note }}</span>
                <span class="console__meter" aria-hidden="true">
                    <span v-for="n in TICKS" :key="n" class="console__tick" :class="n <= signals[0].level && 'is-on'" />
                </span>
            </DsCell>
        </motion.div>

        <!-- seats: where the work actually happens -->
        <motion.div v-bind="enter(3)" class="console__item">
            <DsCell padding="none" class="console__cell console__brands">
                <div class="console__brands-head mono-micro">
                    <span class="console__label">Current seats</span>
                    <span class="console__label">{{ String(brands.length).padStart(2, "0") }}</span>
                </div>
                <a v-for="brand in brands" :key="brand.name" class="console__brand" :href="brand.href" target="_blank" rel="noopener noreferrer">
                    <span class="console__brand-copy">
                        <span class="console__brand-name">{{ brand.name }}</span>
                        <span class="mono-micro console__sub">{{ brand.role }}</span>
                    </span>
                    <span class="console__brand-logo" :class="brand.tile && 'console__brand-logo--tile'">
                        <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" class="console__brand-img" />
                        <img v-if="brand.logoDark" :src="brand.logoDark" :alt="brand.name" class="console__brand-img dark-only" />
                        <img v-if="brand.logoLight" :src="brand.logoLight" :alt="brand.name" class="console__brand-img light-only" />
                    </span>
                </a>
            </DsCell>
        </motion.div>

        <motion.div v-bind="enter(4)" class="console__item">
            <DsCell padding="none" class="console__cell console__signal">
                <span class="mono-micro console__label">{{ signals[1].label }}</span>
                <span class="console__value">{{ signals[1].value }}</span>
                <span class="mono-micro console__sub">{{ signals[1].note }}</span>
                <span class="console__meter" aria-hidden="true">
                    <span v-for="n in TICKS" :key="n" class="console__tick" :class="n <= signals[1].level && 'is-on'" />
                </span>
            </DsCell>
        </motion.div>

        <!-- service index: the five lanes, as part of the console rather than
             orbiting it -->
        <motion.div v-bind="enter(5)" class="console__item console__item--wide">
            <nav class="console__strip" aria-label="Services">
                <a v-for="(service, i) in lanes" :key="service" href="/#services" class="console__lane">
                    <span class="mono-micro console__lane-index">[{{ String(i + 1).padStart(2, "0") }}]</span>
                    <span class="mono-micro console__sub console__lane-label">{{ service }}</span>
                </a>
                <span class="console__filler" aria-hidden="true" />
            </nav>
        </motion.div>
    </div>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from "motion-v";

import { hero, mods, stats } from "~/data/landing";

interface Brand {
    name: string;
    role: string;
    href: string;
    logo?: string;
    logoDark?: string;
    logoLight?: string;
    tile?: boolean;
}

const props = withDefaults(defineProps<{ enterDelay?: number }>(), { enterDelay: 0.95 });

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

/* Two readings, both pulled from the same data the page renders lower down, so
   the console can never contradict the sections. */
const signals = [
    { label: "Signal A", value: stats[1]?.value ?? "6", note: stats[1]?.label ?? "Products shipped", level: 7 },
    { label: "Signal B", value: mods.downloads, note: mods.downloadLabel, level: 11 },
];

const TICKS = 12;

const lanes = ["Software", "AI & LLM", "MVP", "Consultancy", "SEO · AEO · GEO"];

/* The console boots row by row, which replaces the orbiting tags the old widget
   used to fling out. */
function enter(index: number) {
    return {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: props.enterDelay + index * 0.05 },
    };
}

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

/* A nested console: a bar across the top, two columns of modules, and the
   service index across the bottom, all sharing single seams. */
.console {
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
}

.console__item {
    min-width: 0;
}

.console__item--wide {
    grid-column: 1 / -1;
}

.console__cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.console__label {
    color: var(--ds-text-faint);
}

.console__sub {
    color: var(--ds-text-dim);
}

/* ---- bar ---- */
.console__bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.75rem;
    padding: 0.6rem 0.85rem;
    background: var(--ds-surface-1);
}

.console__bar-live {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--ds-text);
}

.console__bar-read {
    color: var(--ds-text-dim);
}

.console__fill {
    flex: 1;
}

/* ---- identity ---- */
.console__identity {
    flex-direction: row;
    align-items: center;
    gap: 0.9rem;
    padding: 1.1rem;
}

.console__avatar {
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    flex-shrink: 0;
    overflow: hidden;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
}

.console__avatar img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.2);
}

.console__role {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
}

.console__role-name {
    font-family: var(--font-heading);
    font-size: clamp(1.05rem, 3.4vw, 1.3rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--ds-text);
    min-height: 1.35em;
}

/* ---- signals ---- */
.console__signal {
    gap: 0.15rem;
    padding: 1.1rem;
}

.console__value {
    font-family: var(--font-heading);
    font-size: clamp(1.05rem, 3.4vw, 1.3rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--ds-text);
}

/* A tick scale, the honest way to draw "how full" in a language that has no
   bars: twelve hairlines, the lit ones high contrast. */
.console__meter {
    display: flex;
    gap: 3px;
    margin-top: 0.4rem;
}

.console__tick {
    width: 3px;
    height: 9px;
    flex-shrink: 0;
    background: var(--ds-line-strong);
}

.console__tick.is-on {
    background: var(--ds-text-dim);
}

/* ---- seats ---- */
.console__brands {
    padding: 0;
}

.console__brands-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 1.1rem;
    border-bottom: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
}

.console__brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.62rem 1.1rem;
    border-top: var(--ds-hair) solid var(--ds-line);
    transition: background-color var(--ds-quick) var(--ds-ease-out);
}

.console__brand:first-of-type {
    border-top: none;
}

.console__brand:hover {
    background: var(--ds-surface-3);
}

.console__brand-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.console__brand-name {
    font-family: var(--font-heading);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ds-text);
}

.console__brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.console__brand-logo--tile {
    width: 2rem;
    height: 2rem;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-3);
}

.console__brand-img {
    height: 1.3rem;
    width: auto;
    object-fit: contain;
}

.console__brand-logo--tile .console__brand-img {
    height: 1rem;
}

/* ---- service index ---- */
.console__strip {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--ds-hair);
    height: 100%;
    background: var(--ds-line);
}

.console__lane {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.55rem 0.3rem;
    background: var(--ds-surface-2);
    text-align: center;
    transition: background-color var(--ds-quick) var(--ds-ease-out);
}

.console__lane:hover {
    background: var(--ds-surface-3);
}

.console__lane-index {
    color: var(--ds-text-faint);
}

.console__lane-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.console__filler {
    display: none;
    background: var(--ds-surface-2);
}

/* Two lanes per row on the narrowest screens, with a filler keeping the mesh
   closed, since five does not divide into even rows. */
@media (max-width: 479px) {
    .console__strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .console__filler {
        display: block;
    }
}

/* Below the two-column threshold the modules stack instead of squeezing: a
   signal cell at half of a phone width wraps every line it owns. */
@media (max-width: 559px) {
    .console {
        grid-template-columns: 1fr;
    }
}
</style>
