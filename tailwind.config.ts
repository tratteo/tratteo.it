import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    darkMode: "class",
    theme: {
        fontFamily: {
            poppins: "Poppins",
            inconsolata: "Inconsolata",
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                main: {
                    primary: "#ffc108",
                    accent: "#FFFFFFFF",
                    "base-100": "#111111",
                    info: "#28ebff",
                    success: "#62efbd",
                    warning: "#efd057",
                    error: "#FF6549",
                },
            },
        ],
    },
};
