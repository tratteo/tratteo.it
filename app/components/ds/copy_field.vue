<template>
    <button class="ds-copy" type="button" :aria-label="`Copy ${value}`" @click="copy">
        <span class="ds-copy__lead">
            <u-icon name="material-symbols:mail-outline-rounded" class="size-4" />
        </span>
        <span class="ds-copy__value">{{ value }}</span>
        <span class="ds-copy__state" :class="copied && 'is-copied'">
            <span class="ds-copy__label mono-micro">{{ copied ? "Copied" : "Copy" }}</span>
            <u-icon :name="copied ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-outline-rounded'" class="size-3.5" />
        </span>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps<{ value: string }>();

const clipboard = useClipboard();
const copied = ref(false);

function copy() {
    clipboard.copy(props.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* Terminal strip: one hairline frame, monospace value, and a discrete action
   cell on the right separated by the same hairline. */
.ds-copy {
    display: inline-flex;
    align-items: stretch;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
    color: var(--ds-text);
    cursor: pointer;
    overflow: hidden;
    transition: border-color var(--ds-quick) var(--ds-ease-out);
}

.ds-copy:hover {
    border-color: var(--ds-line-strong);
}

.ds-copy__lead {
    display: flex;
    align-items: center;
    padding-inline: 0.7rem;
    color: var(--ds-text-dim);
}

.ds-copy__value {
    display: flex;
    align-items: center;
    padding: 0.55rem 0.9rem 0.55rem 0;
    border-right: var(--ds-hair) solid var(--ds-line);
    padding-right: 0.9rem;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    letter-spacing: -0.01em;
}

.ds-copy__state {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding-inline: 0.7rem;
    color: var(--ds-text-dim);
    transition:
        background-color var(--ds-quick) var(--ds-ease-out),
        color var(--ds-quick) var(--ds-ease-out);
}

.ds-copy:hover .ds-copy__state {
    background: var(--ds-surface-3);
    color: var(--ds-text);
}

.ds-copy__state.is-copied {
    color: var(--ds-ok);
}

.ds-copy__label {
    display: none;
}

@media (min-width: 480px) {
    .ds-copy__label {
        display: inline;
    }
}
</style>
