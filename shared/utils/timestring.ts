import dayjs from "dayjs";
import type { Duration } from "dayjs/plugin/duration";

export type Timestring = `${number}${number}:${number}${number}`;

export function minutesToTimestring(minutes: number): Timestring {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}` as Timestring;
}

export function asTimestring(hours: number, minutes: number) {
    return minutesToTimestring(hours * 60 + minutes);
}

export function minTimestring(first: Timestring | undefined, second: Timestring | undefined): Timestring | undefined {
    if (!first) return undefined;
    if (!second) return first;
    const [sH, sM] = first.split(":").map(Number) as [number, number];
    const [mH, mM] = second.split(":").map(Number) as [number, number];
    return minutesToTimestring(Math.min(sH * 60 + sM, mH * 60 + mM));
}

export function maxTimestring(first: Timestring | undefined, second: Timestring | undefined): Timestring | undefined {
    if (!first) return undefined;
    if (!second) return first;
    const [sH, sM] = first.split(":").map(Number) as [number, number];
    const [mH, mM] = second.split(":").map(Number) as [number, number];
    return minutesToTimestring(Math.max(sH * 60 + sM, mH * 60 + mM));
}

export function timeDiff(first: Timestring, second: Timestring): Duration {
    const startDateTime = dayjs(`1970-01-01T${first}`);
    const endDateTime = dayjs(`1970-01-01T${second}`);
    return dayjs.duration(endDateTime.diff(startDateTime));
}
