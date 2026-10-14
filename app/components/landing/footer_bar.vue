<template>
    <footer class="footer">
        <div class="ds-container footer__inner">
            <div class="footer__left">
                <img src="/favicon.svg" alt="" width="20" height="20" class="footer__mark" />
                <span>© {{ year }} {{ appMeta.author.name }}</span>
            </div>
            <p class="footer__mid">{{ appMeta.author.description }}</p>
            <div class="footer__right">
                <a :href="`mailto:${email}`" class="footer__link">{{ email }}</a>
                <a href="#top" class="footer__link footer__link--top">
                    Back to top
                    <u-icon name="material-symbols:north-rounded" class="size-3.5" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import { appMeta } from "~/app.meta";

const email = appMeta.author.email;
const year = new Date().getFullYear();
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.footer {
    padding-block: 2.5rem;
    border-top: 1px solid var(--ds-hairline);
}

.footer__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

.footer__left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.8rem;
    color: var(--ds-text-dim);
}

.footer__mark {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.35rem;
}

.footer__mid {
    font-size: 0.8rem;
    color: var(--ds-text-faint);
    max-width: 46ch;
}

.footer__right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
}

.footer__link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--ds-text-muted);
    transition: color 0.3s var(--ds-ease);
}

.footer__link:hover {
    color: var(--ds-text);
}

@media (min-width: 768px) {
    .footer__inner {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .footer__mid {
        text-align: center;
    }
}
</style>
