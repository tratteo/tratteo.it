<template>
    <div class="mock">
        <MorphingGradient />
        <span class="mock__read mono-micro">Move the cursor · the gradient follows</span>
    </div>
</template>

<script lang="ts" setup>
/* Demo frame for the article about this component. It carries its own stacking
   context, because the blob paints itself on a negative z-index and would
   otherwise sink behind the page background and never be seen. No frame and no
   clipping: the blob is the subject, so it gets the room. */
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.mock {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    min-height: 18rem;
    margin-block: 2.5rem;
}

.mock__read {
    color: var(--ds-text-faint);
}
</style>
