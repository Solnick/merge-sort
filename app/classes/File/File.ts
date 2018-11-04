//external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
//internal
import { sizeOfInt, sizeOfRecord, numbersInRecord } from '../../constants'
import { Record } from '../Record';

export class File {
    private readPosition: number;
    private writePosition: number;

    constructor(readonly path: string, readonly id: number){
        this.readPosition = 0;
        this.writePosition = 0;
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

    public readRecord = async () => {
        const recordArray: Int32Array = new Int32Array(numbersInRecord);
        const buffer: Buffer = await this.getDataBuffer();

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
        this.getWritable().write(buffer);
        this.writePosition += sizeOfRecord;
    };

    private getWritable = (): WriteStream =>
     createWriteStream(this.path, {start: this.writePosition});

}
