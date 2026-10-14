<template>
    <button ref="buttonEl" class="ds-toggle" type="button" :aria-label="label" :title="label" @click="toggle">
        <ClientOnly>
            <AnimatePresence mode="wait" :initial="false">
                <motion.span
                    :key="isDark ? 'dark' : 'light'"
                    class="flex items-center justify-center"
                    :initial="{ rotate: -80, opacity: 0, scale: 0.5 }"
                    :animate="{ rotate: 0, opacity: 1, scale: 1 }"
                    :exit="{ rotate: 80, opacity: 0, scale: 0.5 }"
                    :transition="{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }"
                >
                    <u-icon :name="isDark ? 'material-symbols:dark-mode-rounded' : 'material-symbols:light-mode-rounded'" class="size-[1.15rem]" />
                </motion.span>
            </AnimatePresence>
            <template #fallback>
                <span class="flex items-center justify-center opacity-0"><u-icon name="material-symbols:dark-mode-rounded" class="size-[1.15rem]" /></span>
            </template>
        </ClientOnly>
    </button>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from "motion-v";

interface ViewTransitionDocument extends Document {
    startViewTransition?: (callback: () => void | Promise<void>) => unknown;
}

const colorMode = useColorMode();
const mounted = useMounted();
const buttonEl = useTemplateRef<HTMLButtonElement>("buttonEl");
const prefersReduced = usePreferredReducedMotion();

const isDark = computed(() => (mounted.value ? colorMode.value === "dark" : false));
const label = computed(() => (isDark.value ? "Switch to light mode" : "Switch to dark mode"));

/**
 * Reveal origin: the centre of the hero widget when it is on the page, otherwise
 * the centre of the toggle button itself.
 */
function revealOrigin(fallback?: DOMRect): { x: number; y: number } {
    const widget = document.querySelector<HTMLElement>("[data-hero-widget]");
    const rect = widget?.getBoundingClientRect() ?? fallback;
    if (rect && rect.width > 0 && rect.height > 0) {
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

function toggle() {
    const next = colorMode.value === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;

    if (prefersReduced.value === "reduce" || typeof doc.startViewTransition !== "function") {
        colorMode.preference = next;
        return;
    }

    const origin = revealOrigin(buttonEl.value?.getBoundingClientRect());
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${origin.x}px`);
    root.style.setProperty("--theme-y", `${origin.y}px`);

    doc.startViewTransition(async () => {
        colorMode.preference = next;
        // Let Vue and the color-mode watcher commit the html class before the
        // "after" snapshot is captured.
        await nextTick();
    });
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ds-toggle {
    @apply flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full;
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass);
    color: var(--ds-text);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    transition:
        background-color 0.3s var(--ds-ease),
        border-color 0.3s var(--ds-ease);
}

.ds-toggle:hover {
    border-color: var(--ds-hairline-strong);
    background: var(--ds-glass-strong);
}
</style>
