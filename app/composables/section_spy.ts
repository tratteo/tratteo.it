/**
 * Tracks which page section is currently in the viewport, so navigation can
 * show a "you are here" state without a scroll listener.
 */
export const useSectionSpy = (ids: string[], rootMargin = "-45% 0px -45% 0px") => {
    const active = ref<string | null>(null);
    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
        if (!targets.length) return;

        observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) active.value = visible.target.id;
            },
            { rootMargin, threshold: [0, 0.25, 0.5, 1] },
        );

        targets.forEach((target) => observer?.observe(target));
    });

    onUnmounted(() => observer?.disconnect());

    return active;
};
