<template>
    <div class="mods-page ds-page">
        <!-- 01 · the pitch, the numbers, and the plate -->
        <section class="ds-container">
            <div class="mods__head ds-matrix ds-bleed">
                <div class="ds-head-row mods__head-row">
                    <DsSectionHead
                        as="h1"
                        index="01"
                        eyebrow="Off the clock"
                        :title="['Yeah, I also', 'mod Minecraft.']"
                        lead="Five mods I wrote and still maintain, most of them small quality-of-life fixes for problems the vanilla game never solved. All free, all open source."
                    />

                    <div class="mods__actions">
                        <DsButton to="#mods" icon="material-symbols:south-rounded" glyph="down">Browse the mods</DsButton>
                        <a :href="github" target="_blank" rel="noopener noreferrer" class="mods__ghost mono-micro">
                            <u-icon name="mdi:github" class="size-3.5" />
                            github.com/trat-mods
                        </a>
                    </div>
                </div>

                <div class="mods__stats ds-matrix ds-matrix--inset">
                    <div class="mods__stat">
                        <span class="mono-micro mods__stat-label">[01] {{ mods.downloadLabel }}</span>
                        <span class="mods__stat-value">{{ mods.downloads }}</span>
                        <DsBadge tone="ok" class="mods__stat-badge">Live</DsBadge>
                    </div>
                    <div class="mods__stat">
                        <span class="mono-micro mods__stat-label">[02] Published mods</span>
                        <span class="mods__stat-value">{{ String(modList.length).padStart(2, "0") }}</span>
                        <DsBadge tone="ok" class="mods__stat-badge">Maintained</DsBadge>
                    </div>
                    <div class="mods__stat">
                        <span class="mono-micro mods__stat-label">[03] Loaders</span>
                        <span class="mods__stat-value">{{ String(loaders.length).padStart(2, "0") }}</span>
                        <span class="mono-micro mods__stat-note">{{ loaders.join(" · ") }}</span>
                        <DsBadge tone="ok" class="mods__stat-badge">Supported</DsBadge>
                    </div>
                </div>

                <!-- The plate: the game itself, with the character breaking the
                     frame the way the landing band does. -->
                <div class="mods__plate">
                    <img src="/thumbnails/minecraft.webp" alt="" aria-hidden="true" class="mods__plate-img" loading="lazy" />
                    <img src="/icons/steve.png" alt="" aria-hidden="true" class="mods__steve" loading="lazy" />
                    <span class="mono-micro mods__plate-read">Gameplay plate · Java Edition</span>
                </div>
            </div>
        </section>

        <!-- 02 · the mods, as rows -->
        <section class="ds-container">
            <div id="mods" class="mods__list ds-matrix ds-bleed">
                <div class="mods__band">
                    <span class="mono-micro mods__band-index">02</span>
                    <span class="eyebrow">The mods</span>
                    <span class="mods__rule" aria-hidden="true" />
                    <span class="mono-micro mods__band-read">{{ String(modList.length).padStart(2, "0") }} entries</span>
                </div>

                <div v-for="(mod, i) in modList" :key="mod.title" class="mod">
                    <div class="mod__head">
                        <span class="mod__index mono-micro">[{{ String(i + 1).padStart(2, "0") }}]</span>
                        <span class="mod__icon">
                            <img :src="mod.icon" :alt="mod.title" loading="lazy" />
                        </span>
                        <span class="mod__ident-text">
                            <a :href="mod.url" target="_blank" rel="noopener noreferrer" class="mod__title ds-strong">{{ mod.title }}</a>
                            <span class="mod__loaders mono-micro">{{ mod.frameworks.map((f) => f.name).join(" · ") }}</span>
                        </span>
                        <DsBadge tone="ok" class="mod__badge">Live</DsBadge>
                    </div>

                    <p class="mod__desc">{{ mod.description }}</p>

                        <div class="mod__tags">
                            <span v-for="tag in mod.tags" :key="tag" class="mod__tag mono-micro">{{ tag }}</span>
                        </div>

                    <div class="mod__foot">
                        <span class="mod__shields">
                            <img v-for="s in mod.shields" :key="s.name" :src="s.url" :title="s.name" :alt="s.name" loading="lazy" />
                        </span>
                        <span class="mod__actions">
                            <a :href="mod.github" target="_blank" rel="noopener noreferrer" class="mod__link" :aria-label="`${mod.title} on GitHub`" :title="`${mod.title} on GitHub`">
                                <u-icon name="mdi:github" class="size-4" />
                            </a>
                            <a :href="mod.url" target="_blank" rel="noopener noreferrer" class="mod__link mod__link--go" :aria-label="`${mod.title} on CurseForge`" :title="`${mod.title} on CurseForge`">
                                <span class="mod__glyph mod__glyph--out">
                                    <u-icon name="material-symbols:arrow-outward-rounded" class="size-4" />
                                </span>
                                <span class="mod__glyph mod__glyph--in">
                                    <u-icon name="material-symbols:arrow-outward-rounded" class="size-4" />
                                </span>
                            </a>
                        </span>
                    </div>
                    </div>

                <!-- Keeps the mesh closed where the last row is not full, in both
                     the two and the three column layouts. -->
                <span v-for="n in voids2" :key="`void2-${n}`" class="ds-cell ds-cell--void mods__void mods__void--2" aria-hidden="true" />
                <span v-for="n in voids3" :key="`void3-${n}`" class="ds-cell ds-cell--void mods__void mods__void--3" aria-hidden="true" />
            </div>
        </section>

        <!-- 03 · support -->
        <section class="ds-container">
            <div class="mods__support ds-matrix ds-bleed">
                <div class="mods__band">
                    <span class="mono-micro mods__band-index">03</span>
                    <span class="eyebrow">Support</span>
                    <span class="mods__rule" aria-hidden="true" />
                    <span class="mono-micro mods__band-read">Free · No ads · No paywall</span>
                </div>

                <div class="mods__support-copy">
                    <p class="mods__support-text">The mods stay free. If one of them saved you a headache, you can throw something back, and it goes straight into the next release.</p>
                </div>

                <a
                    v-for="link in support"
                    :key="link.name"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ds-cell ds-cell--interactive mods__support-link"
                >
                    <span class="mods__support-icon">
                        <u-icon :name="link.icon.name" class="size-4" />
                    </span>
                    <span class="mono-micro mods__support-name">{{ link.name }}</span>
                    <u-icon name="material-symbols:arrow-outward-rounded" class="size-4 mods__support-arrow" />
                </a>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import projects from "~/data/projects.json";
import sources from "~/data/sources.json";
import { mods } from "~/data/landing";

interface Mod {
    title: string;
    url: string;
    description: string;
    shields: { name: string; url: string }[];
    github: string;
    icon: string;
    frameworks: { name: string; icon: string }[];
    tags: string[];
}

const modList = projects.mods.projects as Mod[];
const github = projects.mods.github;
const support = sources.support ?? [];

/* Every loader named by any mod, counted once. */
const loaders = [...new Set(modList.flatMap((mod) => mod.frameworks.map((f) => f.name)))];

/* The grid is two up from 768px and three up from 1280px, so an incomplete last
   row needs empty slots in both layouts to keep the seams closed. */
const voids2 = computed(() => modList.length % 2);
const voids3 = computed(() => (3 - (modList.length % 3)) % 3);

useSeoMeta({ title: "Trat Minecraft Mods", description: "I build cool Minecraft mods with more than 500k downloads." });
useSchemaOrg([
    defineBreadcrumb({
        itemListElement: [
            {
                name: "Home",
                item: "/",
            },
            {
                name: "Minecraft Mods",
            },
        ],
    }),
]);
defineOgImage("Default.takumi", {
    title: "Yeah, I also\nmod Minecraft.",
    subtitle: "Roughly 550k downloads across five mods, all still maintained.",
    media: "/thumbnails/minecraft.webp",
    eyebrow: "Tratt Mods · Fabric, Forge and Neoforge",
    status: "Mods live",
    footer: ["Transfer Chest", "Launchers", "Chunk Loader", "Browse the mods"],
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.mods__head,
.mods__list,
.mods__support {
    grid-template-columns: 1fr;
}

/* ---- head ---- */
.mods__head-row {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.mods__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
}

.mods__ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--ds-text-dim);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.mods__ghost:hover {
    color: var(--ds-text);
}

/* ---- stats ---- */
.mods__stats {
    grid-template-columns: 1fr;
}

.mods__stat {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: calc(var(--ds-pad) * 1.3) var(--ds-pad);
}

.mods__stat-label {
    color: var(--ds-text-faint);
}

.mods__stat-value {
    font-family: var(--font-heading);
    font-size: clamp(1.6rem, 3.2vw, 2.4rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--ds-text);
}

.mods__stat-note {
    color: var(--ds-text-dim);
}

.mods__stat-badge {
    align-self: flex-start;
    margin-top: 0.35rem;
}

/* ---- plate ---- */
.mods__plate {
    position: relative;
    z-index: 1;
    overflow: visible;
}

.mods__plate-img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 7;
    object-fit: cover;
    filter: grayscale(0.4);
    transition: filter 0.6s var(--ds-ease);
}

.mods__plate:hover .mods__plate-img {
    filter: grayscale(0);
}

.mods__steve {
    position: absolute;
    right: 0.75rem;
    bottom: -1.5rem;
    z-index: 2;
    width: clamp(6rem, 14vw, 11rem);
    height: auto;
    pointer-events: none;
}

.mods__plate-read {
    position: absolute;
    top: 0.75rem;
    left: 0.85rem;
    padding: 0.2rem 0.5rem;
    border: var(--ds-hair) solid var(--ds-line-strong);
    border-radius: var(--ds-r-control);
    background: color-mix(in srgb, var(--ds-canvas) 78%, transparent);
    color: var(--ds-text-muted);
}

/* ---- list ---- */
.mods__band {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: calc(var(--ds-pad) * 1.5) var(--ds-pad);
    background: var(--ds-surface-1);
}

.mods__band-index {
    color: var(--ds-text-faint);
}

.mods__rule {
    flex: 1;
    height: var(--ds-hair);
    background: var(--ds-line);
}

.mods__band-read {
    color: var(--ds-text-faint);
}

.mods__void {
    display: none;
}

/* One card per mod, in a grid. */
.mod {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    padding: calc(var(--ds-pad) * 1.2) var(--ds-pad);
}

.mod__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem;
}

.mod__badge {
    margin-left: auto;
}

.mod__ident-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
}

.mod__index {
    color: var(--ds-text-faint);
}

.mod__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    overflow: hidden;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-3);
}

.mod__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mod__title {
    font-size: 1rem;
    width: fit-content;
}

.mod:hover .mod__title {
    text-decoration: underline;
    text-underline-offset: 3px;
}

.mod__title:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
}

.mod__loaders {
    color: var(--ds-text-dim);
}

.mod__desc {
    flex: 1;
    min-width: 0;
    font-size: 0.8125rem;
    line-height: 1.55;
    color: var(--ds-text-muted);
}

.mod__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    flex: 0 0 auto;
}

.mod__tag {
    padding: 0.2rem 0.45rem;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    color: var(--ds-text-dim);
}

.mod__foot {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: var(--ds-hair) solid var(--ds-line);
}

.mod__actions {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-left: auto;
}

/* The shields are content, so they keep their colour; the frame is ours. */
.mod__shields {
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.mod__shields img {
    height: 1.25rem;
    width: auto;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
}

.mod__link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    flex-shrink: 0;
    overflow: hidden;
    border: var(--ds-hair) solid var(--ds-line);
    border-radius: var(--ds-r-control);
    background: var(--ds-surface-2);
    color: var(--ds-text-muted);
    transition:
        border-color var(--ds-quick) var(--ds-ease-out),
        color var(--ds-quick) var(--ds-ease-out);
}

.mod__link:hover {
    border-color: var(--ds-line-contrast);
    color: var(--ds-text);
}

.mod__glyph {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s var(--ds-ease);
}

.mod__glyph--in {
    transform: translate(-120%, 120%);
}

.mod__link--go:hover .mod__glyph--out {
    transform: translate(120%, -120%);
}

.mod__link--go:hover .mod__glyph--in {
    transform: translate(0, 0);
}

/* The whole row is the target, so hovering anywhere on it plays the arrow
   instead of requiring a hit on the 28px square. */
.mod:hover .mod__link--go .mod__glyph--out {
    transform: translate(120%, -120%);
}

.mod:hover .mod__link--go .mod__glyph--in {
    transform: translate(0, 0);
}

.mod:hover .mod__link {
    border-color: var(--ds-line-contrast);
    color: var(--ds-text);
}

/* ---- support ---- */
/* Same module logic as everything else: the band, the copy, and one framed cell
   per way to give something back. */
.mods__support-copy {
    display: flex;
    align-items: center;
    padding: calc(var(--ds-pad) * 1.4) var(--ds-pad);
}

.mods__support-text {
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--ds-text-muted);
    max-width: 46ch;
}

.mods__support-link {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: calc(var(--ds-pad) * 1.15) var(--ds-pad);
    color: var(--ds-text);
}

.mods__support-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    border: var(--ds-hair) solid var(--ds-line);
    background: var(--ds-surface-1);
}

.mods__support-name {
    color: var(--ds-text-muted);
}

.mods__support-arrow {
    margin-left: auto;
    flex-shrink: 0;
    color: var(--ds-text-dim);
    transition:
        transform 0.35s var(--ds-ease),
        color var(--ds-quick) var(--ds-ease-out);
}

.mods__support-link:hover .mods__support-arrow {
    transform: translate(2px, -2px);
    color: var(--ds-text);
}

@media (min-width: 768px) {
    .mods__list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mods__void--2 {
        display: block;
    }

    .mods__stats {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .mods__support {
        grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
    }

    .mods__support > .mods__band {
        grid-column: 1 / -1;
    }
}

@media (min-width: 1280px) {
    .mods__list {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .mods__void--2 {
        display: none;
    }

    .mods__void--3 {
        display: block;
    }
}
</style>
