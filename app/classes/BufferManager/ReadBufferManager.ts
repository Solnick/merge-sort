// external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
// internal
import { sizeOfInt, sizeOfRecord, numbersInRecord, numberOfRecordsOnPage, numberOfRecordsToGenerate } from '../../constants'
import { Record } from '../Record';

export class ReadBufferManager {
    private readPosition: number;
    private readBuffer: Buffer;
    private positionInBuffer; number;
    public numberOfReads: number;

    constructor(readonly path: string) {
        this.readPosition = 0;
        this.positionInBuffer = 0;
        this.numberOfReads = 0;
        this.getNewReadBuffer()
            .then(buff => this.readBuffer = buff);
     };

    public getNumOfReads = () => this.numberOfReads;
    public async readRecord() {
        // if(this.readPosition >= numberOfRecordsToGenerate*sizeOfRecord){
        //     return null;
        // }
        const recordArray: Int32Array = new Int32Array(numbersInRecord);
        if(this.positionInBuffer === numberOfRecordsOnPage) {
            this.readBuffer = await this.getNewReadBuffer();
            this.positionInBuffer = 0;
        }
        const baseOffset = sizeOfRecord*this.positionInBuffer;
        if(!this.readBuffer || baseOffset >= this.readBuffer.length){
            this.readPosition = 0;
            this.positionInBuffer = 0;
            return null;
        }
        for(let i = 0; i < numbersInRecord; i++) {
            if(!this.readBuffer){
                this.readBuffer = await this.getNewReadBuffer();
            }
            recordArray[i] = this.readBuffer.readInt32LE(baseOffset + i * sizeOfInt);
            if(recordArray[i] === null){
                this.readBuffer = await this.getNewReadBuffer();
                this.positionInBuffer = 0;
                recordArray[i] = this.readBuffer.readInt32LE(baseOffset + i * sizeOfInt);
                if(this.readBuffer === null) {
                    this.readPosition = 0;
                    this.positionInBuffer = 0;
                    return null;
                }
            }
        }
        this.positionInBuffer++;
        return this.initializeRecord(recordArray);
    };

    public async setNewReadableStream() {
        this.positionInBuffer = 0;
        this.readPosition = 0;
        this.readBuffer = await this.getNewReadBuffer();
    }
    private getNewReadBuffer = async () => {
        const buffer: Buffer = await this.getDataBuffer();

        if(buffer === null){
            this.readPosition = 0;
            return null;
        }
        return buffer;
    };

    private getDataBuffer = ():Promise<Buffer> => (
        new Promise((resolve) => {
            this.numberOfReads++;
            const readable = createReadStream(
                this.path,
                {
                    start: this.readPosition,
                    end: this.readPosition + sizeOfRecord*numberOfRecordsOnPage
                });

            this.readPosition += sizeOfRecord*numberOfRecordsOnPage;

            readable.on('readable', () => {
                resolve(readable.read(sizeOfRecord*numberOfRecordsOnPage));
            });
        })
    );

    private initializeRecord = (recordArray: Int32Array) => {
        return new Record(
            recordArray[0],
            recordArray[1],
            recordArray[2],
            recordArray[3],
            recordArray[4]
        )
    };
}