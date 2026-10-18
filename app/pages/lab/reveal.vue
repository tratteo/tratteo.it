<template>
    <div class="lab ds-page">
        <!-- 01 · the rig -->
        <section class="ds-container">
            <div class="lab__panel ds-matrix ds-bleed">
                <div class="ds-head-row lab__head">
                    <div class="lab__meta">
                        <span class="mono-micro lab__index">LAB</span>
                        <span class="eyebrow">Reveal rig</span>
                        <span class="lab__rule" aria-hidden="true" />
                        <span class="mono-micro lab__read">Not indexed</span>
                    </div>

                    <h1 class="display-lg lab__title">Reveal, on tap.</h1>
                    <p class="lead lab__lead">
                        The frame is painted where it lands and never moves. Only the content travels, from
                        <span class="lab__mine">{{ distance }}% of the element's height</span> below, cropped by the frame's bottom edge. Tune it, replay it, and tell me
                        what feels wrong.
                    </p>

                    <div class="lab__controls">
                        <label class="lab__control">
                            <span class="mono-micro lab__control-label">Distance</span>
                            <input v-model.number="distance" type="range" min="0" max="100" step="5" />
                            <span class="mono-micro lab__control-read">{{ distance }}%</span>
                        </label>

                        <label class="lab__control">
                            <span class="mono-micro lab__control-label">Duration</span>
                            <input v-model.number="duration" type="range" min="0.1" max="1.6" step="0.05" />
                            <span class="mono-micro lab__control-read">{{ duration.toFixed(2) }}s</span>
                        </label>

                        <label class="lab__control">
                            <span class="mono-micro lab__control-label">Delay</span>
                            <input v-model.number="delay" type="range" min="0" max="0.6" step="0.02" />
                            <span class="mono-micro lab__control-read">{{ delay.toFixed(2) }}s</span>
                        </label>

                        <label class="lab__control">
                            <span class="mono-micro lab__control-label">Stagger</span>
                            <input v-model.number="stagger" type="range" min="0" max="0.2" step="0.01" />
                            <span class="mono-micro lab__control-read">{{ stagger.toFixed(2) }}s</span>
                        </label>

                        <label class="lab__control lab__control--wide">
                            <span class="mono-micro lab__control-label">Easing</span>
                            <select v-model="ease">
                                <option v-for="option in eases" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                        </label>
                    </div>

                    <div class="lab__actions">
                        <DsButton icon="material-symbols:bolt-rounded" glyph="none" @click="replayAll">Replay all</DsButton>
                        <DsButton
                            variant="ghost"
                            size="sm"
                            icon="material-symbols:visibility-outline-rounded"
                            glyph="none"
                            @click="debug = !debug"
                        >
                            {{ debug ? "Hide frames" : "Outline frames" }}
                        </DsButton>
                        <span class="mono-micro lab__actions-read">Replay runs on remount, so the trigger fires again</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 02 · targets -->
        <section class="ds-container">
            <div class="lab__stage ds-matrix ds-bleed" :class="debug && 'is-debug'">
                <div class="lab__band">
                    <span class="mono-micro lab__band-index">02</span>
                    <span class="eyebrow">Targets</span>
                    <span class="lab__rule" aria-hidden="true" />
                    <span class="mono-micro lab__band-read">{{ targets.length }} components · run {{ String(epoch + 1).padStart(2, "0") }}</span>
                </div>

                <div v-for="(target, i) in targets" :key="target.id" class="lab__target">
                    <div class="lab__label">
                        <span class="mono-micro lab__label-name">{{ target.label }}</span>
                        <span class="mono-micro lab__label-note">{{ target.note }} · run {{ String(runOf(target.id)).padStart(2, "0") }}</span>
                        <button type="button" class="mono-micro lab__replay" @click="replay(target.id)">↻ replay</button>
                    </div>

                    <DsReveal
                        :key="runOf(target.id)"
                        :distance="distanceValue"
                        :duration="duration"
                        :delay="delay + i * stagger"
                        :ease="ease"
                    >
                        <h2 v-if="target.id === 'headline'" class="display-lg lab__demo-headline">
                            Problems in.<br />Products out.
                        </h2>

                        <p v-else-if="target.id === 'lead'" class="lead">
                            I design, build and ship software: AI platforms, web apps, embedded systems, the whole stack.
                        </p>

                        <div v-else-if="target.id === 'line'" class="mono-micro lab__demo-line">
                            SYSTEM ONLINE · 12:00:00 · EUROPE/ROME · BUILD 2026
                        </div>

                        <div v-else-if="target.id === 'cell'" class="ds-cell lab__demo-cell">
                            <span class="mono-micro lab__demo-label">01 · Module</span>
                            <p class="lab__demo-title ds-strong">A bordered cell</p>
                            <p class="lab__demo-desc">
                                The reveal wraps the whole cell here, so the border and the content travel together. The frame in the outline view is
                                the wrapper, not the cell.
                            </p>
                        </div>

                        <figure v-else-if="target.id === 'media'" class="lab__demo-media">
                            <img src="/avatar/trat_climb.webp" alt="" />
                        </figure>

                        <a v-else-if="target.id === 'row'" class="ds-cell ds-cell--interactive lab__demo-row" href="#">
                            <span class="mono-micro lab__demo-index">[01]</span>
                            <span class="lab__demo-name ds-strong">A list row</span>
                            <span class="mono-micro lab__demo-meta">Same shape as the work list</span>
                            <span class="lab__demo-arrow">↗</span>
                        </a>
                    </DsReveal>
                </div>
            </div>
        </section>

        <!-- 03 · what moves -->
        <section class="ds-container">
            <div class="lab__compare ds-matrix ds-bleed">
                <div class="lab__band">
                    <span class="mono-micro lab__band-index">03</span>
                    <span class="eyebrow">What moves</span>
                    <span class="lab__rule" aria-hidden="true" />
                </div>

                <div class="lab__compare-pair">
                    <div class="lab__compare-side">
                        <span class="mono-micro lab__compare-label">A · the block slides</span>
                        <DsReveal :distance="distanceValue" :duration="duration" :delay="delay" :ease="ease">
                            <div class="ds-cell lab__demo-cell">
                                <span class="mono-micro lab__demo-label">Frame + content</span>
                                <p class="lab__demo-title ds-strong">Whole module</p>
                                <p class="lab__demo-desc">The border enters with the content, because the reveal wraps the cell.</p>
                            </div>
                        </DsReveal>
                    </div>

                    <div class="lab__compare-side">
                        <span class="mono-micro lab__compare-label">B · the frame stays</span>
                        <div class="ds-cell lab__demo-cell">
                            <DsReveal :distance="distanceValue" :duration="duration" :delay="delay" :ease="ease">
                                <span class="mono-micro lab__demo-label">Content only</span>
                                <p class="lab__demo-title ds-strong">Inner content</p>
                                <p class="lab__demo-desc">The border is already there; only what sits inside it travels.</p>
                            </DsReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
const distance = ref(100);
const duration = ref(0.5);
const delay = ref(0);
const stagger = ref(0.04);
const debug = ref(false);

const eases = [
    { label: "system · 0.16 1 0.3 1", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
    { label: "soft · 0.22 1 0.36 1", value: "cubic-bezier(0.22, 1, 0.36, 1)" },
    { label: "ease out · 0.32 0.72 0 1", value: "cubic-bezier(0.32, 0.72, 0, 1)" },
    { label: "in out · 0.65 0 0.35 1", value: "cubic-bezier(0.65, 0, 0.35, 1)" },
    { label: "linear", value: "linear" },
];

const ease = ref(eases[0].value);

/* Passed as a CSS length, so the default is the element's own height. */
const distanceValue = computed(() => `${distance.value}%`);

const targets = [
    { id: "headline", label: "Headline", note: "display-lg · two lines" },
    { id: "lead", label: "Paragraph", note: "lead · flow text" },
    { id: "line", label: "Telemetry line", note: "mono-micro · the short case" },
    { id: "cell", label: "Bordered cell", note: "frame + text" },
    { id: "media", label: "Image", note: "16 / 9" },
    { id: "row", label: "List row", note: "work row shape" },
];

/* Replay is an input on the reveal, not a remount: bumping a counter restarts
   the entry in place. A per-target button changes one counter, the global
   button shifts every target. */
const epoch = ref(0);
const replays = reactive<Record<string, number>>({});

function runOf(id: string) {
    return epoch.value + (replays[id] ?? 0);
}

function replayAll() {
    epoch.value++;
}

function replay(id: string) {
    replays[id] = (replays[id] ?? 0) + 1;
}

useSeoMeta({
    title: "Reveal lab",
    robots: "noindex, nofollow",
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.lab__panel,
.lab__stage,
.lab__compare {
    grid-template-columns: 1fr;
}

/* ---- rig ---- */
.lab__head {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.lab__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.lab__index,
.lab__read {
    color: var(--ds-text-faint);
}

.lab__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}

.lab__title {
    margin: 0;
}

.lab__lead {
    max-width: 62ch;
}

.lab__mine {
    font-family: var(--font-heading);
    color: var(--ds-text);
}

.lab__controls {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.9rem 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-block: var(--ds-hair) solid var(--ds-line);
}

.lab__control {
    display: grid;
    grid-template-columns: 5.5rem minmax(0, 1fr) 3.75rem;
    align-items: center;
    gap: 0.75rem;
}

.lab__control--wide {
    grid-template-columns: 5.5rem minmax(0, 1fr);
}

.lab__control-label {
    color: var(--ds-text-dim);
}

.lab__control-read {
    color: var(--ds-text);
    text-align: right;
}

.lab__control input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1.25rem;
    background: transparent;
    cursor: pointer;
}

.lab__control input[type="range"]::-webkit-slider-runnable-track {
    height: 1px;
    background: var(--ds-line-strong);
}

.lab__control input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.55rem;
    height: 0.9rem;
    margin-top: -0.42rem;
    border-radius: 0;
    background: var(--ds-text);
}

.lab__control input[type="range"]::-moz-range-track {
    height: 1px;
    background: var(--ds-line-strong);
}

.lab__control input[type="range"]::-moz-range-thumb {
    width: 0.55rem;
    height: 0.9rem;
    border: 0;
    border-radius: 0;
    background: var(--ds-text);
}

.lab__control select {
    height: 1.9rem;
    padding-inline: 0.5rem;
    border: var(--ds-hair) solid var(--ds-line-strong);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-2);
    color: var(--ds-text);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.lab__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
}

.lab__actions-read {
    color: var(--ds-text-faint);
}

/* ---- stage ---- */
.lab__band {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: calc(var(--ds-pad) * 1.4) var(--ds-pad);
    background: var(--ds-surface-1);
}

.lab__band-index,
.lab__band-read {
    color: var(--ds-text-faint);
}

.lab__target {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: calc(var(--ds-pad) * 1.2) var(--ds-pad);
}

.lab__label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem 0.75rem;
}

.lab__label-name {
    color: var(--ds-text);
}

.lab__label-note {
    color: var(--ds-text-faint);
}

.lab__replay {
    margin-left: auto;
    padding: 0.2rem 0.5rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
    color: var(--ds-text-muted);
    cursor: pointer;
    transition:
        color var(--ds-quick) var(--ds-ease-out),
        border-color var(--ds-quick) var(--ds-ease-out);
}

.lab__replay:hover {
    color: var(--ds-text);
    border-color: var(--ds-line-contrast);
}

/* Outline mode shows the frame the reveal actually owns. */
.lab__stage.is-debug :deep(.ds-reveal) {
    outline: 1px dashed var(--ds-line-strong);
    outline-offset: 2px;
}

/* ---- demos ---- */
.lab__demo-headline {
    margin: 0;
}

.lab__demo-line {
    padding: 0.55rem 0.7rem;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
    color: var(--ds-text-muted);
}

.lab__demo-cell {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: var(--ds-pad);
}

.lab__demo-label {
    color: var(--ds-text-faint);
}

.lab__demo-title {
    font-size: 1rem;
}

.lab__demo-desc {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
    max-width: 52ch;
}

.lab__demo-media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
}

.lab__demo-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.7);
}

.lab__demo-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1rem;
    padding: calc(var(--ds-pad) * 0.9) var(--ds-pad);
    color: inherit;
}

.lab__demo-index {
    color: var(--ds-text-faint);
}

.lab__demo-name {
    font-size: 0.9375rem;
}

.lab__demo-meta {
    color: var(--ds-text-dim);
}

.lab__demo-arrow {
    margin-left: auto;
    color: var(--ds-text-muted);
}

/* ---- comparison ---- */
.lab__compare-pair {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--ds-hair);
    background: var(--ds-line);
}

.lab__compare-side {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: calc(var(--ds-pad) * 1.2) var(--ds-pad);
    background: var(--ds-surface-2);
}

.lab__compare-label {
    color: var(--ds-text-faint);
}

@media (min-width: 768px) {
    .lab__controls {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .lab__compare-pair {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1200px) {
    .lab__controls {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
