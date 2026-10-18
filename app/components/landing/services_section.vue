<template>
    <section id="services" class="services ds-container">
        <div class="services__grid ds-matrix ds-bleed">
            <DsSectionHead
                class="ds-head-row"
                index="01"
                eyebrow="What I actually do"
                :title="['Eight ways', 'I can help you ship.']"
                lead="Whether you're starting from a blank page or a codebase that's gotten away from you, there's a lane here. And if yours isn't listed, that's what the email address is for."
            />

            <!-- The cell is static: only the words inside it enter. -->
            <DsCell
                v-for="(service, i) in services"
                :key="service.title"
                interactive
                padding="md"
                :index="`[${String(i + 1).padStart(2, '0')}]`"
                class="services__cell"
            >
                <div class="services__icon">
                    <u-icon :name="service.icon" class="size-[1.15rem]" />
                </div>

                <DsReveal :delay="(i % 4) * 0.05">
                    <div class="services__copy">
                        <h3 class="services__title">{{ service.title }}</h3>
                        <p class="services__desc">{{ service.description }}</p>
                    </div>
                </DsReveal>

                <div class="services__tags">
                    <span v-for="tag in service.tags" :key="tag" class="services__tag mono-micro">{{ tag }}</span>
                </div>
            </DsCell>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { services } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.services__grid {
    grid-template-columns: 1fr;
}

.services__cell {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.services__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
    color: var(--ds-text);
}

/* The text run takes the room, so the tag row stays on the floor of the card. */
.services__copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.8rem;
}

.services__title {
    margin-top: 0.4rem;
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--ds-text);
}

.services__desc {
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
}

.services__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding-top: 0.35rem;
}

.services__tag {
    padding: 0.2rem 0.45rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    color: var(--ds-text-dim);
}

@media (min-width: 640px) {
    .services__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .services__grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
