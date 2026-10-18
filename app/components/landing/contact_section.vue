<template>
    <section id="contact" class="contact ds-container">
        <div class="contact__grid ds-matrix ds-bleed">
            <div class="ds-head-row contact__head">
                <span class="mono-micro contact__index">07</span>
                <span class="eyebrow">{{ contact.eyebrow }}</span>
                <span class="contact__rule" aria-hidden="true" />
            </div>

            <DsReveal class="contact__title-cell" as="div">
                <h2 class="display-2xl contact__title">
                    <span v-for="line in contact.title" :key="line" class="contact__line">{{ line }}</span>
                </h2>
            </DsReveal>

            <DsReveal class="contact__lead-cell" :delay="0.06" as="div">
                <p class="lead contact__lead">{{ contact.lead }}</p>
            </DsReveal>

            <!-- Reach: a live wireframe globe, standing in for the old "working
                 worldwide" line so the claim has an instrument behind it. -->
            <div class="contact__globe-cell">
                <div class="contact__reach">
                    <div class="contact__globe">
                        <DsWireGlobe />
                        <span class="contact__globe-mark ds-crosshair" aria-hidden="true" />
                    </div>
                    <div class="contact__coords">
                        <span class="mono-micro contact__coords-label">Coordinates</span>
                        <span class="contact__location">
                            <u-icon name="twemoji:flag-italy" class="contact__flag" />
                            {{ contact.location }}
                        </span>
                        <span class="mono-micro contact__coords-read">42.5° N · 12.5° E · CET · Remote first</span>
                    </div>
                </div>
            </div>

            <div class="contact__action-cell">
                <div class="contact__action">
                    <DsMagnetic :strength="0.18" :max="16">
                        <a :href="contact.primaryCta.href" class="contact__email" :aria-label="`Email me at ${contact.email}`">
                            <span class="contact__email-text ds-strong">{{ contact.email }}</span>
                            <span class="contact__email-icon">
                                <u-icon name="material-symbols:arrow-outward-rounded" class="size-5" />
                            </span>
                        </a>
                    </DsMagnetic>

                    <div class="contact__meta">
                        <DsCopyField :value="contact.email" />
                        <span class="contact__socials">
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
                                <u-icon :name="social.icon.name" class="size-[1.15rem]" />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
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

.contact__grid {
    grid-template-columns: 1fr;
}

/* A compact strip rather than the full section head: it is the boundary marker
   for the last module, not a title block of its own. */
.contact__head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding-block: calc(var(--ds-pad) * 1.1);
}

.contact__index {
    color: var(--ds-text-faint);
}

.contact__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}

.contact__title-cell {
    padding: calc(var(--ds-pad) * 1.4) var(--ds-pad) calc(var(--ds-pad) * 1.2);
}

.contact__title {
    margin: 0;
}

.contact__line {
    display: block;
}

.contact__lead-cell {
    padding: var(--ds-pad);
}

.contact__lead {
    max-width: 46ch;
}

/* ---- reach ---- */
/* Globe beside the coordinates. The layout lives one level in, because a reveal
   wrapper always introduces its own inner element. */
.contact__globe-cell {
    padding: var(--ds-pad);
}

.contact__reach {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
}

@media (max-width: 479px) {
    .contact__reach {
        grid-template-columns: 1fr;
        justify-items: start;
    }
}

.contact__globe {
    position: relative;
    flex: 0 0 auto;
    width: clamp(6.5rem, 18vw, 10rem);
    height: clamp(6.5rem, 18vw, 10rem);
}

.contact__globe-mark {
    top: 50%;
    left: 50%;
}

.contact__coords {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
}

.contact__coords-label {
    color: var(--ds-text-faint);
}

.contact__location {
    font-family: var(--font-heading);
    font-size: clamp(0.9375rem, 1.4vw, 1.125rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--ds-text);
}

.contact__flag {
    margin-right: 0.4rem;
    vertical-align: -0.1em;
}

.contact__coords-read {
    color: var(--ds-text-dim);
}

/* ---- action ---- */
.contact__action-cell {
    padding: var(--ds-pad);
}

.contact__action {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

/* The address is the primary action, so it stays oversized. The wipe under it
   and the invert on the icon are the micro-interactions it already had. */
.contact__email {
    display: inline-flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 1.25rem);
    width: fit-content;
}

.contact__email-text {
    position: relative;
    font-size: clamp(1.25rem, 3.4vw, 2.5rem);
    line-height: 1;
    overflow-wrap: anywhere;
}

.contact__email-text::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.12em;
    height: var(--ds-hair);
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
    width: clamp(2.25rem, 4vw, 2.75rem);
    height: clamp(2.25rem, 4vw, 2.75rem);
    flex-shrink: 0;
    border: var(--ds-hair) solid var(--ds-line-strong);
    border-radius: var(--ds-r-control);
    color: var(--ds-text);
    transition:
        background-color var(--ds-quick) var(--ds-ease-out),
        border-color var(--ds-quick) var(--ds-ease-out),
        color var(--ds-quick) var(--ds-ease-out);
}

.contact__email:hover .contact__email-icon {
    background: var(--ds-invert);
    border-color: var(--ds-invert);
    color: var(--ds-on-invert);
}

.contact__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: var(--ds-hair) solid var(--ds-line);
}

.contact__socials {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.contact__social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-1);
    color: var(--ds-text-muted);
    transition:
        color var(--ds-quick) var(--ds-ease-out),
        border-color var(--ds-quick) var(--ds-ease-out),
        background-color var(--ds-quick) var(--ds-ease-out);
}

.contact__social:hover {
    color: var(--ds-text);
    border-color: var(--ds-line-contrast);
    background: var(--ds-surface-3);
}

@media (min-width: 768px) {
    .contact__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .contact__title-cell,
    .contact__action-cell {
        grid-column: 1 / -1;
    }
}
</style>
