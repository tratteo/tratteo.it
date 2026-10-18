<template>
    <button class="ds-toggle" type="button" :aria-label="label" :title="label" @click="toggle">
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
                <span class="flex items-center justify-center opacity-0"><u-icon :name="'material-symbols:dark-mode-rounded'" class="size-[1.15rem]" /></span>
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
const prefersReduced = usePreferredReducedMotion();

const isDark = computed(() => (mounted.value ? colorMode.value === "dark" : false));
const label = computed(() => (isDark.value ? "Switch to light mode" : "Switch to dark mode"));

function toggle() {
    const next = colorMode.value === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;

    if (prefersReduced.value === "reduce" || typeof doc.startViewTransition !== "function") {
        colorMode.preference = next;
        return;
    }

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

/* Square icon control, same frame language as the badges. */
.ds-toggle {
    display: flex;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
    color: var(--ds-text-muted);
    cursor: pointer;
    transition:
        background-color var(--ds-quick) var(--ds-ease-out),
        border-color var(--ds-quick) var(--ds-ease-out),
        color var(--ds-quick) var(--ds-ease-out);
}

.ds-toggle:hover {
    color: var(--ds-text);
    border-color: var(--ds-line-strong);
    background: var(--ds-surface-2);
}
</style>
