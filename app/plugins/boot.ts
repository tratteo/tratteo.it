import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import relativeTime from "dayjs/plugin/relativeTime";
export default defineNuxtPlugin((nuxtApp) => {
    dayjs.extend(duration);
    dayjs.extend(quarterOfYear);
    dayjs.extend(relativeTime);
});
