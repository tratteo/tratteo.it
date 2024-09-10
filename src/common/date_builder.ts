export default class DateBuilder {
    private date: Date;

    constructor(date?: Date) {
        this.date = date ?? new Date();
    }

    public withDate({
        year = undefined,
        month = undefined,
        day = undefined,
    }: {
        year?: number;
        month?: number;
        day?: number;
    }): DateBuilder {
        let newDate = new Date(this.date);
        if (year !== undefined) newDate.setFullYear(year);
        if (month !== undefined) newDate.setMonth(month);
        if (day !== undefined) newDate.setDate(day);
        return new DateBuilder(newDate);
    }

    public withTime({
        hours = undefined,
        minutes = undefined,
        seconds = undefined,
    }: {
        hours?: number;
        minutes?: number;
        seconds?: number;
    }): DateBuilder {
        let newDate = new Date(this.date);
        if (hours !== undefined) newDate.setHours(hours);
        if (minutes !== undefined) newDate.setMinutes(minutes);
        if (seconds !== undefined) newDate.setSeconds(seconds);
        return new DateBuilder(newDate);
    }

    public get(): Date {
        return this.date;
    }
}
