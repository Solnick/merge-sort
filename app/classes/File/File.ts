//external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
//internal
import { sizeOfInt, sizeOfRecord, numbersInRecord } from '../../constants'
import { Record } from '../Record';

export class File {
    private readPosition: number;
    private writePosition: number;
    private writable: WriteStream;
    private writeCount: number;
    private readCount: number;

    constructor(readonly path: string, readonly id: number){
        this.readPosition = 0;
        this.writePosition = 0;
        this.readCount = 0;
        this.writeCount = 0;
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

    public serachForRecord = async(array: number[]) => {
      let record: Record;
      while(record = await this.readRecord()) {
          if(File.compareArrays(record.getRecordAsArray(), array)){
              return true;
          }
      }
      return false;
    };

    private static compareArrays = (array1, array2) =>
        array1.length === array2.length && array1.sort().every(function(value, index) { return value === array2.sort()[index]});

    public printFile = async() => {
        let record: Record;
        let i = 0;
        await this.setNewReadable();
        console.log('printFILE');
        while(record = await this.readRecord()){
           // console.log(record);
            console.log(i++, record.getValue());
        }

        console.log('number of reads', this.readCount);
        console.log('number of writes', this.writeCount);
        console.log('printEND');
        console.log();
    };

    public readRecord = async () => {
        const recordArray: Int32Array = new Int32Array(numbersInRecord);
        const buffer: Buffer = await this.getDataBuffer();
        this.readCount++;

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
        if(!record){
            console.log(record);
        }
        this.writeCount++;
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
