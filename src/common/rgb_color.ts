export class RgbColor {
    red: number = 0;
    green: number = 0;
    blue: number = 0;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    static fromHex(hex: string): RgbColor {
        const result = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/);
        if (result) {
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);
            return new RgbColor(r, g, b);
        }
        return new RgbColor(0, 0, 0);
    }

    toString(alpha: number = 1) {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
    }
}
