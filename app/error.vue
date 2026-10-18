<template>
    <AppShell>
        <div class="err ds-page">
            <section class="ds-container">
                <div class="err__grid ds-matrix ds-bleed">
                    <div class="ds-head-row err__head">
                        <span class="mono-micro err__index">ERR</span>
                        <span class="eyebrow">Signal lost</span>
                        <span class="err__rule" aria-hidden="true" />
                        <span class="mono-micro err__code">{{ statusCode }}</span>
                    </div>

                    <div class="err__body">
                        <span class="err__figure">{{ statusCode }}</span>

                        <div class="err__copy">
                            <h1 class="display-xl err__title">{{ headline }}</h1>
                            <p class="lead err__lead">{{ message }}</p>
                        </div>

                        <div class="err__actions">
                            <DsButton icon="material-symbols:north-rounded" glyph="none" @click="backHome">Back home</DsButton>
                            <DsButton to="/articles" variant="ghost" size="sm" icon="material-symbols:archive-outline-rounded" glyph="vertical">Read something useful</DsButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </AppShell>
</template>

<script lang="ts" setup>
const error = useError();

const statusCode = computed(() => error.value?.statusCode ?? 404);

const headline = computed(() => {
    if (statusCode.value === 404) return "This page moved, or never existed.";
    if (statusCode.value >= 500) return "Something broke on my side.";
    return "That request didn't go through.";
});

const message = computed(() => {
    if (statusCode.value === 404) return "The link is dead or the URL has a typo in it. The rest of the site is fine.";
    return error.value?.statusMessage || "Give it another go, it usually works on the second attempt.";
});

useSeoMeta({
    title: statusCode.value.toString(),
    description: error.value?.statusMessage,
});

defineOgImage("Default.takumi", {
    title: "Signal lost.",
    subtitle: "That page isn't here, but the rest of the site is.",
    eyebrow: "Matteo Beltrame · Error handling",
    status: `Status ${statusCode.value}`,
    footer: ["Home", "Articles", "Minecraft mods", "Get in touch"],
});

function backHome() {
    clearError({ redirect: "/" });
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.err__grid {
    grid-template-columns: 1fr;
}

.err__head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-block: calc(var(--ds-pad) * 1.1);
}

.err__index,
.err__code {
    color: var(--ds-text-faint);
}

.err__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}

/* The body reads as an instrument report: the code oversized, the explanation
   beside it, the way out underneath. */
.err__body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: calc(var(--ds-pad) * 4) var(--ds-pad) calc(var(--ds-pad) * 5);
}

.err__figure {
    font-family: var(--font-heading);
    font-size: clamp(3rem, 12vw, 8rem);
    font-weight: 500;
    letter-spacing: -0.05em;
    line-height: 0.9;
    color: var(--ds-text);
}

.err__copy {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 46ch;
}

.err__title {
    margin: 0;
}

.err__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
}

@media (min-width: 768px) {
    .err__body {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 2rem 3rem;
    }

    .err__copy {
        flex: 1 1 24rem;
        padding-bottom: 0.5rem;
    }

    .err__actions {
        flex: 0 0 auto;
        padding-bottom: 0.35rem;
    }
}
</style>
