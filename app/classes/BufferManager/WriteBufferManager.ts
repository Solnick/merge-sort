import {Record} from '../Record';
import {createWriteStream, WriteStream, appendFile, statSync, appendFileSync} from "fs";
import {numberOfRecordsOnPage, sizeOfInt, sizeOfRecord} from '../../constants';

export class WriteBufferManager {
    private writeCount: number;
    private writable: WriteStream;
    private recordsToSave: Array<Record>;
    private recordsToAppend: Array<Record>;
    private flatRecordsArray: Array<number>;

    constructor(readonly path: string) {
        this.writeCount = 0;
        this.recordsToAppend = new Array<Record>();
        this.writable = createWriteStream(this.path);
        this.flatRecordsArray = new Array<number>();
        this.recordsToSave = new Array<Record>();
    };

    public getNumOfWrites = () => this.writeCount;

    public async writeRecord(record: Record) {
        await this.saveRecord(record);
    }

    public async appendRecord(record: Record) {
        this.recordsToAppend.push(record);
        if(this.recordsToAppend.length >= numberOfRecordsOnPage){
            await this.appendRecordsToFile();
            this.recordsToAppend = new Array<Record>();
        }
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

    public async appendRecordsToFile() {
        return new Promise( resolve => {
            let recordsAsArray = Array<number>();
            if(this.recordsToAppend.length > 0) {
                this.recordsToAppend.forEach((record) => {
                    record.getRecordAsArray().forEach((num) => {
                            recordsAsArray.push(num);
                        }
                    )
                });
                const flatRecordsArrayToAppend = new Int32Array(recordsAsArray);
                appendFile(this.path, Buffer.from(flatRecordsArrayToAppend.buffer), () => {
                    resolve()
                });
            } else {
                resolve();
            }
        })
    }

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