<template>
    <div class="backdrop" aria-hidden="true">
        <div class="ds-dot-matrix backdrop__layer backdrop__dots" />
        <div class="ds-coord-grid backdrop__layer backdrop__coords" />
    </div>
</template>

<script lang="ts" setup>
/* Pure CSS spatial texture: a 32px dot matrix under a 64px coordinate grid.
   Fixed, so the plane stays still while content scrolls over it. Cheaper than
   JS, and it honours reduced motion by never animating in the first place.

   Both layers are phased off the centre rather than the viewport edge, because
   the page rails are symmetric about it. The rail offset (640px) is a whole
   number of 64px cells, so a grid line lands exactly on both rails at any
   viewport width. */
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.backdrop {
    position: fixed;
    inset: 0;
    z-index: -10;
    overflow: hidden;
    pointer-events: none;
    background: var(--ds-canvas);
}

.backdrop__layer {
    position: absolute;
    inset: 0;
}

/* `(area - tile) / 2 + tile / 2` puts the first tile's edge on the centre line,
   which is where the phase has to start for the rails to sit on a seam. */
.backdrop__dots {
    background-position: calc(50% + var(--ds-grid-dot) / 2) 0;
}

.backdrop__coords {
    background-position: calc(50% + var(--ds-grid-coord) / 2) 0;
}
</style>
