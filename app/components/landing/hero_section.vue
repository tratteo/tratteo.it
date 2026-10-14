<template>
    <section id="top" ref="heroEl" class="hero">
        <div class="hero__inner ds-container">
            <motion.div class="hero__copy" :style="{ y: copyY, opacity: copyOpacity }">
                <div class="hero__top">
                    <DsChip tone="live" :label="hero.availability" />
                    <span class="eyebrow hero__eyebrow">{{ hero.eyebrow }}</span>
                </div>

                <h1 class="display-2xl hero__title">
                    <span v-for="(line, i) in hero.titleLines" :key="line" class="hero__line">
                        <motion.span
                            :initial="{ y: '115%' }"
                            :animate="{ y: 0 }"
                            :transition="{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }"
                        >
                            {{ line }}
                        </motion.span>
                    </span>
                </h1>

                <motion.p
                    class="lead hero__lead"
                    :initial="{ opacity: 0, y: 18 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }"
                >
                    {{ hero.lead }}
                </motion.p>

                <motion.div
                    class="hero__cta"
                    :initial="{ opacity: 0, y: 18 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }"
                >
                    <DsMagnetic><DsPillButton :to="hero.primaryCta.href" icon="material-symbols:arrow-outward-rounded">{{ hero.primaryCta.label }}</DsPillButton></DsMagnetic>
                    <DsPillButton variant="ghost" :to="hero.secondaryCta.href" icon="material-symbols:south-rounded">{{ hero.secondaryCta.label }}</DsPillButton>
                </motion.div>
            </motion.div>

            <motion.div
                class="hero__visual"
                :initial="{ y: 18 }"
                :animate="{ y: 0 }"
                :transition="{ duration: ENTER_DURATION, ease: [0.16, 1, 0.3, 1], delay: ENTER_DELAY }"
            >
                <motion.div
                    class="hero__stage"
                    :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }"
                    :transition="{ duration: ENTER_DURATION, ease: [0.16, 1, 0.3, 1], delay: ENTER_DELAY }"
                    :style="{ y: stageY, scale: stageScale, rotateX: stageRotate, transformPerspective: 1500 }"
                >
                    <LandingHeroWidget />
                </motion.div>

                <motion.div class="hero__orbit" :style="{ y: stageY, scale: stageScale }">
                    <span v-for="floater in floaters" :key="floater.label" class="hero__sat" :class="`hero__sat--${floater.pos}`">
                        <span class="hero__spark">
                            <span class="hero__chip">
                                <u-icon :name="floater.icon" class="hero__chip-icon" />
                                <span>{{ floater.label }}</span>
                            </span>
                        </span>
                    </span>
                </motion.div>
            </motion.div>
        </div>

        <motion.div class="hero__cue" :style="{ opacity: cueOpacity }" aria-hidden="true">
            <span class="eyebrow">Scroll</span>
            <span class="hero__cue-line" />
        </motion.div>
    </section>
</template>

<script lang="ts" setup>
import { motion, useScroll, useTransform } from "motion-v";

import { hero } from "~/data/landing";

const heroEl = useTemplateRef<HTMLElement>("heroEl");
const { scrollYProgress } = useScroll({ target: heroEl, offset: ["start start", "end start"] });

const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
const stageY = useTransform(scrollYProgress, [0, 1], [0, -200]);
const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
const stageRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);
const cueOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

/* Intro choreography: the hero copy lands first, then the widget fades and rises
   in exactly the same way, and only once it has settled do the satellite chips
   explode out of it. */
const ENTER_DELAY = 0.75;
const ENTER_DURATION = 0.8;
const BURST_START = (ENTER_DELAY + ENTER_DURATION) * 1000 + 100;

/* Satellites on the card rim: each one is a service I sell. They straddle the
   edge so they can never sit on top of the widget's content. */
const floaters = [
    { pos: 1, icon: "material-symbols:code-rounded", label: "Software" },
    { pos: 2, icon: "material-symbols:auto-awesome-rounded", label: "AI & LLM" },
    { pos: 3, icon: "material-symbols:bolt-rounded", label: "MVP" },
    { pos: 4, icon: "material-symbols:business-center-rounded", label: "Consultancy" },
    { pos: 5, icon: "material-symbols:travel-explore-rounded", label: "SEO · AEO · GEO" },
];

/**
 * Explosion: the satellite icons are flung out of the widget's centre and settle
 * onto the card rim while fading in. Measured once at mount, then handed back to
 * CSS.
 */
const prefersReduced = usePreferredReducedMotion();

onMounted(() => {
    if (prefersReduced.value === "reduce") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const root = heroEl.value;
    if (!root) return;

    const originEl = root.querySelector<HTMLElement>("[data-hero-widget]");
    const sparks = Array.from(root.querySelectorAll<HTMLElement>(".hero__spark"));
    if (!originEl || sparks.length === 0) return;

    const rootRect = root.getBoundingClientRect();
    const originRect = originEl.getBoundingClientRect();
    const originX = originRect.left + originRect.width / 2 - rootRect.left;
    const originY = originRect.top + originRect.height / 2 - rootRect.top;

    const frames = sparks.map((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - rootRect.left;
        const cy = rect.top + rect.height / 2 - rootRect.top;
        return { el, dx: originX - cx, dy: originY - cy };
    });

    frames.forEach(({ el, dx, dy }) => {
        // transform only: will-change: opacity would make this a backdrop root
        // and kill the chip's glass while the explosion runs.
        el.style.willChange = "transform";
        el.style.opacity = "0";
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(0.3)`;
    });

    // Commit the origin state so the transition below actually runs.
    void root.offsetWidth;

    frames.forEach(({ el }, i) => {
        const delay = BURST_START + i * 45;
        // back-out on transform: the chip overshoots its slot and snaps back in
        el.style.transition = `transform 680ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 260ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
        el.style.transform = "translate3d(0, 0, 0) scale(1)";
        el.style.opacity = "1";
    });

    const cleanupDelay = BURST_START + frames.length * 45 + 900;
    window.setTimeout(() => {
        frames.forEach(({ el }) => {
            el.style.removeProperty("will-change");
            el.style.removeProperty("transition");
            el.style.removeProperty("transform");
            el.style.removeProperty("opacity");
        });
    }, cleanupDelay);
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100dvh;
    padding-top: calc(var(--ds-nav-h) + 3.5rem);
    padding-bottom: 5rem;
}

.hero__inner {
    display: grid;
    gap: 3.5rem;
    align-items: center;
}

.hero__copy {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    will-change: transform, opacity;
}

.hero__top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
}

.hero__eyebrow {
    letter-spacing: 0.16em;
}

.hero__title {
    margin-top: 0.25rem;
}

.hero__line {
    display: block;
    overflow: hidden;
    padding-bottom: 0.06em;
}

.hero__line > span {
    display: inline-block;
    will-change: transform;
}

.hero__lead {
    max-width: 46ch;
}

.hero__cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.6rem;
}

/* ---- visual: 3D stage + flat orbit ---- */
.hero__visual {
    position: relative;
    width: 100%;
    max-width: 30rem;
}

.hero__stage {
    width: 100%;
    will-change: transform;
}

/* The chips sit outside the stage's 3D transform on purpose: a backdrop-filter
   inside a 3D rendering context is not sampled in Chromium, so the glass would
   render as a plain transparent fill. Here only translate/scale apply. */
.hero__orbit {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
}

.hero__sat {
    position: absolute;
    display: none;
}

/* only layer that carries the explosion transform */
.hero__spark {
    display: inline-flex;
}

.hero__chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.8rem;
    border-radius: var(--ds-r-full);
    background: var(--ds-glass-strong);
    border: 1px solid var(--ds-glass-border);
    -webkit-backdrop-filter: blur(24px) saturate(170%);
    backdrop-filter: blur(24px) saturate(170%);
    box-shadow: var(--ds-shadow-soft);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.01em;
    color: var(--ds-text-muted);
    white-space: nowrap;
    animation: hero-float 7s var(--ds-ease-in-out) infinite;
    animation-delay: var(--sat-delay, 0s);
}

.hero__chip-icon {
    width: 1rem;
    height: 1rem;
    color: var(--ds-text);
}

/* top rim */
.hero__sat--1 {
    top: 0;
    left: 6%;
    --sat-delay: -0.4s;
    transform: translate(-50%, -66%);
}
.hero__sat--2 {
    top: 0;
    left: 50%;
    --sat-delay: -2.1s;
    transform: translate(-50%, -66%);
}
.hero__sat--3 {
    top: 0;
    left: 94%;
    --sat-delay: -3.6s;
    transform: translate(-50%, -66%);
}

/* bottom rim: two chips, evenly spaced */
.hero__sat--4 {
    bottom: 0;
    left: 25%;
    --sat-delay: -1.2s;
    transform: translate(-50%, 66%);
}
.hero__sat--5 {
    bottom: 0;
    left: 75%;
    --sat-delay: -4.6s;
    transform: translate(-50%, 66%);
}

@keyframes hero-float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-9px);
    }
}

.hero__cue {
    position: absolute;
    left: 50%;
    bottom: 1.75rem;
    transform: translateX(-50%);
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
}

.hero__cue-line {
    width: 1px;
    height: 2.5rem;
    background: linear-gradient(to bottom, var(--ds-text-faint), transparent);
}

@media (min-width: 1024px) {
    .hero {
        padding-top: var(--ds-nav-h);
    }
    .hero__inner {
        grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
        gap: 5rem;
    }
    .hero__visual {
        justify-self: end;
    }
    .hero__sat {
        display: block;
    }
    .hero__cue {
        display: flex;
    }
}
</style>
