<template>
    <footer class="footer ds-container">
        <div class="footer__telemetry">
            <span class="footer__live mono-micro">
                <span class="ds-pip" />
                System online
            </span>
            <span class="mono-micro footer__read">{{ clock }}</span>
            <span class="mono-micro footer__read">{{ zone }}</span>
            <span class="footer__fill" aria-hidden="true" />
            <span class="mono-micro footer__read">Build {{ year }}</span>
        </div>

        <div class="footer__matrix ds-matrix ds-matrix--closed ds-bleed">
            <div class="footer__col">
                <span class="footer__label mono-micro">Ident</span>
                <p class="footer__name">© {{ year }} {{ appMeta.author.name }}</p>
                <p class="footer__ident">{{ appMeta.author.description }}</p>
            </div>

            <nav class="footer__col" aria-label="Footer">
                <span class="footer__label mono-micro">Navigation</span>
                <a v-for="(item, i) in nav" :key="item.href" :href="item.href" class="footer__link">
                    <span class="footer__link-index mono-micro">[{{ String(i + 1).padStart(2, "0") }}]</span>
                    <span>{{ item.label }}</span>
                </a>
            </nav>

            <div class="footer__col">
                <span class="footer__label mono-micro">Elsewhere</span>
                <NuxtLink to="/articles" class="footer__link">
                    <span class="footer__link-index mono-micro">[06]</span>
                    <span>Blog</span>
                </NuxtLink>
                <NuxtLink to="/minecraft-mods" class="footer__link">
                    <span class="footer__link-index mono-micro">[07]</span>
                    <span>Minecraft mods</span>
                </NuxtLink>
            </div>

            <div class="footer__col">
                <span class="footer__label mono-micro">Coordinates</span>
                <a :href="`mailto:${email}`" class="footer__link">
                    <span class="footer__link-index mono-micro">[08]</span>
                    <span>{{ email }}</span>
                </a>
                <span class="contact__location mono-micro">
                    <u-icon name="twemoji:flag-italy" class="footer__flag" />
                    {{ contact.location }}
                </span>
                <a href="#" class="footer__link" @click.prevent="scrollTop">
                    <span class="footer__link-index mono-micro">[09]</span>
                    <span>Back to top</span>
                </a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import { appMeta } from "~/app.meta";
import { contact, nav } from "~/data/landing";

const email = appMeta.author.email;
const year = new Date().getFullYear();
const prefersReduced = usePreferredReducedMotion();

/* The clock is client only so the prerendered markup stays deterministic. */
const now = ref<Date | null>(null);
const zone = ref("");

let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
    now.value = new Date();
    zone.value = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ");
    timer = setInterval(() => (now.value = new Date()), 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const clock = computed(() => (now.value ? now.value.toLocaleTimeString("en-GB", { hour12: false }) : "--:--:--"));

/* Works on every page: no hash to push, and no dependency on the landing's own
   top anchor. */
function scrollTop() {
    window.scrollTo({ top: 0, behavior: prefersReduced.value === "reduce" ? "auto" : "smooth" });
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

/* The footer sits inside the page frame as its last row, so the rails run past
   it and it closes the shell with its own bottom rule. Padding inside the frame
   is what gives it room to breathe. */
.footer {
    padding-block: calc(var(--ds-pad) * 2.4) calc(var(--ds-pad) * 1.8);
    border-bottom: var(--ds-hair) solid var(--ds-line);
}

/* Telemetry header: live status, a running clock, and the build marker. */
.footer__telemetry {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.25rem;
    padding-bottom: calc(var(--ds-pad) * 1.5);
}

.footer__live {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--ds-text);
}

.footer__read {
    color: var(--ds-text-dim);
}

.footer__fill {
    flex: 1;
}

/* Four quadrants sharing single hairlines, aligned to the frame rails. */
.footer__matrix {
    grid-template-columns: 1fr;
}

.footer__col {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: calc(var(--ds-pad) * 1.15) var(--ds-pad);
    background: var(--ds-surface-1);
}

.footer__label {
    color: var(--ds-text-faint);
    margin-bottom: 0.2rem;
}

.footer__name {
    font-family: var(--font-heading);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--ds-text);
}

.footer__ident {
    font-size: 0.75rem;
    line-height: 1.55;
    color: var(--ds-text-dim);
    max-width: 34ch;
}

.footer__link {
    display: inline-flex;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ds-text-muted);
    transition: color var(--ds-quick) var(--ds-ease-out);
}

.footer__link:hover {
    color: var(--ds-text);
}

.footer__flag {
    margin-right: 0.35rem;
    vertical-align: -0.1em;
}

.footer__link-index {
    color: var(--ds-text-faint);
}

@media (min-width: 768px) {
    .footer__matrix {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
