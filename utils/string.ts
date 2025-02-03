import dayjs from "dayjs";

/**Returns a number `[0-1]` indicating the similarity ratio between two strings */
export function similarity(t: string | undefined | null, v: string | undefined | null, caseSensitive: boolean = false): number {
    if (t === undefined || t === null || v === undefined || v === null) return 0;
    var minSeq = t.length < v.length ? (caseSensitive ? t : t.toLowerCase()) : caseSensitive ? v : v.toLowerCase();
    var maxSeq = t.length < v.length ? (caseSensitive ? v : v.toLowerCase()) : caseSensitive ? t : t.toLowerCase();

    var maxMatch = 0;
    // Convolution
    for (var i = 0; i < maxSeq.length; i++) {
        var cost = 0;
        if (i + minSeq.length > maxSeq.length) return maxMatch / minSeq.length;
        for (var j = 0; j < minSeq.length; j++) {
            cost += maxSeq[i + j] == minSeq[j] ? 1 : 0;
        }
        maxMatch = Math.max(maxMatch, cost);
    }
    return maxMatch / minSeq.length;
}

export function tryParseInt(s: string | undefined | null): number | undefined {
    if (isNullOrEmpty(s)) return undefined;
    try {
        const v = Number.parseInt(s!);
        return v;
    } catch (ex) {
        return undefined;
    }
}
export function tryParse(s: string | undefined | null): number | undefined {
    if (isNullOrEmpty(s)) return undefined;
    try {
        const v = Number.parseFloat(s!);
        if (isNaN(v)) return undefined;
        return v;
    } catch (ex) {
        return undefined;
    }
}
export function isNullOrEmpty(s: string | undefined | null): boolean {
    return s === undefined || s === null || s.length <= 0;
}
export function readablePrice(unitAmount: number | undefined | null): string | undefined {
    if (!unitAmount) return undefined;
    return (unitAmount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function wordCapitalize(s: string | undefined | null): string | undefined | null {
    if (isNullOrEmpty(s)) return s;
    let splits = s?.split(" ");
    return splits?.map((s) => capitalize(s)).join(" ");
}
export function firstWord(s: string | undefined | null, cap: boolean = false): string | undefined | null {
    if (isNullOrEmpty(s)) return s;
    let splits = s?.split(" ");
    if (!splits) return "";
    const word = splits.at(0);
    return cap ? capitalize(word) : word;
}
export function capitalize(s: string | undefined | null): string | undefined {
    if (s === undefined || s === null) return undefined;
    if (s.length <= 0) return s;
    return s!.charAt(0).toUpperCase() + s!.slice(1).toLowerCase();
}
export function toShortString(v: number | undefined): string | undefined {
    if (v === undefined) return undefined;
    let sign = Math.sign(v);
    const splits = Math.abs(v).toString().split(".");
    let str = splits[0];
    if (str.length > 6) {
        str = `${str.slice(0, str.length - 6)}.${str.slice(-6, -4)}M`;
    } else if (str.length > 3) {
        str = `${str.slice(0, str.length - 3)}.${str.slice(-3, -1)}K`;
    } else if (splits.length > 1) {
        str += `.${splits[1].substring(0, 2)}`;
    }
    if (sign < 0) {
        return `-${str}`;
    }
    return str;
}
export function minutesToReadableTimespan(mins: number): string {
    const dur = dayjs.duration(mins, "minute");
    const days = Math.floor(mins / 1440);
    const hours = Math.floor((mins % 1440) / 60);
    const rest = mins % 60;
    return `${hours.toFixed(0)}h ${rest.toFixed(0)} min`;
}

export default function countryCodeToFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
