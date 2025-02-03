import l from "lodash";
import { defineStore } from "pinia";

export type ToastType = "error" | "warning" | "info" | "success";

export interface ToastData {
    type: ToastType;
    message: string;
    dismissible?: boolean;
    duration?: number;
}
export const useToast = defineStore("toast", () => {
    const toasts = ref<WithId<ToastData>[]>([]);

    function dismiss(id: string) {
        toasts.value = toasts.value.filter((t) => t.id !== id);
    }

    const add = (data: ToastData) => {
        data.duration ??= 5000;
        data.dismissible ??= true;
        const id = l.uniqueId();
        toasts.value.push({ id: id, data: data });
        setTimeout(() => dismiss(id), data.duration);
    };

    return { add, toasts, dismiss };
});
