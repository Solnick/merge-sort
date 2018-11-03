//external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
//internal
import { sizeOfInt, sizeOfRecord, numbersInRecord } from '../../constants'
import { Record } from '../Record';

export class File {
    private readPosition: number;
    private writePosition: number;

    constructor(readonly path: string){
        this.readPosition = 0;
        this.writePosition = 0;
    }

    public readRecord = async () => {
        const recordArray: Int32Array = new Int32Array(numbersInRecord);
        const buffer: Buffer = await this.getDataBuffer();

        for(let i = 0; i < numbersInRecord; i++) {
            recordArray[i] = buffer.readInt32LE(i * sizeOfInt);
        }

        return recordArray;
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
        this.getWritable().write(buffer)
    };

    private getWritable = (): WriteStream =>
     createWriteStream(this.path, {start: this.writePosition});


}
