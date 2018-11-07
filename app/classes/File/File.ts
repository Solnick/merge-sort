//external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
//internal
import { sizeOfInt, sizeOfRecord, numbersInRecord } from '../../constants'
import { Record } from '../Record';

export class File {
    private readPosition: number;
    private writePosition: number;
    private writable: WriteStream;

    constructor(readonly path: string, readonly id: number){
        this.readPosition = 0;
        this.writePosition = 0;
        this.writable = createWriteStream(this.path);
    }

    private initializeRecord = (recordArray: Int32Array) => {
        return new Record(
            recordArray[0],
            recordArray[1],
            recordArray[2],
            recordArray[3],
            recordArray[4]
        )
    };

    public printFile = async() => {
        let record: Record;
        this.setNewReadable();
        console.log('printFILE');
        while(record = await this.readRecord()){
            console.log(record.getValue());
        }
        console.log('printEND');
    };

    public readRecord = async () => {
        const recordArray: Int32Array = new Int32Array(numbersInRecord);
        const buffer: Buffer = await this.getDataBuffer();

        if(buffer === null){
            this.readPosition = 0;
            return null;
        }
        for(let i = 0; i < numbersInRecord; i++) {
            recordArray[i] = buffer.readInt32LE(i * sizeOfInt);
            if(recordArray[i] === null){
                this.readPosition = 0;
                return null;
            }
        }

        return this.initializeRecord(recordArray);
    };

    private getDataBuffer = ():Promise<Buffer> => (
        new Promise((resolve) => {
                const readable = createReadStream(this.path, {start: this.readPosition, end: this.readPosition + sizeOfRecord});

                this.readPosition += sizeOfRecord;
                readable.on('readable', () => {
                    resolve(readable.read(sizeOfRecord));
                });
            }
        )
    );

    public writeRecord = (record: Record) => {
        const buffer = Buffer.from(record.getRecordAsInt32Array().buffer);
        this.writable.write(buffer);
        this.writePosition += sizeOfRecord;
    };

    public setNewWritable = (): void => {
        this.writable = createWriteStream(this.path);
    };

    public setNewReadable = (): void => {
        this.readPosition = 0;
    }
}
