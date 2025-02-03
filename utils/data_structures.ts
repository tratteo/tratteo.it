import l from "lodash";
export function listGenerate<T>(length: number, generator: (i: number) => T): T[] {
    const list: T[] = [];
    for (let i = 0; i < length; i++) {
        list.push(generator(i));
    }
    return list;
}

export function count<T>(arr: T[], iteratee: (el: T) => boolean): number {
    return arr.filter(iteratee).length;
}
export function dateMidpoint(interval: DateInterval) {
    return new Date(Math.round((interval.to.getTime() + interval.from.getTime()) / 2));
}
export function mostFrequent<T>(arr: T[]): { el: T; count: number } {
    const freq: { el: T; count: number }[] = arr.map((e) => ({ el: e, count: 0 }));
    for (const e of arr) {
        const match = freq.find((i) => i.el === e);
        match!.count += 1;
    }
    return l.maxBy(freq, (o) => o.count)!;
}
