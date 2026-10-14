<template>
    <header class="nav" :data-scrolled="scrolled || undefined" :data-open="open || undefined">
        <div class="nav__bar ds-container">
            <div class="nav__pill ds-glass">
                <NuxtLink to="/" class="nav__brand" aria-label="Matteo Beltrame, home">
                    <img src="/trat.jpg" alt="" width="32" height="32" class="nav__avatar" />
                </NuxtLink>

                <nav class="nav__links" aria-label="Primary">
                    <a
                        v-for="item in nav"
                        :key="item.href"
                        :href="item.href"
                        class="nav__link"
                        :class="active === item.href.slice(1) && 'is-active'"
                        :aria-current="active === item.href.slice(1) ? 'true' : undefined"
                    >
                        {{ item.label }}
                    </a>
                </nav>

                <div class="nav__actions">
                    <NuxtLink to="/articles" class="nav__link nav__link--soft">Blog</NuxtLink>
                    <DsThemeToggle />
                    <DsPillButton :to="`mailto:${email}`" icon="material-symbols:arrow-outward-rounded" class="nav__cta">Get in touch</DsPillButton>
                    <button class="nav__burger" type="button" :aria-expanded="open" aria-label="Open menu" @click="open = !open">
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </div>

        <AnimatePresence>
            <motion.div
                v-if="open"
                key="menu"
                class="nav__overlay"
                :variants="overlayVariants"
                initial="closed"
                animate="open"
                exit="closed"
            >
                <motion.nav class="nav__overlay-list ds-container" aria-label="Mobile" :variants="listVariants" initial="closed" animate="open" exit="closed">
                    <motion.a
                        v-for="item in nav"
                        :key="item.href"
                        :href="item.href"
                        class="nav__overlay-link"
                        :variants="itemVariants"
                        @click="open = false"
                    >
                        <span>{{ item.label }}</span>
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-5 opacity-40" />
                    </motion.a>
                </motion.nav>

                <motion.div class="nav__overlay-foot ds-container" :variants="itemVariants" initial="closed" animate="open" exit="closed">
                    <NuxtLink to="/articles" class="nav__overlay-link nav__overlay-link--sm" @click="open = false">
                        <span>Blog</span>
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-4 opacity-40" />
                    </NuxtLink>
                    <NuxtLink to="/minecraft-mods" class="nav__overlay-link nav__overlay-link--sm" @click="open = false">
                        <span>Minecraft mods</span>
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-4 opacity-40" />
                    </NuxtLink>
                    <DsPillButton :to="`mailto:${email}`" icon="material-symbols:arrow-outward-rounded">Get in touch</DsPillButton>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    </header>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from "motion-v";

import { nav } from "~/data/landing";
import { appMeta } from "~/app.meta";

const email = appMeta.author.email;
const open = ref(false);
const { y: scrollY } = useWindowScroll();
const scrolled = computed(() => scrollY.value > 24);
const active = useSectionSpy(nav.map((item) => item.href.slice(1)));

const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};
const listVariants = {
    closed: {},
    open: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
};
const itemVariants = {
    closed: { opacity: 0, y: 22 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

watch(open, (value) => {
    if (import.meta.client) document.body.style.overflow = value ? "hidden" : "";
});

onUnmounted(() => {
    if (import.meta.client) document.body.style.overflow = "";
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding-top: 0.85rem;
    padding-bottom: 0.85rem;
    transition: padding 0.4s var(--ds-ease);
}

.nav__bar {
    position: relative;
    z-index: 120;
    display: flex;
    justify-content: center;
}

.nav__pill {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 78rem;
    padding: 0.4rem;
    border-radius: var(--ds-r-full);
    transition:
        padding 0.4s var(--ds-ease),
        box-shadow 0.4s var(--ds-ease),
        background-color 0.4s var(--ds-ease);
}

.nav[data-scrolled] .nav__pill {
    box-shadow: var(--ds-shadow-soft);
    background: var(--ds-glass-strong);
}

.nav__brand {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.nav__avatar {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: var(--ds-r-full);
    object-fit: cover;
    border: 1px solid var(--ds-glass-border);
    transition: transform 0.4s var(--ds-ease);
}

.nav__brand:hover .nav__avatar {
    transform: scale(1.06);
}

.nav__links {
    display: none;
    align-items: center;
    gap: 0.15rem;
    margin-inline: auto;
}

.nav__link {
    padding: 0.5rem 0.8rem;
    border-radius: var(--ds-r-full);
    font-size: 0.875rem;
    color: var(--ds-text-muted);
    transition:
        color 0.25s var(--ds-ease),
        background-color 0.25s var(--ds-ease);
}

.nav__link:hover {
    color: var(--ds-text);
    background: var(--ds-glass);
}

.nav__link.is-active {
    color: var(--ds-text);
    background: var(--ds-glass-strong);
}

.nav__link--soft {
    display: none;
}

.nav__actions {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-left: auto;
}

.nav__cta {
    display: none;
}

.nav__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 2.35rem;
    height: 2.35rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass);
    cursor: pointer;
}

.nav__burger span {
    display: block;
    width: 15px;
    height: 1.5px;
    margin-inline: auto;
    background: var(--ds-text);
    border-radius: 2px;
    transition: transform 0.4s var(--ds-ease), opacity 0.25s var(--ds-ease);
}

.nav[data-open] .nav__burger span:nth-child(1) {
    transform: translateY(5.5px) rotate(45deg);
}
.nav[data-open] .nav__burger span:nth-child(2) {
    opacity: 0;
}
.nav[data-open] .nav__burger span:nth-child(3) {
    transform: translateY(-5.5px) rotate(-45deg);
}

/* ---- mobile overlay ---- */
.nav__overlay {
    position: fixed;
    inset: 0;
    z-index: 90;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 6.5rem;
    padding-bottom: 2rem;
    background: color-mix(in srgb, var(--ds-bg) 80%, transparent);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
    backdrop-filter: blur(28px) saturate(160%);
}

.nav__overlay-list {
    display: flex;
    flex-direction: column;
}

.nav__overlay-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 0;
    border-bottom: 1px solid var(--ds-hairline);
    font-size: clamp(1.75rem, 9vw, 2.5rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    color: var(--ds-text);
}

.nav__overlay-link--sm {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0;
    max-width: 18rem;
}

.nav__overlay-foot {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
}

@media (min-width: 1024px) {
    .nav__links {
        display: flex;
    }
    .nav__link--soft {
        display: inline-flex;
    }
    .nav__cta {
        display: inline-block;
    }
    .nav__burger {
        display: none;
    }
}
</style>
