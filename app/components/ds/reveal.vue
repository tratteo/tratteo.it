<template>
    <component
        :is="tag"
        ref="root"
        class="ds-reveal"
        :class="shown && 'is-shown'"
        :style="{
            '--ds-reveal-distance': distance,
            '--ds-reveal-duration': `${duration}s`,
            '--ds-reveal-delay': `${delay}s`,
            ...(ease ? { '--ds-reveal-ease': ease } : {}),
        }"
    >
        <div class="ds-reveal__inner" @animationend="onEnd">
            <slot />
        </div>
    </component>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        as?: keyof HTMLElementTagNameMap;
        delay?: number;
        duration?: number;
        /** Any CSS length. Defaults to the element's own height, so the content
            starts entirely outside the frame and enters from below. */
        distance?: string;
        amount?: number;
        once?: boolean;
        /** Any CSS timing function. Defaults to the system ease. */
        ease?: string;
    }>(),
    { as: "div", delay: 0, duration: 0.5, distance: "100%", amount: 0.12, once: true },
);

const prefersReduced = usePreferredReducedMotion();
const reduced = computed(() => prefersReduced.value === "reduce");
const tag = computed(() => props.as);

const root = useTemplateRef<HTMLElement>("root");

/* The frame is painted on the very first frame and never moves: no opacity, no
   filter, no layout shift. Only the content inside travels, starting a fixed
   offset below and cropped by the frame's bottom edge, then settling into it.

   Wrap text, not modules. A card, an image or a control should stay where it
   lands; the words inside it are what enters. */
const shown = ref(false);

const { stop } = useIntersectionObserver(
    root,
    (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
            shown.value = true;
            if (props.once) stop();
        } else if (!props.once) {
            shown.value = false;
        }
    },
    { threshold: props.amount },
);

/* Once the content has landed the mask can be released, otherwise it would keep
   cropping a magnetic pull or a hover that grows an element. */
function onEnd(event: AnimationEvent) {
    if (event.target !== event.currentTarget) return;
    if (!props.once) return;
    const el = root.value;
    if (!el) return;
    el.style.overflow = "visible";
    (event.target as HTMLElement).style.removeProperty("will-change");
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* Without script there is no trigger, so nothing may be masked: the content
   stays exactly where it is. The head script flags the document, and only then
   do the mask and the entry exist. */
.ds-reveal {
    overflow: visible;
}

.ds-reveal__inner {
    height: 100%;
}

html[data-js] .ds-reveal {
    overflow: hidden;
}

html[data-js] .ds-reveal__inner {
    /* The resting position before the entry runs. At the default distance the
       content sits entirely below the frame, so the frame reads as empty space
       until it slides in. */
    transform: translateY(var(--ds-reveal-distance, 100%));
    will-change: transform;
}

/* A keyframe animation, not a transition: an animation carries its own start
   value, so adding the class always replays it. A transition would need the
   offset to have been painted first, which a freshly mounted element cannot
   guarantee, and the entry would snap instead of sliding. */
html[data-js] .ds-reveal.is-shown .ds-reveal__inner {
    animation: ds-reveal-in var(--ds-reveal-duration, 0.5s) var(--ds-reveal-ease, var(--ds-ease)) var(--ds-reveal-delay, 0s) both;
}

@keyframes ds-reveal-in {
    from {
        transform: translateY(var(--ds-reveal-distance, 100%));
    }

    to {
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    html[data-js] .ds-reveal {
        overflow: visible;
    }

    html[data-js] .ds-reveal__inner,
    html[data-js] .ds-reveal.is-shown .ds-reveal__inner {
        transform: none;
        animation: none;
    }
}
</style>
