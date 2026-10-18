<template>
    <div :style="rootStyle">
        <!-- The page frame: one hairline box, square corners, rails on both sides. -->
        <div :style="frameStyle">
            <!-- telemetry strip -->
            <div :style="stripStyle">
                <div :style="pipStyle" />
                <span :style="statusStyle">{{ upper(status) }}</span>
                <div :style="stripRuleStyle" />
                <span :style="eyebrowStyle">{{ upper(eyebrow) }}</span>
            </div>

            <!-- body -->
            <div :style="bodyStyle">
                <div :style="copyStyle">
                    <div :style="headlineWrapStyle">
                        <span v-for="line in headlineLines" :key="line" :style="headlineStyle">{{ line }}</span>
                    </div>

                    <span v-if="subtitle || description" :style="leadStyle">{{ subtitle || description }}</span>
                </div>

                <div v-if="media || avatarUrl" :style="mediaFrameStyle">
                    <img :src="media || avatarUrl" alt="" :style="mediaStyle" />
                </div>
            </div>

            <!-- operational footer: contiguous cells, the last one inverted -->
            <div :style="footerStyle">
                <div v-for="(cell, i) in cells" :key="cell" :style="footerCellStyle(i, cells.length)">
                    <span :style="footerTextStyle(i, cells.length)">{{ upper(cell) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
/**
 * Default OG image, Monolith Grid Blueprint.
 *
 * Takumi renders a CSS subset with no access to the site's design tokens and no
 * theme, so every value here is a literal from the dark palette, laid out with
 * flexbox only. Geometry stays rectilinear: 0 radius, 1px hairlines, mono
 * telemetry, and one inverted cell standing in for the primary CTA.
 *
 * The same component backs every route; pages only differ by props.
 */
const props = withDefaults(
    defineProps<{
        title?: string;
        subtitle?: string;
        description?: string;
        /** Landscape image, used for an article thumbnail or a project shot. */
        media?: string;
        /** Portrait image, used for the identity frame when there is no media. */
        avatarUrl?: string;
        eyebrow?: string;
        status?: string;
        footer?: string[];
    }>(),
    {
        title: "Problems in.\nProducts out.",
        description: "I design, build and ship software: AI platforms, web apps and embedded systems.",
        eyebrow: "Matteo Beltrame · CTO at Hybrida · Founder of Reviy",
        status: "Available for new projects",
    },
);

/* Takumi support for text-transform is not guaranteed, so labels are folded here
   rather than relying on the renderer. */
function upper(value?: string) {
    return (value ?? "").toUpperCase();
}

const headlineLines = computed(() =>
    props.title
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
);

/* Long titles, which is what an article passes in, would overflow at display
   size, so the size steps down with the amount of text. */
const headlineSize = computed(() => {
    const lines = headlineLines.value;
    const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
    if (lines.length >= 3 || longest > 46) return 40;
    if (longest > 34) return 48;
    if (longest > 24) return 56;
    return 64;
});

const cells = computed(() => props.footer ?? ["CTO · Hybrida", "Founder · Reviy", "tratteo.it", "Get in touch"]);

/* ---- palette, dark theme ---- */
const rootStyle = [
    "display: flex",
    "width: 100%",
    "height: 100%",
    "padding: 40px",
    "background-color: #000000",
    "color: #ffffff",
    "font-family: Geist",
].join("; ");

const frameStyle = ["display: flex", "flex-direction: column", "flex: 1", "border: 1px solid #222222", "background-color: #000000"].join("; ");

const stripStyle = [
    "display: flex",
    "align-items: center",
    "gap: 14px",
    "height: 50px",
    "padding: 0 22px",
    "border-bottom: 1px solid #222222",
    "background-color: #0a0a0a",
].join("; ");

const pipStyle = ["width: 8px", "height: 8px", "background-color: #22c55e", "flex-shrink: 0"].join("; ");

const statusStyle = ["font-family: 'Geist Mono'", "font-size: 13px", "letter-spacing: 0.08em", "color: #ffffff"].join("; ");

const stripRuleStyle = ["flex: 1", "height: 1px", "background-color: #222222"].join("; ");

const eyebrowStyle = ["font-family: 'Geist Mono'", "font-size: 13px", "letter-spacing: 0.06em", "color: #666666"].join("; ");

/* The coordinate grid, same 48px plane the site draws behind its content. */
const bodyStyle = [
    "display: flex",
    "flex: 1",
    "align-items: center",
    "gap: 44px",
    "padding: 44px 40px",
    "background-image: linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
    "background-size: 48px 48px",
].join("; ");

const copyStyle = ["display: flex", "flex-direction: column", "gap: 22px", "flex: 1", "min-width: 0"].join("; ");

const headlineWrapStyle = ["display: flex", "flex-direction: column"].join("; ");

const headlineStyle = computed(() =>
    [`font-size: ${headlineSize.value}px`, "font-family: 'Geist Mono'", "font-weight: 500", "letter-spacing: -0.04em", "line-height: 1.08", "color: #ffffff"].join("; "),
);

const leadStyle = ["font-size: 23px", "line-height: 1.5", "letter-spacing: -0.01em", "color: #a1a1a1", "max-width: 620px"].join("; ");

/* Landscape for a thumbnail, portrait for the identity shot. */
const mediaFrameStyle = computed(() => {
    const size = props.media ? ["width: 330px", "height: 206px"] : ["width: 190px", "height: 232px"];
    return ["display: flex", ...size, "flex-shrink: 0", "border: 1px solid #222222", "background-color: #0a0a0a", "overflow: hidden"].join("; ");
});

const mediaStyle = ["width: 100%", "height: 100%", "object-fit: cover"].join("; ");

const footerStyle = ["display: flex", "border-top: 1px solid #222222"].join("; ");

function footerCellStyle(index: number, total: number) {
    const inverted = index === total - 1;
    return [
        "display: flex",
        "flex: 1",
        "align-items: center",
        "padding: 16px 20px",
        index > 0 ? "border-left: 1px solid #222222" : "",
        `background-color: ${inverted ? "#ffffff" : "#0a0a0a"}`,
    ]
        .filter(Boolean)
        .join("; ");
}

function footerTextStyle(index: number, total: number) {
    const inverted = index === total - 1;
    return [
        "font-family: 'Geist Mono'",
        "font-size: 13px",
        "letter-spacing: 0.08em",
        `font-weight: ${inverted ? 500 : 400}`,
        `color: ${inverted ? "#000000" : "#a1a1a1"}`,
    ].join("; ");
}
</script>
