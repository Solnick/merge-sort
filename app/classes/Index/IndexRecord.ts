export class IndexRecord {
    constructor(
    readonly key: number,
    readonly pageNum: number){}

    public getRecordAsArray() {
        return [this.key, this.pageNum];
    }
}