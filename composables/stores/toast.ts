import l from "lodash";
import { defineStore } from "pinia";

export enum ToastType {
    error,
    warning,
    info,
    success,
}

export interface ToastData {
    type: ToastType;
    message: string;
    id: string;
}
export const useToast = defineStore("toast", () => {
    const toasts = ref<ToastData[]>([]);

    function dequeue(data: ToastData) {
        toasts.value = toasts.value.filter((t) => t.id !== data.id);
    }

    const add = ({ type, message, durationMs = 2000 }: { type: ToastType; message: string; durationMs?: number }) => {
        const toastData = { type: type, message: message, id: l.uniqueId() };
        toasts.value.push(toastData);
        setTimeout(() => dequeue(toastData), durationMs);
    };

    return { add, toasts };
});
