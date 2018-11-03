//external
import {createReadStream} from "fs";
//internal
import { sizeOfInt, sizeOfRecord } from '../../constants'

export class File {
    private position: number;

    constructor(readonly path: string){
        this.position = 0;
    }

    public readRecord = async () => {
        const recordArray: Int32Array = new Int32Array(5);
        const buffer: Buffer = await this.getDataBuffer();

        for(let i = 0; i < 5; i++) {
            recordArray[i] = buffer.readInt32LE(i* sizeOfInt);
        }

        return recordArray;
    };

    private getDataBuffer = ():Promise<Buffer> => (
        new Promise((resolve) => {
                const readable = createReadStream(this.path, {start: this.position, end: this.position + sizeOfRecord});

                this.position += sizeOfRecord;
                readable.on('readable', () => {
                    resolve(readable.read(sizeOfRecord));
                });
            }
        )
    )

}
