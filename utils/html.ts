export const typewatch = (function () {
    var timer: NodeJS.Timeout | undefined;
    return function (callback: () => void, ms: number) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

export function getScrollableRoot(): HTMLElement {
    return document.getElementById("__root") ?? document.body;
}
export function scrollToEl(el: Element | undefined | null) {
    if (!el) return;
    const root = getScrollableRoot();
    const headlineHeight = (document.getElementById("__headline")?.getBoundingClientRect().height ?? 0) + 16;
    root.scrollTo({ top: root.scrollTop + el.getBoundingClientRect().top - headlineHeight });
}
export function scrollTop() {
    const root = getScrollableRoot();
    root.scrollTo({ top: 0 });
}
export function jumpTop() {
    const root = getScrollableRoot();
    root.scrollTo({ top: 0, behavior: "instant" });
}
export function scrollBottom() {
    const root = getScrollableRoot();
    root.scrollTo({ top: root.scrollHeight });
}
