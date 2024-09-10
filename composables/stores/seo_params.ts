import { defineStore } from "pinia";

export const useSeoParams = defineStore("seo_params", () => {
    const data = ref<any>({});

    return { data };
});
