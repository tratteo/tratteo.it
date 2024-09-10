/**Returns a number `[0-1]` indicating the similarity ratio between two strings */
export function similarity(t: string, v: string, caseSensitive: boolean = false): number {
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
export function isNullOrEmpty(s: string | undefined | null): boolean {
    return s === undefined || s === null || s.length <= 0;
}

export function wordCapitalize(s: string | undefined | null): string | undefined | null {
    if (isNullOrEmpty(s)) return s;
    let splits = s?.split(" ");
    return splits?.map((s) => capitalize(s)).join(" ");
}

export function capitalize(s: string | undefined | null): string | undefined | null {
    if (isNullOrEmpty(s)) return s;
    return s!.charAt(0).toUpperCase() + s!.slice(1).toLowerCase();
}

export function minutesToReadableTimespan(mins: number): string {
    const hours = Math.floor(mins / 60);
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
