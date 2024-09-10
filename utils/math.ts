import l from "lodash";

export function stdv(elems: number[]): number {
    var avg = l.mean(elems);
    return Math.sqrt(l.mean(l.map(elems, (e) => Math.pow(e - avg, 2))));
}
export function averageTrend(elems: number[]): number[] {
    let sum: number = 0;
    let avg: number = 0;
    let trend: number[] = [];
    let notNan: number = 0;
    for (let i = 0; i < elems.length; i++) {
        const element = elems[i];
        if (isNaN(element)) {
            trend.push(avg);
            continue;
        }
        notNan++;
        sum += element;
        avg = sum / notNan;
        trend.push(avg);
    }
    return trend;
}
