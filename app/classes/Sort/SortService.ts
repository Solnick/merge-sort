//external
import {writeFile} from 'fs';
import {Buffer} from 'buffer';
//internal
import {DataService} from '../DataService';
import {File} from '../File/File';
import {Record} from '../Record';
import {events} from '../../constants';
import {SortingEvent} from './SortingEvent';


export class SortService {
    private dataService: DataService;
    private inputFile: File;
    private firstFile: File;
    private secondFile: File;
    private currentFile: File;
    private previousRecord: Record;
    private currentRecord: Record;
    private filesArray: File[];

    constructor() {
        this.dataService = new DataService(undefined);
        this.inputFile = new File('./unsortedInput', 0);
        this.firstFile = new File('./firstFile', 1);
        this.currentFile = this.firstFile;
        this.secondFile = new File('./secondFile', 2);
        this.filesArray = [
            this.inputFile,
            this.firstFile,
            this.secondFile
        ];
    };

    public generateFileToSort = async () => {
        const data: Int32Array = this.dataService.getDataAsInt32Array();
        writeFile('./unsortedInput', Buffer.from(data.buffer), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    };

    public sort = async() => {
        while(await this.divide() !== events.SORTING_ENDS){
            this.merge();
        }
    };

    private finishSeries = async (fileID: number, readedRecord: Record) => {
        const sourceFile: File = this.filesArray[fileID];
        let currentRecord: Record = await sourceFile.readRecord();
        let previousRecord: Record = readedRecord;
        let fileEnd: events;

        this.inputFile.writeRecord(readedRecord);

        while(previousRecord.getValue() < currentRecord.getValue()){
            this.inputFile.writeRecord(currentRecord);
            previousRecord = currentRecord;
            currentRecord = await sourceFile.readRecord();
            if(currentRecord === null){
                fileEnd = events.EOF
            }
        }

        return {
            firstFileRecord: fileID === 1 && currentRecord,
            secondFileRecord: fileID === 2 && currentRecord,
            event: fileEnd === events.EOF ? events.EOF : (fileID === 1 ? events.SERIES_IN_FIRST_FILE_END : events.SERIES_IN_SECOND_FILE_END)
        }
    };

    private selectSmallerRecordAndGetNewOne = async (state) => {
        const newState = { ...state };
        const smallerRecord = this.selectSmallerRecord(newState.currentFirstFileRecord, newState.currentSecondFileRecord);

        if(smallerRecord === newState.currentFirstFileRecord){
            const fetchedRecord = await this.firstFile.readRecord();

            if(fetchedRecord.getValue() < newState.currentFirstFileRecord.getValue()){//series in first file ends
                newState.firstFileSeriesEnds = true;
                newState.currentFirstFileRecord = fetchedRecord;
                return newState;
            }
            newState.previousFirstFileRecord = newState.currentFirstFileRecord;
            newState.currentFirstFileRecord = fetchedRecord;
        }else if(smallerRecord === newState.currentSecondFileRecord){
            const fetchedRecord = await this.secondFile.readRecord();

            if(fetchedRecord.getValue() < newState.currentSecondFileRecord.getValue()){//series in first file ends
                newState.secondFileSeriesEnds = true;
                newState.currentSecondFileRecord = fetchedRecord;
                return newState;
            }
            newState.previousSecondFileRecord = newState.currentSecondFileRecord;
            newState.currentSecondFileRecord = fetchedRecord;
        }

        return {
            ...newState,
            smallerRecord
        };
    };

    private merge = async () => {
        const state = {
            firstFileSeriesEnds: false,
            secondFileSeriesEnds: false,
            previousFirstFileRecord: null,
            previousSecondFileRecord: null,
            currentFirstFileRecord: await this.firstFile.readRecord(),
            currentSecondFileRecord: await this.secondFile.readRecord(),
            smallerRecord: null
        };
        let sortingEvent: SortingEvent;

        while(true){
            Object.assign(state, await this.selectSmallerRecordAndGetNewOne({ ...state }));
            this.inputFile.writeRecord(state.smallerRecord);// TODO: end debug, handle new file write
            if(state.firstFileSeriesEnds){
                sortingEvent = await this.finishSeries(this.secondFile.id, state.currentSecondFileRecord);// if !EOF then sortingEvent got current record from secondFile
                if(sortingEvent.event === events.EOF){
                    this.fillWithRestOfRecords(this.firstFile);
                    break;//merge ends
                }
                state.currentSecondFileRecord = sortingEvent.secondFileRecord;
                state.currentFirstFileRecord = await this.firstFile.readRecord();
            }else if(state.secondFileSeriesEnds){
                sortingEvent = await this.finishSeries(this.secondFile.id, state.currentSecondFileRecord);// if !EOF then sortingEvent got current record from firstFile
                if(sortingEvent.event === events.EOF){
                    this.fillWithRestOfRecords(this.secondFile);
                    break;//merge ends
                }
                state.currentFirstFileRecord = sortingEvent.firstFileRecord;
                state.currentSecondFileRecord = await this.secondFile.readRecord()
            }
        }
    };

    private fillWithRestOfRecords = async (file: File) => {
        let currentRecord = await file.readRecord();
        while(currentRecord){
            this.inputFile.writeRecord(currentRecord);
            currentRecord = await file.readRecord();
        }
    };

    private selectSmallerRecord = (r1: Record, r2: Record): Record => r1.getValue() < r2.getValue() ? r1 : r2;

    private divide = async () => {
        let switchingCount = 0;

        while(await this.writeSeries() !== events.EOF){
            this.switchFile();
            switchingCount++;
        }
        if(switchingCount === 0){
            return events.SORTING_ENDS;
        }
    };

    private writeSeries = async (): Promise<events> => (
        new Promise<events>(async resolve => {
            let previous: Record = this.currentRecord || await this.inputFile.readRecord();
            let current: Record = await this.inputFile.readRecord();

            this.currentFile.writeRecord(previous);
            if(current === null){
                resolve(events.EOF);
            }
            while(previous.getValue() < current.getValue()){
                this.currentFile.writeRecord(current);
                previous = current;
                current = await this.inputFile.readRecord();
                if(current === null){
                    resolve(events.EOF)
                }
            }
            this.currentRecord = current;
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
