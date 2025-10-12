export interface AppMeta {
    name: string;
    url: string;
    author: {
        name: string;
        url: string;
        image: string;
        email: string;
        description: string;
    };
}
export const appMeta: AppMeta = {
    name: "Matteo Beltrame",
    url: "https://tratteo.it",
    author: {
        name: "Matteo Beltrame",
        url: "https://tratteo.it",
        image: "/favicon.svg",
        email: "bltmtt@gmail.com",
        description: "Computer Scientist, Solopreneur in the making: I kicked myself out of the job world to become the boss of myself",
    },
};
