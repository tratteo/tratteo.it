---
title: "Create an abstract morphing element for your landing pages"
headline: Web Dev
date: 2025-11-04
description: Create and use this morphing gradient with microinteractions to elevate your landing pages to the next level.
tags: [nuxt, motion, ui/ux]
author:
    name: Matteo Beltrame
    avatar: /trat.jpg
    url: https://tratteo.it
thumbnail: /articles/morphing-gradient-in-nuxt/thumbnail.jpg
github_repo: https://github.com/tratteo/nuxt_template
youtube_tutorial: https://youtu.be/LKjLeUI7_V0
techstack: [nuxt, typescript, css3]
---

::callout{icon="ri:target-fill" }
We will create a `MorphingGradient` component that will render a dynamic blob that automatically morphs and follows the mouse cursor with a very smooth microinteraction.
::div{class="flex justify-center"}
    ::morphing-gradient-mockup{self-center}
    ::
::

::tip
Move the mouse cursor and the element will smoothly rotate towards it!
::
::

::note
This tutorial uses [Nuxt](https://nuxt.com/) as a web metaframework. However the code can be easily adapted to your preferred web framework.
::


## Installing the required dependencies
To begin with, we need to install some deps. Specifically we are going to use [motion-v](https://motion.dev/docs/vue){target=\_blank} to handle the cool animation.

::callout{icon="logos-youtube-icon" to="https://youtu.be/CIemLLeImjE" target="_blank" }
Check out the YouTube video in which we integrate `motion-v` in Nuxt for the first time.
::

Install the dependency with your package manager:
::code-group

```bash [pnpm]
pnpm add motion-v
```

```bash [yarn]
yarn add motion-v
```

```bash [npm]
npm install motion-v
```

```bash [bun]
bun add motion-v
```
::

Add it to your modules in your configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ["motion-v/nuxt"]
})
```
And now you are good to go.

## Creating the component

To start with, create a new component called `MoprhingGradient` inside your components folder. We will use this component to wrap the functionality of our morphing element.

### Dynamically morphing the element
We are going to create a function called `morph` that is going to run at random intervals. This function will morph the element changing its scale, border radius and setting the blur:

```vue [morphing_gradient.vue] 
<script lang="ts" setup>
const blobEl = useTemplateRef("blobEl");
const mounted = useMounted();
const props = withDefaults(defineProps<{ size?: string; blur?: number; scaleAmplitude?: number }>(), {
    size: "200px",
    scaleAmplitude: 0.2,
    blur: 10,
});

onMounted(() => {
    setTimeout(() => {
        requestAnimationFrame(morph);
    }, 400);
});

function morph() {
    if (!blobEl.value) return;
    blobEl.value.$el.style.scale = randomScale();
    blobEl.value.$el.style.borderRadius = randomBorderRadius();
    blobEl.value.$el.style.filter = `blur(${props.blur}px)`;

    setTimeout(
        () => {
            requestAnimationFrame(morph);
        }, Math.random() * 2000 + 2500);
}

function remap(v: number, domain: [number, number], newDomain: [number, number]): number {
    return newDomain[0] + (v - domain[0]) * ((newDomain[1] - newDomain[0]) / (domain[1] - domain[0]));
}

function randomScale(): string {
    if (!blobEl.value) return "1 1 1";
    const magnitude = props.scaleAmplitude;
    return `${remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude])} ${remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude])} ${remap(
        Math.random(),
        [0, 1],
        [1 - magnitude, 1 + magnitude]
    )}`;
}

function randomBorderRadius(): string {
    if (!blobEl.value) return "0deg";
    return `${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(
        Math.random(),
        [0, 1],
        [10, 80]
    )}% / ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(
        Math.random(),
        [0, 1],
        [10, 80]
    )}%`;
}
</script>
```

::tip
Remember: when accessing a template ref of a motion element, you need to access the `$el` property to access the actual element.
::

The code might seem already pretty long, but really the two functions `randomScale` and `randomBorderRadius` are simply returning long css strings with random values. 

Inside the `morph` function we are scheduling the next execution by waiting some random time. You can edit this value to make the gradient morph more or less frequently.

You can change how the scale and the border radius are selected to change the morphing effect of the element.
::note
The `remap` function is a simple utility funcion that given a value and its current domain, remaps it uniformally into the new domain.
::

### Creating the HTML
Our template is going to be very simple, we are basically going to wrap a `motion.div` element and style it with some css:
```vue [morphing_gradient.vue] 
<template>
    <div 
        v-if="mounted" 
        class="relative flex justify-center items-start pointer-events-none z-[-100]">
        <motion.div 
            ref="blobEl" 
            class="blob" 
            :animate="{ transition: { duration: 2 } }">
        </motion.div>
    </div>
</template>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.blob {
    transform-origin: center !important;
    filter: blur(0px);
    border-radius: 36%;
    z-index: -100 !important;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
    background: linear-gradient(var(--color-violet-500), var(--ui-primary));
    color: transparent;
    width: v-bind(size);
    height: v-bind(size);
    transition:
        filter 3s,
        scale 3s,
        border-radius 3s;
}
</style>
```

At this point, you should have your element correctly morphing automatically.

### Rotating our element towards the mouse

Since we want our element to look at our mouse position, to begin with, let us hook into the `mousemove` event:


```vue [morphing_gradient.vue] 
<script lang="ts" setup>
onMounted(() => {
    window.addEventListener("mousemove", mouseMove);
});

onUnmounted(() => {
    // Always clean your s**t!
    window.removeEventListener("mousemove", mouseMove);
});

function mouseMove(ev: MouseEvent) {}

</script>
```
Then we can code the `mouseMove` function to set our `ref` variable and rotate the element by setting the rotation field on the `:animate` property of the `motion.div`:
```vue [morphing_gradient.vue] {8}
<template>
    <div 
        v-if="mounted" 
        class="relative flex justify-center items-start pointer-events-none z-[-100]">
        <motion.div 
            ref="blobEl" 
            class="blob" 
            :animate="{ rotate: `${angle}rad`, transition: { duration: 2 } }">
        </motion.div>
    </div>
</template>

<script lang="ts" setup>
const angle = ref(0);

function mouseMove(ev: MouseEvent) {
    if (!blobEl.value?.$el) return;
    const rect = blobEl.value.$el.getBoundingClientRect();
    const deltaX = ev.clientX - (rect.left + rect.width / 2);
    const deltaY = ev.clientY - (rect.top + rect.height / 2);
    angle.value = Math.atan2(deltaY, deltaX);
}
</script>
```


Now our element is rotating towards the mouse but there is a weird problem.

::warning
Whenever we rotate around the element more than 180°, the element starts rotating the other way around. This is because the angle becomes negative when we rotate more than $\pi/2$.
::

### Smoothing the rotation

To fix this, we can create a very simple function called `getSmoothAngle` that will use some `ref` variables to keep track of the previous angle and the total rotation count. 

We then use this function inside our `mouseMove` callback to set the smooth angle:

```vue [morphing_gradient.vue] {23} 
<script lang="ts" setup>
const previousAngle = ref(0);
const totalRotation = ref(0);
const angle = ref(0);

function getSmoothAngle(angle: number) {
    let angleDiff = angle - previousAngle.value;
    if (angleDiff > Math.PI) {
        angleDiff -= 2 * Math.PI;
    } else if (angleDiff < -Math.PI) {
        angleDiff += 2 * Math.PI;
    }
    totalRotation.value += angleDiff;
    previousAngle.value = angle;
    return totalRotation.value;
}

function mouseMove(ev: MouseEvent) {
    if (!blobEl.value?.$el) return;
    const rect = blobEl.value.$el.getBoundingClientRect();
    const deltaX = ev.clientX - (rect.left + rect.width / 2);
    const deltaY = ev.clientY - (rect.top + rect.height / 2);
    angle.value = getSmoothAngle(Math.atan2(deltaY, deltaX));
}
</script>
```


## The final code

Putting everything togheter, you now have a very cool component that can be used in landing pages.

::tip
Change the code as you want to better fit your brand and needs!
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

Here is the final component code. Enjoy!

::code-collapse
```vue [morphing_gradient.vue]
<template>
    <div 
        v-if="mounted"
        class="relative flex justify-center items-start pointer-events-none z-[-100]">
        <motion.div 
            ref="blobEl" 
            class="blob" :animate="{ rotate: `${angle}rad`, transition: { duration: 2 } }">
        </motion.div>
    </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const blobEl = useTemplateRef("blobEl");
const mounted = useMounted();
const previousAngle = ref(0);
const totalRotation = ref(0);
const angle = ref(0);
const props = withDefaults(defineProps<{ size?: string; blur?: number; scaleAmplitude?: number }>(), {
    size: "200px",
    scaleAmplitude: 0.2,
    blur: 10,
});

onMounted(() => {
    setTimeout(() => {
        requestAnimationFrame(morph);
    }, 400);

    window.addEventListener("mousemove", mouseMove);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", mouseMove);
});

function remap(v: number, domain: [number, number], newDomain: [number, number]): number {
    return newDomain[0] + (v - domain[0]) * ((newDomain[1] - newDomain[0]) / (domain[1] - domain[0]));
}

function getSmoothAngle(angle: number) {
    let angleDiff = angle - previousAngle.value;
    if (angleDiff > Math.PI) {
        angleDiff -= 2 * Math.PI;
    } else if (angleDiff < -Math.PI) {
        angleDiff += 2 * Math.PI;
    }
    totalRotation.value += angleDiff;
    previousAngle.value = angle;
    return totalRotation.value;
}

function mouseMove(ev: MouseEvent) {
    if (!blobEl.value?.$el) return;
    const rect = blobEl.value.$el.getBoundingClientRect();
    const deltaX = ev.clientX - (rect.left + rect.width / 2);
    const deltaY = ev.clientY - (rect.top + rect.height / 2);
    angle.value = getSmoothAngle(Math.atan2(deltaY, deltaX));
}

function randomScale(): string {
    if (!blobEl.value) return "1 1 1";
    const magnitude = props.scaleAmplitude;
    return `${remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude])} ${remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude])} ${remap(
        Math.random(),
        [0, 1],
        [1 - magnitude, 1 + magnitude]
    )}`;
}

function randomBorderRadius(): string {
    if (!blobEl.value) return "0deg";
    return `${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(
        Math.random(),
        [0, 1],
        [10, 80]
    )}% / ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(
        Math.random(),
        [0, 1],
        [10, 80]
    )}%`;
}

function morph() {
    if (!blobEl.value) return;
    blobEl.value.$el.style.scale = randomScale();
    blobEl.value.$el.style.borderRadius = randomBorderRadius();
    blobEl.value.$el.style.filter = `blur(${props.blur}px)`;

    setTimeout(
        () => {
            requestAnimationFrame(morph);
        },
        Math.random() * 2000 + 2500
    );
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.blob {
    transform-origin: center !important;
    filter: blur(0px);
    border-radius: 36%;
    z-index: -100 !important;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
    background: linear-gradient(var(--color-violet-500), var(--ui-primary));
    color: transparent;
    width: v-bind(size);
    height: v-bind(size);
    transition:
        filter 3s,
        scale 3s,
        border-radius 3s;
}
</style>

```
::



