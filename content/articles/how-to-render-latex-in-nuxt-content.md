---
title: "How to display LateX math formulas in Nuxt Content"
headline: Web Dev
date: 2025-10-31
description: Learn how to aesthetically display math formulas using LateX synthax inside your documents with Nuxt Content, Remark and Rehype.
tags: [tutorial, nuxt]
author:
    name: Matteo Beltrame
    avatar: /trat.jpg
    url: https://tratteo.it
thumbnail: /articles/how-to-render-latex-in-nuxt-content/thumbnail.jpg
github_repo: https://github.com/tratteo/nuxt_template
youtube_tutorial: https://www.youtube.com/watch?v=dElWGpSa0e8
---

::callout{icon="ri:target-fill" }
We will be able to render math formulas inside any content using Rehype and Remark plugins for Nuxt content.

$$
i\hbar\frac{d}{dt}\ket{\psi(t)}=\hat{H}\ket{\psi(t)}
$$
::

::note
This tutorial uses [Nuxt](https://nuxt.com/) as a web metaframework. However the code can be easily adapted to your preferred web framework.
::


## Installing the required dependencies
To begin with, we need to install some deps. Specifically we are going to install [Nuxt Content](!https://content.nuxt.com/docs/getting-started/installation) and two plugins `remark-math` and `rehype-katex` to handle the rendering.


Install the dependencies with your package manager:
::code-group

```bash [pnpm]
pnpm add @nuxt/content remark-math rehype-katex
```

```bash [yarn]
yarn add @nuxt/content remark-math rehype-katex
```

```bash [npm]
npm install @nuxt/content remark-math rehype-katex
```

```bash [bun]
bun add @nuxt/content remark-math rehype-katex
```
::

Add Nuxt Content to your modules in your configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ["@nuxt/content"]
})
```
And now you are good to go.

## Configuring Nuxt Content

Nuxt Content requires you to define a `content.config.ts` file at the root of your folder where you specify your collections. 
::tip
Check out the [official documentation](https://content.nuxt.com/docs/getting-started/configuration) to understand how to setup the configuration for your collections. However this is the most general structure for your `content.config.ts`:

```ts[content.config.ts]
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        articles: defineCollection(
            {
                source: "articles/**/*.md",
                type: "page",
                schema: z.object({
                    title: z.string(),                    
                    description: z.string(),
                    date: z.date(),
                }),
            }
        ),
    },
});

```
::

## Configuring the two plugins
To be able to use the two plugins, we need to add an entry to our `nuxt.config.ts`:
```ts[nuxt.config.ts]{5,8}
content: {
    build: {
        markdown: {            
            remarkPlugins: {
                "remark-math": {},
            },
            rehypePlugins: { 
                "rehype-katex": {} 
            },
        },
    },
}

```
You can see that we are passing an empty object to the two plugins because we do not need any particular option. However you can check the documentation and customize the plugins behaviour by passing properties to their configuration.

We are almost done, last thing is to add the remark css file to our `css` entry:
```ts[nuxt.config.ts]{5,8}
css: ["katex/dist/katex.min.css"]
```
## Rendering math formulas
There are two ways to include math formulas inside your content.

**Inline mode**  
The first is just using the inline mode to render formulas in between text.
In this case just wrap your math formula inside two `$`:
::tabs
:::tabs-item{label="Code" icon="i-lucide-code"}
```
This is an inline formula $log(x)$
```
:::

:::tabs-item{label="Preview" icon="i-lucide-eye"}
This is an inline formula $log(x)$
:::
::

**Block mode**  
In this case the formula will be automatically aligned to the center and will cover all the required space. To achieve this go newline and wrap the formulas in two `$$`:

::tabs
:::tabs-item{label="Code" icon="i-lucide-code"}
```
This is a block formula

$$
f(x)=log(x)
$$
```
:::

:::tabs-item{label="Preview" icon="i-lucide-eye"}
This is a block formula

$$
f(x)=log(x)
$$
:::
::

You can actually go pretty crazy with it and everything will just be awesome!

$$
\big(2\ket{\phi}\bra{\phi}-I\big)\ket{\psi_1}=2\ket{\phi}\braket{\phi|\psi_1}-\ket{\psi_1}\\
=\frac{1}{\sqrt{2}}\ket{\phi}\big(\bra{00}+\bra{01}+\bra{10}+\bra{11}\big)\big(\delta^{00}_s\alpha\ket{00}+\delta^{01}_s\alpha\ket{01}+\delta^{10}_s\beta\ket{10}+\delta^{11}_s\beta\ket{11}\big)-\ket{\psi_1}\\
=\frac{1}{\sqrt{2}}\big(\delta^{00}_s\alpha\ket{00}+\delta^{01}_s\alpha\ket{01}+\delta^{10}_s\beta\ket{10}+\delta^{11}_s\beta\ket{11}\big)\ket{\phi}-\ket{\psi_1}\\
$$

::warning
When rendering very big math formulas, the text might overflow and the katex plugin does not handle this automatically.
::

### Handling overflow with custom css

To prevent big math formulas from overflowing, we can identify the css class that katex uses and style that with custom css.

If we analyze the page, we can see that katex is giving the css class `katex-display` to the math sections. So we can fix everything with this very simple css code:

::code-group
```css [tailwind]
.katex-display {
    @apply overflow-x-auto overflow-y-hidden text-nowrap;
}
```
```css [standard]
.katex-display {
    overflow-x: auto;
    overflow-y: hidden;
    text-wrap: no-wrap;
}
```
::

::tip
You can put this css code directly into the `<style>` tag of your vue component or just create a class and pass it to your [`ContentRenderer`](https://content.nuxt.com/docs/components/content-renderer){target=\_blank}:

```vue
<template>
    <ContentRenderer v-if="data" :value="data" class="markdown-content" />
</template>

<style lang="css">
.markdown-content {
    .katex-display {
        @apply overflow-x-auto overflow-y-hidden text-nowrap;
    }   
}
</style>
```
::


::callout{icon="mdi:github" to="https://github.com/tratteo/nuxt_template" target="_blank"}
Be sure to give a star to my **free Nuxt** template for other very cool components and implemented features.
::


::card-group
::card{icon="mdi:github" title="Free Nuxt 4 template" to="https://github.com/tratteo/nuxt_template" target="_blank" }
A dashboard with multi-column layout.
::

::card{icon="logos:youtube-icon" title="YouTube Tutorials" to="https://www.youtube.com/@matteo-beltrame" target="_blank" color="error" variant="solid"}
I post cool stuff and tutorials on my YouTube channel!
::

::
