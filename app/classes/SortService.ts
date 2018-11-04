//external
import { readFile, writeFile, createReadStream } from 'fs';
import { Buffer } from 'buffer';
//internal
import { DataService } from './DataService';
import { File } from './File/File';
import { Record } from './Record';
import { events } from '../constants';


export class SortService {
    private dataService: DataService;
    private inputFile: File;
    private firstFile: File;
    private secondFile: File;
    private currentFile: File;
    private previous: Record;
    private current: Record;

    constructor() {
        this.dataService = new DataService(undefined);
        this.inputFile = new File('./unsortedInput', 0);
        this.firstFile = new File('./firstFile', 1);
        this.secondFile = new File('./secondFile', 2);
    };

    public generateFileToSort = async () => {
        const data: Int32Array = this.dataService.getDataAsInt32Array();
        writeFile('./unsortedInput', Buffer.from(data.buffer), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    };

    public sort = () => {

    };

    private merge = async () => {//TODO: Refactor this function
        let previousFirstFileRecord;
        let previousSecondFileRecord;
        let currentFirstFileRecord = await this.firstFile.readRecord();
        let currentSecondFileRecord = await this.secondFile.readRecord();
        let smallerRecord;

        while(true){
            let {
                newCurrentFirstFileRecord,
                newCurrentSecondFileRecord,
                newPreviousFirstFileRecord,
                newPreviousSecondFileRecord,
                smallerRecord
            } = await this.selectSmallerRecordAndGetNewOne({
                    currentFirstFileRecord,
                    currentSecondFileRecord,
                    previousFirstFileRecord,
                    previousSecondFileRecord
                });

            previousFirstFileRecord = newPreviousFirstFileRecord;
            previousSecondFileRecord = newPreviousSecondFileRecord;
            currentFirstFileRecord = newCurrentFirstFileRecord;
            currentSecondFileRecord = newCurrentSecondFileRecord;

            await this.inputFile.writeRecord(smallerRecord);
        }
    };

    private selectSmallerRecordAndGetNewOne = async ({currentFirstFileRecord,
                                                         currentSecondFileRecord,
                                                         previousFirstFileRecord,
                                                         previousSecondFileRecord}) => {// TODO: typing of function and its arguments

        const smallerRecord = this.selectSmallerRecord(currentFirstFileRecord, currentSecondFileRecord);
        let newCurrentFirstFileRecord = currentFirstFileRecord;// TODO: better arguments handling
        let newCurrentSecondFileRecord = currentSecondFileRecord;
        let newPreviousFirstFileRecord = previousFirstFileRecord;
        let newPreviousSecondFileRecord = previousSecondFileRecord;
        let fetchedRecord: Record;

        if(smallerRecord === currentFirstFileRecord){
            fetchedRecord = await this.firstFile.readRecord();
            if(fetchedRecord.getValue() < currentFirstFileRecord.getValue()){//series in first file ends
                //TODO: handle end series
                //events.SERIES_IN_FIRST_FILE_END emit?
            }
            newPreviousFirstFileRecord = currentFirstFileRecord;
            newCurrentFirstFileRecord = fetchedRecord;
        }else if(smallerRecord === currentSecondFileRecord){
            fetchedRecord = await this.secondFile.readRecord();
            if(fetchedRecord.getValue() < currentSecondFileRecord.getValue()){//series in first file ends
                //TODO: handle end series
                //events.SERIES_IN_FIRST_FILE_END emit?
            }
            newPreviousSecondFileRecord = currentSecondFileRecord;
            newCurrentSecondFileRecord = fetchedRecord
        }

        return {
            newCurrentFirstFileRecord,//TODO: Reconsider this return
            newCurrentSecondFileRecord,
            newPreviousFirstFileRecord,
            newPreviousSecondFileRecord,
            smallerRecord
        }
    };

    private selectSmallerRecord = (r1: Record, r2: Record): Record => r1.getValue() < r2.getValue() ? r1 : r2;

    private divide = async () => {
        while(await this.writeSeries() !== events.EOF){
            this.switchFile();
        }
    };

    private writeSeries = async (): Promise<events> => (
        new Promise<events>(async resolve => {
            let previous: Record = await this.inputFile.readRecord();
            let current: Record = await this.inputFile.readRecord();

            while(previous.getValue() < current.getValue()){
                this.currentFile.writeRecord(current);
                previous = current;
                current = await this.inputFile.readRecord();
                if(current === null){
                    resolve(events.EOF)
                }
            }
            resolve(events.SWITCH_FILE)
        })
    );

    private switchFile = (): void => {
        if(this.currentFile.id === this.firstFile.id){
            this.currentFile = this.secondFile;
        }else if(this.currentFile.id === this.secondFile.id){
            this.currentFile = this.firstFile
        }
    }
}
