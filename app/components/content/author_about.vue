<template>
    <div id="author-about" class="author">
        <div class="author__head">
            <span class="mono-micro author__label">About the author</span>
            <span class="author__rule" aria-hidden="true" />
        </div>

        <div class="author__body">
            <img :src="src" :alt="name" class="author__avatar" loading="lazy" />
            <div class="author__copy">
                <p class="author__name ds-strong">{{ name }}</p>
                <div class="author__text"><slot name="body" /></div>
            </div>
        </div>

        <div v-if="$slots.actions" class="author__actions"><slot name="actions" /></div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ src: string; name: string }>();
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* Author block: a module like any other, with the portrait in its own hairline
   square so it matches the rest of the grid. */
.author {
    display: flex;
    flex-direction: column;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-cell);
    background: var(--ds-surface-1);
}

.author__head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem var(--ds-pad);
    border-bottom: var(--ds-hair) solid var(--ds-line);
}

.author__label {
    color: var(--ds-text-dim);
}

.author__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}

.author__body {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    padding: var(--ds-pad);
}

.author__avatar {
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    object-fit: cover;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-2);
}

.author__copy {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
}

.author__name {
    font-size: 0.9375rem;
}

.author__text {
    font-size: 0.8125rem;
    line-height: 1.65;
    color: var(--ds-text-muted);
}

.author__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem var(--ds-pad);
    border-top: var(--ds-hair) solid var(--ds-line);
}
</style>
