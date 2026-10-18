<template>
    <section id="top" ref="heroEl" class="hero ds-container">
        <div class="hero__inner">
            <motion.div class="hero__copy" :style="{ y: copyY, opacity: copyOpacity }">
                <div class="hero__meta">
                    <DsBadge tone="ok" :label="hero.availability" />
                    <span class="hero__rule" aria-hidden="true" />
                    <span class="eyebrow hero__eyebrow">{{ hero.eyebrow }}</span>
                </div>

                <h1 class="display-2xl hero__title">
                    <span v-for="(line, i) in hero.titleLines" :key="line" class="hero__line">
                        <motion.span
                            :initial="{ y: '115%' }"
                            :animate="{ y: 0 }"
                            :transition="{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.075 + i * 0.075 }"
                        >
                            {{ line }}
                        </motion.span>
                    </span>
                </h1>

                <motion.p
                    class="lead hero__lead"
                    :initial="{ opacity: 0, y: 18 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.34 }"
                >
                    {{ hero.lead }}
                </motion.p>

                <motion.div
                    class="hero__cta"
                    :initial="{ opacity: 0, y: 18 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }"
                >
                    <DsMagnetic :strength="0.18" :max="12">
                        <DsButton :to="hero.primaryCta.href" icon="material-symbols:arrow-outward-rounded">{{ hero.primaryCta.label }}</DsButton>
                    </DsMagnetic>
                    <DsButton variant="ghost" :to="hero.secondaryCta.href" icon="material-symbols:south-rounded" glyph="down">{{ hero.secondaryCta.label }}</DsButton>
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
                    :style="{ y: stageY, scale: stageScale }"
                >
                    <LandingHeroWidget :enter-delay="ENTER_DELAY + 0.2" />
                </motion.div>
            </motion.div>
        </div>

        <motion.div class="hero__cue" :style="{ opacity: cueOpacity }" aria-hidden="true">
            <span class="mono-micro">Scroll</span>
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
const cueOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

/* The copy lands first, then the console rises in and boots its own rows in
   sequence. Kept tight: the whole opening settles inside a second. */
const ENTER_DELAY = 0.6;
const ENTER_DURATION = 0.7;
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    /* Start at the top: on a phone the copy plus the console are taller than
       the viewport, and centring would push the headline under the nav. */
    justify-content: flex-start;
    min-height: 100dvh;
    padding-top: calc(var(--ds-nav-h) + 2rem);
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

/* Telemetry header: status on the left, then a hairline running to the identity
   label on the right. */
.hero__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 0.9rem;
}

.hero__rule {
    flex: 1 1 2rem;
    height: var(--ds-hair);
    background: var(--ds-line);
}

.hero__eyebrow {
    letter-spacing: 0.06em;
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

/* No clipping wrapper here: the magnetic pull on the primary needs room to move
   without being cropped. */
.hero__visual {
    position: relative;
    width: 100%;
    max-width: 33rem;
}

.hero__stage {
    width: 100%;
    will-change: transform;
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
    color: var(--ds-text-faint);
}

.hero__cue-line {
    width: var(--ds-hair);
    height: 2.5rem;
    background: linear-gradient(to bottom, var(--ds-text-faint), transparent);
}

@media (min-width: 1024px) {
    .hero {
        justify-content: center;
        padding-top: var(--ds-nav-h);
    }
    .hero__inner {
        grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
        gap: 5rem;
    }
    .hero__visual {
        justify-self: end;
    }
    .hero__cue {
        display: flex;
    }
}
</style>
