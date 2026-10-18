<template>
    <component
        :is="component"
        :href="to"
        :type="component === 'button' ? 'button' : undefined"
        :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener noreferrer' : undefined"
        class="ds-btn"
        :class="[`ds-btn--${variant}`, size === 'sm' && 'ds-btn--sm', block && 'ds-btn--block', flush && 'ds-btn--flush']"
    >
        <span class="ds-btn__label"><slot /></span>
        <span v-if="icon" class="ds-btn__icon" :class="glyph === 'vertical' && 'ds-btn__icon--clip'">
            <template v-if="glyph === 'vertical'">
                <u-icon :name="icon" class="ds-btn__glyph ds-btn__glyph--exit" />
                <u-icon :name="icon" class="ds-btn__glyph ds-btn__glyph--enter" />
            </template>
            <u-icon v-else :name="icon" class="ds-btn__glyph" :class="`ds-btn__glyph--${glyph}`" />
        </span>
    </component>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        /** Omit for a button that performs an action rather than navigating. */
        to?: string;
        icon?: string;
        variant?: "solid" | "ghost" | "quiet";
        /** Control height. sm matches the square icon controls in the nav. */
        size?: "md" | "sm";
        /** Which way the glyph travels on hover. Follow the icon's own arrow. */
        glyph?: "out" | "down" | "vertical" | "none";
        external?: boolean;
        /** Full width, for a button inside a stacked panel. */
        block?: boolean;
        /** Drop the own frame so the button can sit inside a control strip. */
        flush?: boolean;
    }>(),
    { variant: "solid", size: "md", glyph: "out", external: false, block: false, flush: false },
);

const component = computed(() => {
    if (!props.to) return "button";
    return props.to.startsWith("/") && !props.to.startsWith("//") ? resolveComponent("NuxtLink") : "a";
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* Rectilinear control. 2px radius, hairline frame, and the nested icon sitting
   in its own square cell so the trailing arrow always has a home. */
.ds-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.35rem 0.35rem 0.35rem 1rem;
    border: var(--ds-hair) solid transparent;
    border-radius: var(--ds-r-control);
    font-family: var(--font-heading);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    cursor: pointer;
    user-select: none;
    transition:
        background-color var(--ds-quick) var(--ds-ease-out),
        border-color var(--ds-quick) var(--ds-ease-out),
        color var(--ds-quick) var(--ds-ease-out);
}

.ds-btn__icon {
    display: flex;
    width: 1.9rem;
    height: 1.9rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: var(--ds-r-control);
    transition: background-color var(--ds-quick) var(--ds-ease-out);
}

.ds-btn__label {
    white-space: nowrap;
}

.ds-btn__glyph {
    width: 1rem;
    height: 1rem;
    transition: transform 0.35s var(--ds-ease);
}

/* The glyph leaves in the direction it points. A downward arrow that slid up
   and to the right would read as the wrong instrument. */
.ds-btn:hover .ds-btn__glyph--out {
    transform: translate(2px, -2px);
}

.ds-btn:hover .ds-btn__glyph--down {
    transform: translate(0, 3px);
}

/* Vertical loop: the glyph leaves through the top edge and a copy re-enters from
   the bottom, the same gesture the work rows use, on the icon's own axis. The
   cell clips, so nothing spills outside the square. */
.ds-btn__icon--clip {
    position: relative;
    overflow: hidden;
}

.ds-btn__glyph--exit,
.ds-btn__glyph--enter {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: 1rem;
    translate: -50% -50%;
    transition: transform 0.45s var(--ds-ease);
}

.ds-btn__glyph--enter {
    transform: translateY(140%);
}

.ds-btn:hover .ds-btn__glyph--exit {
    transform: translateY(-140%);
}

.ds-btn:hover .ds-btn__glyph--enter {
    transform: translateY(0);
}

/* sm: 36px tall, the same box as the theme toggle and the nav's icon controls. */
.ds-btn--sm {
    gap: 0.5rem;
    padding: 0.28rem 0.28rem 0.28rem 0.8rem;
    font-size: 0.8125rem;
}

/* Full width: the label takes the room, the glyph keeps its square. */
.ds-btn--block {
    display: flex;
    width: 100%;
}

.ds-btn--block .ds-btn__label {
    flex: 1;
    text-align: left;
}

.ds-btn--sm .ds-btn__icon {
    width: 1.55rem;
    height: 1.55rem;
}

.ds-btn--sm .ds-btn__glyph {
    width: 0.9rem;
    height: 0.9rem;
}

/* Primary: inverted fill. Mixing towards the canvas darkens it in dark mode and
   lightens it in light mode, so one rule covers both themes. */
.ds-btn--solid {
    background: var(--ds-invert);
    color: var(--ds-on-invert);
    border-color: var(--ds-invert);
}

.ds-btn--solid .ds-btn__icon {
    background: color-mix(in srgb, var(--ds-on-invert) 12%, transparent);
}

.ds-btn--solid:hover {
    background: color-mix(in srgb, var(--ds-invert) 90%, var(--ds-canvas));
    border-color: color-mix(in srgb, var(--ds-invert) 90%, var(--ds-canvas));
}

/* Outlined: the default secondary action. */
.ds-btn--ghost {
    background: transparent;
    color: var(--ds-text);
    border-color: var(--ds-line-strong);
}

.ds-btn--ghost .ds-btn__icon {
    background: var(--ds-surface-3);
}

.ds-btn--ghost:hover {
    background: var(--ds-surface-2);
    border-color: var(--ds-line-contrast);
}

/* Inside a control strip the segments butt together and only the strip is
   framed, so a segment keeps its fill but drops its own border and radius. */
.ds-btn--flush {
    border-radius: 0;
    border-color: transparent;
}

.ds-btn--flush:hover {
    border-color: transparent;
}

/* Quiet: no frame, for tertiary actions inside a dense module. */
.ds-btn--quiet {
    background: transparent;
    color: var(--ds-text-muted);
    border-color: transparent;
}

.ds-btn--quiet:hover {
    color: var(--ds-text);
    background: var(--ds-surface-2);
}
</style>
