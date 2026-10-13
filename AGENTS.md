# AGENTS.md

Personal portfolio + blog for Matteo Beltrame (`tratteo.it`). Nuxt 4, statically prerendered (SSG), dark-only. Stack: Nuxt UI v4, Nuxt Content v3, `@nuxtjs/seo`, `motion-v`.

## Commands

- Package manager is **bun** (`bun.lock`; `purge.bat` deletes `package-lock.json`/`bun.lock`). Do not use npm/pnpm.
- `bun run dev` → `nuxt dev --host`; `bun run build` / `bun run generate` → SSG; `bun run preview`.
- **No test, lint, format, or typecheck scripts exist.** Do not invent them or add config unasked. Verify via the dev server or `bun run build`.
- Release is `deploy.bat [message]` (Windows): commits everything to `main`, pushes, rebases `release` onto `main`, pushes `release`, returns to `main`. Do not hand-roll the release flow.

## Structure

- Nuxt 4 layout: source lives in `app/` (`~` = `app/`); root-level aliases use `~~/`.
- `shared/utils/**` is auto-imported on client + server (e.g. `isNullOrEmpty`, `capitalize`). Explicit imports use `~~/shared/utils/...`.
- Layout is chosen per-route via `routeRules.appLayout` in `nuxt.config.ts` (e.g. `/minecraft-mods` → `fullwidth`); default layout wraps `<u-app>` header/footer.
- `nuxt.config.ts` `imports.dirs` lists `src/**/*`, but no root `src/` exists. Components/composables resolve from `app/`.

## Content (blog)

- Collection `articles` is defined in `content.config.ts`; posts are `content/articles/*.md`.
- Frontmatter is validated by a strict zod schema: `title`, `date`, `description`, `thumbnail`, `author{ name, avatar }` are required. `headline`, `tags`, `techstack`, `youtube_tutorial`, `github_repo`, extended `author` fields are optional. Unknown keys or a missing required field fail the build.
- MDC components live in `app/components/content/` and are used in markdown as kebab-case: `morphing_gradient_mockup.vue` → `::morphing-gradient-mockup`. `::callout`, `::tip`, `::note` come from Nuxt UI prose.
- Requires the native sqlite connector; the query cache lives in `.data/` (gitignored). Delete `.data/` if content queries return stale results.

## Styling

- Tailwind v4 CSS-first: `tailwind.config.ts` is empty/vestigial. Design tokens live in `app/assets/css/main.css` (`@import "tailwindcss"`, `@theme static`, `@import "@nuxt/ui"`). Add tokens there, not in a JS config.
- Semantic type helpers: `typ-title`, `typ-subtitle`, `typ-label`, `typ-sublabel` (`app/assets/css/typography.css`).
- Dark-only (`ui.colorMode: false`): style with `--ui-*` vars and helpers like `text-highlighted`, not light/dark variants.
- Scoped SFC styles import Tailwind via `@reference "~/assets/css/main.css"` before `@apply` / `@variant`.

## Gotchas

- Prerender uses `crawlLinks: true` + `failOnError: true`: a broken internal link fails the build. `/api` and `/app` are excluded from crawl, sitemap, and robots.
- OG images use the Takumi renderer (`@takumi-rs/core`): components are `app/components/og-image/*.takumi.vue`, invoked as `defineOgImage("Name.takumi", {...})`.
- Root `functions/` is listed in `.nuxtignore` so Nuxt skips it (Firebase-style functions coexist). Keep non-Nuxt code out of the app scan.
- `tools/` holds standalone Node scripts (image conversion) that are not wired to the app and are not in `package.json` deps (they need `sharp`). Do not treat `tools/*.ts` as build inputs.
- Site identity/URL/author is centralized in `app/app.meta.ts`; reuse `appMeta` instead of hardcoding.
