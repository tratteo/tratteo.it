<template>
    <span class="ds-badge" :class="tone !== 'default' && `ds-badge--${tone}`">
        <span v-if="tone !== 'default'" class="ds-pip" :class="`ds-pip--${tone}`" />
        <u-icon v-else-if="icon" :name="icon" class="ds-badge__icon" />
        <span><slot>{{ label }}</slot></span>
    </span>
</template>

<script lang="ts" setup>
/* Non-pill status badge. Square pip, hairline frame, monospace label. The tone
   drives both the pip and the label colour, so a status is legible at a glance
   without reading it. ok pings, warn and info rest, standby is neutral. */
withDefaults(defineProps<{ label?: string; icon?: string; tone?: "default" | "ok" | "warn" | "info" | "standby" }>(), {
    tone: "default",
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.ds-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.55rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-2);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.4;
    text-transform: uppercase;
    color: var(--ds-text-muted);
    white-space: nowrap;
}

.ds-badge--ok {
    color: var(--ds-ok);
}

.ds-badge--warn {
    color: var(--ds-warn);
}

.ds-badge--info {
    color: var(--ds-info);
}

.ds-badge--standby {
    color: var(--ds-text-dim);
}

.ds-badge__icon {
    width: 0.875rem;
    height: 0.875rem;
    opacity: 0.7;
}
</style>
