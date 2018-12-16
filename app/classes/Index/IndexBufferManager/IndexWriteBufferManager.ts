import { IndexRecord } from '../IndexRecord';
import {createWriteStream, WriteStream} from "fs";
import {numberOfRecordsOnPage} from '../../../constants';

export class IndexWriteBufferManager {
    private writeCount: number;
    private writable: WriteStream;
    private recordsToSave: Array<IndexRecord>;
    private flatRecordsArray: Array<number>;

    constructor(readonly path: string) {
        this.writeCount = 0;
        this.writable = createWriteStream(this.path);
        this.flatRecordsArray = new Array<number>();
        this.recordsToSave = new Array<IndexRecord>();
    };

    public getNumOfWrites = () => this.writeCount;

    public async writeRecord(record: IndexRecord) {
        await this.saveRecord(record);
    }

    private async saveRecord(record: IndexRecord) {
        this.recordsToSave.push(record);
        if(this.recordsToSave.length >= numberOfRecordsOnPage){
            await this.pushRecordsToFile();
            this.flatRecordsArray = new Array<number>();
            this.recordsToSave = new Array<IndexRecord>();
        }
    }

    public setNewWritable = async() => {
        await this.pushRecordsToFile();
        this.writable = createWriteStream(this.path);
        this.flatRecordsArray = new Array<number>();
        this.recordsToSave = new Array<IndexRecord>();
    };

    public pushRecordsToFile() {
        return new Promise((resolve => {
            this.writeCount++;
            this.recordsToSave.forEach((record) => {
                record.getRecordAsArray().forEach((num) => {
                        this.flatRecordsArray.push(num);
                    }
                )
            });
            const flatRecordsArrayToSave = new Int32Array(this.flatRecordsArray);
            this.writable.write(Buffer.from(flatRecordsArrayToSave.buffer), '', () => {
                resolve();
            });
        }))
    }
}