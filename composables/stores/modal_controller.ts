export const useModalController = defineStore("modal-controller", () => {
    interface ModalArgument {
        el: HTMLDialogElement;
        data: any;
    }
    const argumentsStore: ModalArgument[] = [];

    const open = <T>(id: string | HTMLDialogElement | undefined, arg?: T | undefined): HTMLDialogElement | undefined => {
        const el = getEl(id);
        loadArg(el, arg);
        el?.showModal();
        return el;
    };
    const close = (id: string | HTMLDialogElement | undefined): HTMLDialogElement | undefined => {
        const el = getEl(id);
        el?.close();
        return el;
    };

    const queryArg = <T>(el: HTMLDialogElement | undefined): T | undefined => {
        if (!el) return undefined;
        return argumentsStore.find((e) => e.el === el)?.data as T | undefined;
    };

    function loadArg<T>(el: HTMLDialogElement | undefined, data: T) {
        if (!el) return;
        const match = argumentsStore.find((e) => e.el === el);
        if (match) {
            match.data = data;
        } else {
            argumentsStore.push({ el: el, data: data });
        }
    }

    function getEl(id: string | HTMLDialogElement | undefined): HTMLDialogElement | undefined {
        var el = undefined;
        if (id === undefined) return undefined;
        if (typeof id === "string") {
            el = document.getElementById(id) as HTMLDialogElement | undefined;
        } else {
            el = id as HTMLDialogElement;
        }
        if (el && !document.contains(el)) return undefined;
        return el;
    }
    return { open, close, queryArg };
});
