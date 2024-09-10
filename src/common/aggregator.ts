import l from "lodash";
import Timespan from "./timespan";

export interface Aggregation<K, V> {
    key: K;
    elements: V[];
}

export type Grouping = "daily" | "weekly" | "monthly" | "quarterly";

/**Grouping timeframe */
export class TimespanAggregationInterval {
    id: Grouping;
    timespan: Timespan;
    constructor(id: Grouping, timespan: Timespan) {
        this.id = id;
        this.timespan = timespan;
    }

    toString() {
        return capitalize(this.id);
    }

    getIntervals(): Timespan[] {
        switch (this.id) {
            case "daily":
                return Timespan.getDailyIntervals(this.timespan);
            case "weekly":
                return Timespan.getWeeklyIntervals(this.timespan);
            case "monthly":
                return Timespan.getMonthlyIntervals(this.timespan);
            case "quarterly":
                return Timespan.getQuarterlyIntervals(this.timespan);
            default:
                return [this.timespan];
        }
    }

    static adaptive(timespan: Timespan): TimespanAggregationInterval {
        const days = timespan.days();
        if (days <= 31) {
            return new TimespanAggregationInterval("daily", timespan);
        }
        if (days <= 120) {
            return new TimespanAggregationInterval("weekly", timespan);
        }
        if (days <= 500) {
            return new TimespanAggregationInterval("monthly", timespan);
        }
        return new TimespanAggregationInterval("quarterly", timespan);
    }
}

/** Given a list of elements, and a timespan, group the elements in a list of smaller {@link Timespan}.
 *
 * If {@link Grouping} is not provided, the function dynamically computes the corresponding {@link TimespanAggregationInterval} based on the size of the initial timespan.
 */
export function aggregate<T extends { [key: string]: any }>({
    elements,
    timespan,
    grouping,
    key,
    includeEmptyTimespans = true,
}: {
    elements: T[];
    key: (e: T) => Date;
    timespan?: Timespan;
    grouping?: Grouping | undefined;
    includeEmptyTimespans?: boolean;
}): {
    interval: TimespanAggregationInterval;
    aggregation: Aggregation<Timespan, T>[];
} {
    let elementsTimespan = Timespan.all();
    if (timespan) {
        elementsTimespan = new Timespan(timespan.from, timespan.to);
    }
    if (elementsTimespan.days() > 1095 || !timespan) {
        elements = l.orderBy(elements, key, "desc");
        let startDate = elements.length > 0 ? key(elements[elements.length - 1]) : undefined;
        let endDate = elements.length > 0 ? key(elements[0]) : undefined;
        if (!startDate || !endDate) {
            return { interval: TimespanAggregationInterval.adaptive(elementsTimespan), aggregation: [] };
        } else {
            elementsTimespan = new Timespan(startDate, endDate);
        }
    }
    let interval = grouping
        ? new TimespanAggregationInterval(grouping, elementsTimespan)
        : TimespanAggregationInterval.adaptive(elementsTimespan);
    let aggregation: Aggregation<Timespan, T>[] = interval
        .getIntervals()
        .map((t) => <Aggregation<Timespan, T>>{ key: t, elements: <T[]>[] });

    for (const doc of elements) {
        let match = aggregation.find((d) => d.key.fits(key(doc)));
        if (match) {
            match.elements.push(doc);
        }
    }
    if (!includeEmptyTimespans) {
        aggregation = aggregation.filter((a) => a.elements.length > 0);
    }
    return {
        interval: interval,
        aggregation: aggregation,
    };
}
