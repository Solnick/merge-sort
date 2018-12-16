// external
import { createReadStream, createWriteStream, WriteStream } from 'fs';
// internal
import { sizeOfInt, sizeOfRecord, numbersInRecord } from '../../constants'
import { IndexRecord } from './IndexRecord';
import { IndexReadBufferManager } from './IndexBufferManager/IndexReadBufferManager';
import { IndexWriteBufferManager } from './IndexBufferManager/IndexWriteBufferManager';

export class IndexFile {
    private readPosition: number;
    private writable: WriteStream;
    private writeCount: number;
    private readonly readCount: number;
    private readBufferManager: IndexReadBufferManager;
    private writeBufferManager: IndexWriteBufferManager;

    constructor(readonly path: string, readonly id: number){
        this.readPosition = 0;
        this.readCount = 0;
        this.writeCount = 0;
        this.writable = createWriteStream(this.path);
        this.readBufferManager = new IndexReadBufferManager(this.path);
        this.writeBufferManager = new IndexWriteBufferManager(this.path);
    }

    public getCurrentPage() {
        return this.readBufferManager.currentPage;
    }

    // public printFile = async() => {
    //     let record: IndexRecord;
    //     let i = 0;
    //     await this.setNewReadable();
    //     console.log('printFILE');
    //     while(record = await this.readRecord(true)){
    //         // console.log(record);
    //         console.log(i++, record.getValue());
    //     }
    //     console.log('number of reads', this.readBufferManager.getNumOfReads());
    //     console.log('number of writes', this.writeBufferManager.getNumOfWrites());
    //     console.log('printEND');
    //     console.log();
    //     await this.setNewReadable();
    // };

    // public searchForRecord = async(array: number[]) => {
    //     let record: Record;
    //     while(record = await this.readRecord()) {
    //         if(File.compareArrays(record.getRecordAsArray(), array)){
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    public writeRecord = async (record: IndexRecord) => {
        await this.writeBufferManager.writeRecord(record);

    };

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

}
