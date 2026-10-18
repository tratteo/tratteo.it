<template>
    <div class="stage">
        <StickyElement :amplitude="14">
            <span class="stage__tag mono-micro">Drag me</span>
        </StickyElement>
        <span class="stage__read mono-micro">The element trails the cursor</span>
    </div>
</template>

<script lang="ts" setup>
/* Demo frame for the article about the sticky element: a square target rather
   than a pill, so the demo stays inside the site's geometry. */
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 2.5rem 1rem;
    margin-block: 2rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
}

.stage__tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 7.5rem;
    height: 7.5rem;
    border: var(--ds-hair) solid var(--ds-line-strong);
    background: var(--ds-surface-3);
    color: var(--ds-text);
    pointer-events: none;
    user-select: none;
}

.stage__read {
    color: var(--ds-text-faint);
}
</style>
