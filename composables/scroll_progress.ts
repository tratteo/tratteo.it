export const useScrollProgress = () => {
    const x = ref(0);
    const y = ref(0);
    const isScrolling = ref(false);
    const xDirection = ref<number>(1);
    const yDirection = ref<number>(1);

    onUnmounted(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scrollend", onScrollEnd);
    });
    onMounted(() => {
        window.addEventListener("scroll", onScroll);
        window.addEventListener("scrollend", onScrollEnd);
    });

    function onScroll(event: Event) {
        if (!isScrolling.value) {
            isScrolling.value = true;
        }
        let newY =
            document.documentElement.scrollTop /
            (document.documentElement.scrollHeight - document.documentElement.offsetHeight);
        let newX =
            document.documentElement.scrollLeft /
            (document.documentElement.scrollWidth - document.documentElement.offsetWidth);
        newX = Number.isNaN(newX) ? 0 : newX;
        newY = Number.isNaN(newY) ? 0 : newY;

        xDirection.value = Math.sign(newX - x.value);
        yDirection.value = Math.sign(newY - y.value);
        x.value = newX;
        y.value = newY;
    }
    function onScrollEnd(event: Event) {
        isScrolling.value = false;
    }

    return { x, y, isScrolling, xDirection, yDirection };
};
