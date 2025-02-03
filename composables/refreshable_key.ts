export const useRefreshableKey = () => {
    const key = ref<number>(0);
    const refresh = () => {
        key.value = (key.value + 1) % 2;
    };
    return { key, refresh };
};
