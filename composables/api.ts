export const useApi = (includeAuth: boolean = true) => {
    const config = useAppConfig();
    let api;
    if (includeAuth) {
        api = $fetch.create<ApiResponse>({
            baseURL: "/api/",
            headers: {
                Authorization: includeAuth ? `Bearer ${config.sleek.apiKey}` : "",
                "Content-Type": "application/json",
            },
        });
    } else {
        api = $fetch.create<ApiResponse>({
            baseURL: "/api/",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    return { api };
};
