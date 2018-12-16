// external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
// internal
import { sizeOfInt, sizeOfRecord, numbersInRecord } from '../constants'
import { Record } from './Record';
import { ReadBufferManager } from './BufferManager/ReadBufferManager';
import { WriteBufferManager } from './BufferManager/WriteBufferManager';
import {IndexRecord} from './Index/IndexRecord';

export class File {
    private readPosition: number;
    private writable: WriteStream;
    private writeCount: number;
    private readonly readCount: number;
    private readBufferManager: ReadBufferManager;
    private writeBufferManager: WriteBufferManager;

    constructor(readonly path: string, readonly id: number){
        this.readPosition = 0;
        this.readCount = 0;
        this.writeCount = 0;
        this.writable = createWriteStream(this.path);
        this.readBufferManager = new ReadBufferManager(this.path);
        this.writeBufferManager = new WriteBufferManager(this.path);
    }

    public getCurrentPage() {
        return this.readBufferManager.currentPage;
    }

    public printFile = async() => {
        let record: Record;
        let i = 0;
        await this.setNewReadable();
        console.log('printFILE');
        while(record = await this.readRecord(true)){
            // console.log(record);
            console.log(i++, record.getValue());
        }
        console.log('number of reads', this.readBufferManager.getNumOfReads());
        console.log('number of writes', this.writeBufferManager.getNumOfWrites());
        console.log('printEND');
        console.log();
        await this.setNewReadable();
    };

    public printNumberOfOperations() {
        console.log(`number of reads: ${this.readBufferManager.getNumOfReads()}`);
        console.log(`number of writes: ${this.writeBufferManager.getNumOfWrites()}`);
    }

    public async printRecordsAndKeys() {
        let record: Record;
        let i = 0;
        await this.setNewReadable();
        console.log('printFILE');
        while(record = await this.readRecord(true)){
            const recordArray = record.getRecordAsArray();
            console.log(i++);
            console.log(`a=${recordArray[0]}
c=${recordArray[1]}
x=${recordArray[2]}
y=${recordArray[3]}
z=${recordArray[4]}
key=${recordArray[5]}
        `);
        }
        console.log('printEND');
        console.log();
        await this.setNewReadable();
    }

    // public searchForRecord = async(array: number[]) => {
    //     let record: Record;
    //     while(record = await this.readRecord()) {
    //         if(File.compareArrays(record.getRecordAsArray(), array)){
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    public writeRecord = async (record: Record) => {
        await this.writeBufferManager.writeRecord(record);
    };

    public appendRecord = async (record: Record) => {
        await this.writeBufferManager.appendRecord(record);
    };

    public closeAppendBuffer = async () => {
        await this.writeBufferManager.appendRecordsToFile();
    };

    public async readPage(pageNum): Promise<Buffer> {
        await this.readBufferManager.setNewReadableStream();
        return await this.readBufferManager.readPage(pageNum);
    }

    public closeFileBuffer = async () => {
        await this.writeBufferManager.pushRecordsToFile();
    };

    public setNewWritable = async () => {
        await this.writeBufferManager.setNewWritable();
    };

    public setNewReadable = async () => {
        await this.readBufferManager.setNewReadableStream();
    };

    public readRecord = async (isPrinting: boolean = false) => {
        return await this.readBufferManager.readRecord();
    };

    private initializeRecord = (recordArray: Int32Array) => {
        return new Record(
            recordArray[0],
            recordArray[1],
            recordArray[2],
            recordArray[3],
            recordArray[4],
            recordArray[5],
        )
    };

    private static compareArrays = (array1, array2) =>
        array1.length === array2.length && array1.sort().every(function(value, index) { return value === array2.sort()[index]});

}
