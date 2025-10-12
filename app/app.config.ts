export default defineAppConfig({
    ui: {
        card: {
            slots: {
                body: "flex flex-col gap-2",
            },
        },
        formField: {
            slots: {
                container: "flex flex-col gap-2",
                help: "m-0",
            },
        },
        link: {
            variants: {
                active: {
                    false: "text-dimmed",
                },
            },
        },
        toaster: {
            slots: {
                viewport: "z-[10001]",
            },
        },
        colors: {
            primary: "primary",
            secondary: "secondary",
            neutral: "neutral",
            info: "info",
            warning: "warning",
            success: "success",
            error: "error",
        },
    },
});
