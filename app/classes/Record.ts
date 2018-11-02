export class Record {


    constructor(private readonly a: number,
                 private readonly y: number,
                 private readonly c: number,
                 private readonly z: number,
                 private readonly x: number) {}

    private getValue = () => 10 * this.a * (Math.pow(this.x, 2) + 3 * Math.pow(this.c, 3) * Math.pow(this.z, 4) - 5 * Math.pow(this.y, 7));

    private getRecords = () => {
        return {
            a: this.a,
            c: this.c,
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
}
