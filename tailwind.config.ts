import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    darkMode: "class",
    theme: {
        fontFamily: {
            poppins: "Poppins",
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            "night",
            // {
            //     main: {
            //         primary: "#fa882f",
            //         secondary: "#FFC192",
            //         accent: "#f3f4f6",
            //         neutral: "#271616",
            //         "base-100": "#1A110F",
            //         info: "#28ebff",
            //         success: "#62efbd",
            //         warning: "#efd057",
            //         error: "#FF6549",
            //     },
            // },
        ],
    },
};
