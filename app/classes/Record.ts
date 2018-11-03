export class Record {


    constructor(private readonly a: number,
                 private readonly y: number,
                 private readonly c: number,
                 private readonly z: number,
                 private readonly x: number) {}

    private getValue = () => 10 * this.a * (Math.pow(this.x, 2) + 3 * Math.pow(this.c, 3) * Math.pow(this.z, 4) - 5 * Math.pow(this.y, 7));

    public getRecordAsArray = () => [
            this.a,
            this.c,
            this.x,
            this.y,
            this.z
        ];

    public getRecordAsInt32Array = () =>
        Int32Array.from([
            this.a,
            this.c,
            this.x,
            this.y,
            this.z
        ])
}
