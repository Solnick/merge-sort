import {Record} from '../Record';
import {createWriteStream, WriteStream} from "fs";
import {numberOfRecordsOnPage} from '../../constants';

export class WriteBufferManager {
    private writeCount: number;
    private writable: WriteStream;
    private recordsToSave: Array<Record>;
    private flatRecordsArray: Array<number>;

    constructor(readonly path: string) {
        this.writeCount = 0;
        this.writable = createWriteStream(this.path);
        this.flatRecordsArray = new Array<number>();
        this.recordsToSave = new Array<Record>();
    };

    public getNumOfWrites = () => this.writeCount;

    public async writeRecord(record: Record) {
        await this.saveRecord(record);
    }

    private async saveRecord(record: Record) {
        this.recordsToSave.push(record);
        if(this.recordsToSave.length >= numberOfRecordsOnPage){
            await this.pushRecordsToFile();
            this.flatRecordsArray = new Array<number>();
            this.recordsToSave = new Array<Record>();
        }
    }

    public setNewWritable = async() => {
        await this.pushRecordsToFile();
        this.writable = createWriteStream(this.path);
        this.flatRecordsArray = new Array<number>();
        this.recordsToSave = new Array<Record>();
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