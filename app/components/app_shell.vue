<template>
    <u-app>
        <DsGridBg />
        <div id="app-frame" class="frame">
            <span class="frame__rail frame__rail--left" aria-hidden="true" />
            <span class="frame__rail frame__rail--right" aria-hidden="true" />
            <LandingNavBar />
            <main class="frame__main">
                <slot />
            </main>
            <LandingFooterBar />
        </div>
    </u-app>
</template>

<script lang="ts" setup>
/* The one page frame: backdrop, rails, nav, content, footer. Every route is
   rendered inside it, including the error page, so the shell, the rails and the
   footer can never drift between pages. */
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* The rails are the outer wall of every flush module inside, so they are drawn
   above the content, over the outermost hairline of each module. They span the
   whole frame, footer included.

   On a small screen the frame is the viewport itself, so the rails sit on the
   physical screen edge and the module padding does the insetting. From the
   container's max width up they move to the container edges. */
.frame {
    position: relative;
}

.frame__rail {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: var(--ds-hair);
    background: var(--ds-line);
    pointer-events: none;
}

.frame__rail--left {
    left: 0;
}

.frame__rail--right {
    right: 0;
}

@media (min-width: 1280px) {
    .frame__rail--left {
        left: calc(50% - var(--ds-container) / 2);
    }

    .frame__rail--right {
        right: calc(50% - var(--ds-container) / 2);
    }
}
</style>
