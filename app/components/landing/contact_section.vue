<template>
    <section id="contact" class="contact">
        <div class="ds-container contact__inner">
            <DsReveal>
                <span class="eyebrow">{{ contact.eyebrow }}</span>
            </DsReveal>

            <h2 class="display-2xl contact__title">
                <DsReveal v-for="(line, i) in contact.title" :key="line" as="span" class="contact__line" :delay="i * 0.08">{{ line }}</DsReveal>
            </h2>

            <DsReveal :delay="0.1">
                <p class="lead contact__lead">{{ contact.lead }}</p>
            </DsReveal>

            <DsReveal :delay="0.16">
                <DsMagnetic :strength="0.18" :max="16">
                    <a :href="contact.primaryCta.href" class="contact__email" :aria-label="`Email me at ${contact.email}`">
                        <span class="contact__email-text">{{ contact.email }}</span>
                        <span class="contact__email-icon">
                            <u-icon name="material-symbols:arrow-outward-rounded" class="size-6" />
                        </span>
                    </a>
                </DsMagnetic>
            </DsReveal>

            <DsReveal :delay="0.22">
                <div class="contact__meta">
                    <DsCopyField :value="contact.email" />
                    <span class="contact__location">{{ contact.location }}</span>
                </div>
            </DsReveal>

            <DsReveal :delay="0.28">
                <div class="contact__socials">
                    <a
                        v-for="social in socials"
                        :key="social.name"
                        :href="social.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="contact__social"
                        :aria-label="social.name"
                        :title="social.name"
                    >
                        <u-icon :name="social.icon.name" class="size-5" />
                    </a>
                    <NuxtLink to="/articles" class="contact__social-link">Blog</NuxtLink>
                    <NuxtLink to="/minecraft-mods" class="contact__social-link">Minecraft mods</NuxtLink>
                </div>
            </DsReveal>
        </div>
    </section>
</template>

<script lang="ts" setup>
import sources from "~/data/sources.json";
import { contact } from "~/data/landing";

const socials = sources.socials ?? [];
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.contact {
    padding-top: 6rem;
    padding-bottom: 5rem;
}

.contact__inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
}

.contact__inner::before {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin-bottom: 2.5rem;
    background: linear-gradient(to right, var(--ds-hairline), transparent);
}

.contact__title {
    margin-top: 0.5rem;
}

.contact__line {
    display: block;
}

.contact__lead {
    max-width: 48ch;
}

.contact__email {
    display: inline-flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 1.5rem);
    width: fit-content;
    margin-top: 1rem;
}

.contact__email-text {
    position: relative;
    font-size: clamp(1.75rem, 6vw, 4rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--ds-text);
}

.contact__email-text::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.12em;
    height: 2px;
    width: 100%;
    background: var(--ds-text);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s var(--ds-ease);
}

.contact__email:hover .contact__email-text::after {
    transform: scaleX(1);
}

.contact__email-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(2.5rem, 5vw, 3.5rem);
    height: clamp(2.5rem, 5vw, 3.5rem);
    flex-shrink: 0;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-hairline-strong);
    color: var(--ds-text);
    transition:
        background-color 0.4s var(--ds-ease),
        color 0.4s var(--ds-ease),
        transform 0.5s var(--ds-ease);
}

.contact__email:hover .contact__email-icon {
    background: var(--ds-ink);
    color: var(--ds-bg);
    border-color: transparent;
}

.contact__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}

.contact__location {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--ds-text-dim);
}

.contact__socials {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-top: 2rem;
}

.contact__social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    background: var(--ds-glass);
    color: var(--ds-text-muted);
    transition:
        color 0.3s var(--ds-ease),
        border-color 0.3s var(--ds-ease),
        transform 0.4s var(--ds-ease);
}

.contact__social:hover {
    color: var(--ds-text);
    border-color: var(--ds-hairline-strong);
    transform: translateY(-2px);
}

.contact__social-link {
    font-size: 0.875rem;
    color: var(--ds-text-muted);
    padding: 0.6rem 1rem;
    border-radius: var(--ds-r-full);
    border: 1px solid var(--ds-glass-border);
    transition:
        color 0.3s var(--ds-ease),
        border-color 0.3s var(--ds-ease);
}

.contact__social-link:hover {
    color: var(--ds-text);
    border-color: var(--ds-hairline-strong);
}
</style>
