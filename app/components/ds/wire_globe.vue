<template>
    <canvas ref="canvasEl" class="globe" aria-hidden="true" />
</template>

<script lang="ts" setup>
/* A wireframe globe, drawn by hand rather than pulled in from a library: a
   dozen meridians and five parallels, rotated in place and projected
   orthographically. Points on the far side dim instead of hiding, which is what
   makes it read as a cage rather than a fan of front arcs.

   Monochrome by construction: the frame samples the design system's own line
   tokens, so the globe follows the theme. It stops painting when it scrolls out
   of view, and draws a single frame under reduced motion. */
const canvasEl = useTemplateRef<HTMLCanvasElement>("canvasEl");

const prefersReduced = usePreferredReducedMotion();

const MERIDIANS = 12;
const PARALLELS = 5;
const SPEED = 0.24;

let frame = 0;
let visible = true;
let observer: IntersectionObserver | null = null;
let resizer: ResizeObserver | null = null;

/** Rotate a unit-sphere point about the vertical axis and project it. */
function makeProjector(size: number, angle: number) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return (x: number, y: number, z: number) => {
        const rx = x * cos + z * sin;
        const rz = -x * sin + z * cos;
        return { x: cx + rx * r, y: cy - y * r, depth: rz };
    };
}

function draw(canvas: HTMLCanvasElement, angle: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.clientWidth;
    if (!size) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const styles = getComputedStyle(canvas);
    const far = styles.getPropertyValue("--ds-line-strong").trim() || "#333333";
    const near = styles.getPropertyValue("--ds-text-muted").trim() || "#a1a1a1";

    const project = makeProjector(size, angle);
    let previous: ReturnType<typeof project> | null = null;

    const trace = (x: number, y: number, z: number) => {
        const point = project(x, y, z);
        if (previous) {
            const depth = (previous.depth + point.depth) / 2;
            ctx.strokeStyle = depth < 0 ? far : near;
            ctx.globalAlpha = depth < 0 ? 0.4 : 0.3 + 0.7 * depth;
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }
        previous = point;
    };

    ctx.lineWidth = 1;

    /* Parallels: rings of fixed latitude, which flatten towards the poles. */
    for (let p = 1; p <= PARALLELS; p++) {
        const phi = -Math.PI / 2 + (p * Math.PI) / (PARALLELS + 1);
        const y = Math.sin(phi);
        const ring = Math.cos(phi);
        previous = null;
        for (let i = 0; i <= 72; i++) {
            const lambda = (i / 72) * Math.PI * 2;
            trace(Math.cos(lambda) * ring, y, Math.sin(lambda) * ring);
        }
    }

    /* Meridians: great circles through both poles, one per longitude. */
    for (let m = 0; m < MERIDIANS; m++) {
        const lambda = (m / MERIDIANS) * Math.PI * 2;
        previous = null;
        for (let i = 0; i <= 48; i++) {
            const phi = -Math.PI / 2 + (i / 48) * Math.PI;
            trace(Math.cos(lambda) * Math.cos(phi), Math.sin(phi), Math.sin(lambda) * Math.cos(phi));
        }
    }

    ctx.globalAlpha = 1;
}

function loop() {
    const canvas = canvasEl.value;
    if (canvas && visible) draw(canvas, (performance.now() / 1000) * SPEED);
    frame = requestAnimationFrame(loop);
}

onMounted(() => {
    const canvas = canvasEl.value;
    if (!canvas) return;

    if (prefersReduced.value === "reduce") {
        draw(canvas, 0.7);
        return;
    }

    observer = new IntersectionObserver(
        (entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
        },
        { rootMargin: "120px" },
    );
    observer.observe(canvas);

    resizer = new ResizeObserver(() => draw(canvas, (performance.now() / 1000) * SPEED));
    resizer.observe(canvas);

    frame = requestAnimationFrame(loop);
});

onUnmounted(() => {
    cancelAnimationFrame(frame);
    observer?.disconnect();
    resizer?.disconnect();
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.globe {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
