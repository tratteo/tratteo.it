<template>
    <div class="scrollbar-track" v-if="targetElement && hasScroll">
        <div class="absolute w-6 right-0 left-auto cursor-pointer group" :style="{ height: thumbHeight + 'px', top: thumbPosition + 'px' }" @mousedown="startDrag">
            <div ref="thumbEl" class="thumb"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ target: string | HTMLElement }>();
const targetElement = ref<HTMLElement | null>(null);

const scrollInfo = ref({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
});

const isDragging = ref(false);
const startY = ref(0);
const startScrollTop = ref(0);
const thumbEl = ref<HTMLElement | null>(null);

const hasScroll = computed(() => {
    const { scrollHeight, clientHeight } = scrollInfo.value;
    return clientHeight / scrollHeight < 1;
});

const thumbHeight = computed(() => {
    const { scrollHeight, clientHeight } = scrollInfo.value;
    // Calcolo proporzionale dell'altezza dello thumb
    return Math.max(30, (clientHeight / scrollHeight) * clientHeight);
});

const thumbPosition = computed(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollInfo.value;
    if (scrollHeight <= clientHeight) return 0;

    // Calcolo proporzionale della posizione verticale
    const availableScrollSpace = clientHeight - thumbHeight.value;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    return scrollRatio * availableScrollSpace;
});

// Gestore evento di scroll
function updateStatus() {
    if (!targetElement.value) return;

    scrollInfo.value = {
        scrollTop: document.documentElement.scrollTop,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
    };
}

// Gestori eventi per il trascinamento
const startDrag = (e: MouseEvent) => {
    e.preventDefault();
    isDragging.value = true;
    startY.value = e.clientY;
    startScrollTop.value = scrollInfo.value.scrollTop;

    thumbEl.value?.classList.add("dragging");

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
};

function onDrag(e: MouseEvent) {
    if (!isDragging.value || !targetElement.value) return;

    e.preventDefault();

    // Calcola lo spostamento
    const deltaY = e.clientY - startY.value;
    const { scrollHeight, clientHeight } = scrollInfo.value;

    // Converti lo spostamento del mouse in spostamento dello scroll
    const scrollRatio = (scrollHeight - clientHeight) / (clientHeight - thumbHeight.value);
    const scrollAmount = deltaY * scrollRatio;

    // Applica lo scrolling
    const scroll = Math.max(0, Math.min(startScrollTop.value + scrollAmount, scrollHeight - clientHeight));
    window.scrollTo({ top: scroll, behavior: "instant" });
    targetElement.value.scrollTo({ top: scroll, behavior: "instant" });
}

function stopDrag() {
    isDragging.value = false;
    thumbEl.value?.classList.remove("dragging");
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
}

function setupTargetElement() {
    const element = props.target instanceof HTMLElement ? props.target : document.getElementById(props.target as string);
    if (!element) {
        console.warn(`element "${props.target}" not found`);
        return;
    }

    targetElement.value = element;
    document.addEventListener("scroll", updateStatus);
    element.addEventListener("scroll", updateStatus);
    updateStatus();

    onUnmounted(() => {
        document.removeEventListener("scroll", updateStatus);
        element.removeEventListener("scroll", updateStatus);
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    });
}

// Setup all'avvio
onMounted(() => {
    setupTargetElement();
    useResizeObserver(document.getElementById("__root"), (entries) => {
        updateStatus();
    });
});

// Riaggiorna quando cambia il targetId
watch(() => props.target, setupTargetElement);
</script>

<style scoped>
* {
    scroll-behavior: unset !important;
}
.scrollbar-track {
    @apply hidden md:block fixed w-2 rounded-btn right-0 left-auto top-0 z-[20000] h-full;
}
.thumb {
    @apply absolute right-0 h-full bg-primary/50 group-hover:bg-primary/75 w-1 left-auto rounded-btn cursor-pointer group-hover:w-2 transition-all duration-200 ease-out;
}
.thumb.dragging {
    @apply bg-primary w-2 !important;
}
</style>
