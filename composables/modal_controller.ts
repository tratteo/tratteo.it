export const useModalController = () => {
    const open = (id: string): HTMLDialogElement | undefined => {
        const el = document.getElementById(id) as HTMLDialogElement | undefined;
        console.log(el);
        if (!el) return undefined;
        el.showModal();
        return el;
    };
    const close = (id: string): HTMLDialogElement | undefined => {
        const el = document.getElementById(id) as HTMLDialogElement | undefined;
        if (!el) return undefined;
        el.close();
        return el;
    };

    return { open, close };
};
