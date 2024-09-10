export const useLoadingModal = () => {
    const modalId = "8022130b-566f-4445-8676-94fef6e22414";
    const controller = useModalController();

    const load = async <T>(task: Promise<T>, info?: string): Promise<Awaited<T>> => {
        const modal = controller.open(modalId);
        const children = modal?.getElementsByClassName("info-text");
        if (children) {
            console.log((children[0].textContent = info ?? ""));
        }
        const res = await task;
        controller.close(modalId);
        return res;
    };

    return { load, id: modalId };
};
