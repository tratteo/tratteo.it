<template>
    <section id="services" class="section ds-container">
        <DsSectionHead
            eyebrow="What I actually do"
            :title="['Eight ways', 'I can help you ship.']"
            lead="Whether you're starting from a blank page or a codebase that's gotten away from you, there's a lane here. And if yours isn't listed, that's what the email address is for."
        />

        <div class="services__grid">
            <DsReveal v-for="(service, i) in services" :key="service.title" :delay="(i % 4) * 0.06">
                <DsGlassCard interactive padding="lg" class="flex h-full flex-col gap-3.5">
                    <div class="services__icon">
                        <u-icon :name="service.icon" class="size-5" />
                    </div>
                    <h3 class="services__title">{{ service.title }}</h3>
                    <p class="services__desc">{{ service.description }}</p>
                    <div class="services__tags">
                        <span v-for="tag in service.tags" :key="tag" class="services__tag">{{ tag }}</span>
                    </div>
                </DsGlassCard>
            </DsReveal>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { services } from "~/data/landing";
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.services__grid {
    margin-top: 3rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
}

.services__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--ds-r-sm);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass-strong);
    color: var(--ds-text);
}

.services__title {
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--ds-text);
}

.services__desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--ds-text-muted);
    flex: 1;
}

.services__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    padding-top: 0.4rem;
}

.services__tag {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ds-text-dim);
    padding: 0.2rem 0.5rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-hairline);
}

@media (min-width: 640px) {
    .services__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1280px) {
    .services__grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.15rem;
    }
}
</style>
