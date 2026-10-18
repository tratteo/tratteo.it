<template>
    <div class="cmd ds-cell" :class="`ds-cell--${padding}`">
        <div class="cmd__head mono-micro">
            <span class="cmd__user">matteo@tratteo</span>
            <span class="cmd__sep">:</span>
            <span class="cmd__path">~</span>
            <span class="cmd__sep">$</span>
            <span class="cmd__command">{{ prompt }}</span>
        </div>

        <div class="cmd__out">
            <span class="cmd__prefix" aria-hidden="true">›</span>
            <span class="cmd__typed">
                <span class="cmd__text">{{ shown }}</span><span class="cmd__caret" :class="phase !== 'typing' && 'is-blinking'" aria-hidden="true" />
            </span>
        </div>

        <div class="cmd__foot">
            <span class="cmd__status mono-micro">
                <span class="ds-pip" />
                {{ label }}
            </span>
            <span class="mono-micro cmd__count">{{ index + 1 }}/{{ lines.length }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
/* A shell session that types and erases its way through a list of lines. The
   text is real text, so it stays selectable and readable; it simply writes
   itself, which is the point of the section. */
const props = withDefaults(
    defineProps<{
        lines: string[];
        prompt?: string;
        label?: string;
        /** Inset tier, matching DsCell. The shell band reads better generous. */
        padding?: "sm" | "md" | "lg" | "xl";
        typeSpeed?: number;
        eraseSpeed?: number;
        holdMs?: number;
    }>(),
    {
        prompt: "whoami",
        label: "Shell ready",
        padding: "md",
        typeSpeed: 52,
        eraseSpeed: 26,
        holdMs: 1700,
    },
);

const prefersReduced = usePreferredReducedMotion();

const index = ref(0);
const shown = ref("");
const phase = ref<"typing" | "holding" | "erasing">("typing");

let timer: ReturnType<typeof setTimeout> | undefined;

const current = computed(() => props.lines[index.value] ?? "");

function step() {
    const full = current.value;

    if (phase.value === "typing") {
        if (shown.value.length < full.length) {
            shown.value = full.slice(0, shown.value.length + 1);
            timer = setTimeout(step, props.typeSpeed);
            return;
        }
        phase.value = "holding";
        timer = setTimeout(step, props.holdMs);
        return;
    }

    if (phase.value === "holding") {
        phase.value = "erasing";
        step();
        return;
    }

    if (shown.value.length > 0) {
        shown.value = shown.value.slice(0, -1);
        timer = setTimeout(step, props.eraseSpeed);
        return;
    }

    index.value = (index.value + 1) % props.lines.length;
    phase.value = "typing";
    timer = setTimeout(step, props.typeSpeed * 3);
}

onMounted(() => {
    if (prefersReduced.value === "reduce") {
        shown.value = props.lines[0] ?? "";
        phase.value = "holding";
        return;
    }
    timer = setTimeout(step, 500);
});

onUnmounted(() => {
    if (timer) clearTimeout(timer);
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* Three rows on one left edge: the prompt, the response, and the telemetry
   footer. Every row starts at the cell's inset, which is what keeps the whole
   band aligned with the modules above and below it. */
.cmd {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.cmd__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.3rem;
    color: var(--ds-text-dim);
}

.cmd__user {
    color: var(--ds-text-muted);
}

.cmd__command {
    color: var(--ds-text);
}

.cmd__out {
    display: grid;
    grid-template-columns: 1.5rem minmax(0, 1fr);
    align-items: start;
    min-height: 2.6em;
}

.cmd__prefix {
    color: var(--ds-text-faint);
    font-family: var(--font-mono);
    line-height: 1.5;
}

/* The text and the caret share one line box, so the row is exactly as tall with
   an empty line as with a full one. The caret used to be a sibling grid item,
   which dropped it onto a second row and shifted the whole widget. */
.cmd__typed {
    display: block;
    min-height: 1.5em;
    font-family: var(--font-mono);
    font-size: clamp(0.875rem, 1.6vw, 1.125rem);
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: var(--ds-text);
    overflow-wrap: anywhere;
}

.cmd__text {
    /* Inherits the line box from .cmd__typed; pre-wrap keeps the trailing space
       while a word is being typed. */
    white-space: pre-wrap;
}

/* Block cursor, not a pipe: it reads as a terminal rather than a form field. */
.cmd__caret {
    display: inline-block;
    width: 0.5rem;
    height: 1.05em;
    margin-left: 0.15rem;
    background: var(--ds-text);
    vertical-align: text-bottom;
}

.cmd__caret.is-blinking {
    animation: cmd-blink 1s step-end infinite;
}

@keyframes cmd-blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.cmd__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.75rem;
    border-top: var(--ds-hair) solid var(--ds-line);
}

.cmd__status {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--ds-text-muted);
}

.cmd__count {
    color: var(--ds-text-faint);
}

@media (prefers-reduced-motion: reduce) {
    .cmd__caret.is-blinking {
        animation: none;
    }
}
</style>
