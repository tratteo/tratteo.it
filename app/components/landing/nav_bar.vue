<template>
    <header class="nav" :class="!pinned && 'nav--static'" :data-scrolled="scrolled || undefined" :data-open="open || undefined">
        <div class="nav__bar ds-container">
            <div class="nav__row">
                <NuxtLink to="/" class="nav__brand" aria-label="Matteo Beltrame, home">
                    <img src="/trat.jpg" alt="" width="32" height="32" class="nav__avatar" />
                </NuxtLink>

                <nav class="nav__links" aria-label="Primary">
                    <NuxtLink
                        v-for="item in nav"
                        :key="item.href"
                        :to="item.href"
                        class="nav__link"
                        :class="active === sectionOf(item.href) && 'is-active'"
                        :aria-current="active === sectionOf(item.href) ? 'true' : undefined"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </nav>

                <div class="nav__actions">
                    <NuxtLink to="/articles" class="nav__link nav__link--soft" :class="route.path.startsWith('/articles') && 'is-active'">Blog</NuxtLink>
                    <DsThemeToggle />
                    <DsButton size="sm" :to="`mailto:${email}`" icon="material-symbols:arrow-outward-rounded" class="nav__cta">Get in touch</DsButton>
                    <button class="nav__burger" type="button" :aria-expanded="open" aria-label="Open menu" @click="open = !open">
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </div>

        <!-- Portalled into the frame rather than the body: the bar carries a
             backdrop blur, and a filter on an ancestor would make it the
             containing block for this fixed overlay, trapping the menu inside
             the 60px strip. Staying inside the frame also keeps it under the
             bar in the stacking order, so the burger stays clickable. -->
        <Teleport to="#app-frame">
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
                        v-for="(item, i) in nav"
                        :key="item.href"
                        :href="item.href"
                        class="nav__overlay-link"
                        :variants="itemVariants"
                        @click="open = false"
                    >
                        <span class="nav__overlay-index mono-micro">{{ String(i + 1).padStart(2, "0") }}</span>
                        <span class="nav__overlay-label">{{ item.label }}</span>
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-5 opacity-40" />
                    </motion.a>
                </motion.nav>
                <motion.div class="nav__overlay-foot ds-container" :variants="itemVariants" initial="closed" animate="open" exit="closed">
                    <NuxtLink to="/articles" class="nav__overlay-link nav__overlay-link--sm" @click="open = false">
                        <span class="nav__overlay-label">Blog</span>
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-4 opacity-40" />
                    </NuxtLink>
                    <NuxtLink to="/minecraft-mods" class="nav__overlay-link nav__overlay-link--sm" @click="open = false">
                        <span class="nav__overlay-label">Minecraft mods</span>
                        <u-icon name="material-symbols:arrow-outward-rounded" class="size-4 opacity-40" />
                    </NuxtLink>
                    <DsButton size="sm" :to="`mailto:${email}`" icon="material-symbols:arrow-outward-rounded">Get in touch</DsButton>
                </motion.div>
            </motion.div>
            </AnimatePresence>
        </Teleport>
    </header>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from "motion-v";

import { nav } from "~/data/landing";
import { appMeta } from "~/app.meta";

const email = appMeta.author.email;
const route = useRoute();
const open = ref(false);
const { y: scrollY } = useWindowScroll();
const scrolled = computed(() => scrollY.value > 24);

/* Section links are absolute so the same strip works on every page: the hash
   resolves in place on the landing, and navigates home from anywhere else. */
const sectionOf = (href: string) => href.split("#")[1] ?? "";
const active = useSectionSpy(nav.map((item) => sectionOf(item.href)));

/* On an article the bar is only at the top: the right panel already carries
   in-page navigation, so a pinned strip would just sit over the reading. */
const pinned = computed(() => !route.path.startsWith("/articles/"));

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

/* A single pinned strip closing with one hairline. The blur is allowed here
   because the element is fixed, never a scrolling surface. */
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: var(--ds-hair) solid var(--ds-line);
    background: color-mix(in srgb, var(--ds-canvas) 72%, transparent);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    transition: background-color 0.4s var(--ds-ease);
}

.nav[data-scrolled] {
    background: color-mix(in srgb, var(--ds-canvas) 88%, transparent);
}

/* Scrolls away with the page. Absolute, not relative: the frame is the
   positioning context, so the bar still spans the full width. */
.nav--static {
    position: absolute;
}

.nav__row {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: var(--ds-nav-h);
}

.nav__brand {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.nav__avatar {
    width: 1.9rem;
    height: 1.9rem;
    object-fit: cover;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    transition: border-color var(--ds-quick) var(--ds-ease-out);
}

.nav__brand:hover .nav__avatar {
    border-color: var(--ds-line-contrast);
}

.nav__links {
    display: none;
    align-items: center;
    gap: 0.25rem;
    margin-inline: auto;
}

.nav__link {
    padding: 0.4rem 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ds-text-dim);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.nav__link:hover {
    color: var(--ds-text);
}

/* Active link is marked with a hairline tick under the label rather than a
   filled pill, which keeps the strip a single flat line. */
.nav__link.is-active {
    color: var(--ds-text);
    box-shadow: inset 0 -1px 0 0 var(--ds-text);
}

.nav__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
}

/* Both the Blog link and the CTA are desktop only: below 1024px they live in
   the overlay instead, so the strip stays one row. */
.nav__link--soft,
.nav__cta {
    display: none;
}

.nav__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 2.25rem;
    height: 2.25rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
    cursor: pointer;
}

.nav__burger span {
    display: block;
    width: 15px;
    height: 1.5px;
    margin-inline: auto;
    background: var(--ds-text);
    transition:
        transform 0.4s var(--ds-ease),
        opacity 0.25s var(--ds-ease);
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
    overflow-y: auto;
    padding-top: calc(var(--ds-nav-h) + 2rem);
    padding-bottom: 2rem;
    border-bottom: var(--ds-hair) solid var(--ds-line);
    background: color-mix(in srgb, var(--ds-canvas) 97%, transparent);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
}

.nav__overlay-list {
    display: flex;
    flex-direction: column;
}

.nav__overlay-link {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1rem 0;
    border-bottom: var(--ds-hair) solid var(--ds-line);
    color: var(--ds-text);
}

.nav__overlay-index {
    color: var(--ds-text-faint);
}

.nav__overlay-label {
    font-family: var(--font-mono);
    font-size: clamp(1.15rem, 5.5vw, 1.5rem);
    font-weight: 500;
    letter-spacing: -0.01em;
    text-transform: uppercase;
}

.nav__overlay-link > :last-child {
    margin-left: auto;
}

.nav__overlay-link--sm {
    max-width: 18rem;
}

.nav__overlay-link--sm .nav__overlay-label {
    font-size: 0.75rem;
    letter-spacing: 0.04em;
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
        display: inline-flex;
    }
    .nav__burger {
        display: none;
    }
}
</style>
