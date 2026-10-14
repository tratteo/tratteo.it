<template>
    <button class="ds-copy" type="button" :aria-label="`Copy ${value}`" @click="copy">
        <u-icon name="material-symbols:mail-outline-rounded" class="size-4 opacity-60" />
        <span class="ds-copy__value">{{ value }}</span>
        <span class="ds-copy__state" :class="copied && 'is-copied'">
            <u-icon :name="copied ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-outline-rounded'" class="size-4" />
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

.ds-copy {
    @apply inline-flex cursor-pointer items-center gap-3;
    padding: 0.5rem 0.5rem 0.5rem 0.9rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    color: var(--ds-text);
    transition:
        background-color 0.3s var(--ds-ease),
        border-color 0.3s var(--ds-ease);
}

.ds-copy:hover {
    border-color: var(--ds-hairline-strong);
}

.ds-copy__value {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    letter-spacing: -0.01em;
}

.ds-copy__state {
    @apply flex size-7 items-center justify-center rounded-full;
    background: color-mix(in srgb, var(--ds-text) 8%, transparent);
    transition:
        background-color 0.3s var(--ds-ease),
        color 0.3s var(--ds-ease);
}

.ds-copy__state.is-copied {
    background: var(--ds-live);
    color: #04120c;
}
</style>
