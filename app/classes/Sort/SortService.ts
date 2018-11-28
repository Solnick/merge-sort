//external
import {writeFile} from 'fs';
import {Buffer} from 'buffer';
//internal
import {DataService} from '../DataService';
import {File} from '../File/File';
import {Record} from '../Record';
import {events, dataArray, showFileAfterEveryPhase} from '../../constants';
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
        const recordsArray = dataArray && dataArray.map((obj)=> new Record(obj.a, obj.c, obj.x, obj.y, obj.z));
        this.dataService = new DataService(recordsArray);
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

        return new Promise((resolve, reject) => {
            writeFile('./unsortedInput', Buffer.from(data.buffer), (err) => {
                if (err) {
                    reject(err);
                }
                resolve()
            });
        })
    };

    public sort = async() => {
        await this.inputFile.printFile();
        let phaseNum = 0;
        while(await this.divide() !== events.SORTING_ENDS){
            phaseNum++;
            this.firstFile.setNewReadable();
            this.secondFile.setNewReadable();
            this.inputFile.setNewWritable();
            if(showFileAfterEveryPhase){
                console.log('firstFile\n');
                await this.firstFile.printFile();
                console.log('secondFile\n');
                await this.secondFile.printFile()
            }
            await this.merge();
            this.inputFile.setNewReadable();
            this.firstFile.setNewWritable();
            this.secondFile.setNewWritable();
            if(showFileAfterEveryPhase){
                console.log('phaseNum =', phaseNum);
                await this.inputFile.printFile();
            }
        }

        await this.inputFile.printFile();
        console.log('phaseNum =', phaseNum);
    };

    private finishSeries = async (fileID: number, readedRecord: Record) => {
        const sourceFile: File = this.filesArray[fileID];
        let currentRecord: Record = await sourceFile.readRecord();
        let previousRecord: Record = readedRecord;
        let fileEnd: events;

        await this.inputFile.writeRecord(readedRecord);
        if(!currentRecord){//EOF
            return {
                firstFileRecord: null,
                secondFileRecord: null,
                event: events.EOF,
            }
        }
        while(previousRecord && currentRecord && (previousRecord.getValue() < currentRecord.getValue())){
            await this.inputFile.writeRecord(currentRecord);
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
            const fetchedRecord = await this.firstFile.readRecord();//unhandled EOF
            if(fetchedRecord === null){
                return {
                    ...newState,
                    smallerRecord,
                    firstFileEnds: true
                }
            }

            if(fetchedRecord.getValue() < newState.currentFirstFileRecord.getValue()){//series in first file ends
                newState.firstFileSeriesEnds = true;
            }
            newState.previousFirstFileRecord = newState.currentFirstFileRecord;
            newState.currentFirstFileRecord = fetchedRecord;
        }else if(smallerRecord === newState.currentSecondFileRecord){
            const fetchedRecord = await this.secondFile.readRecord();
            if(fetchedRecord === null){
                return {
                    ...newState,
                    smallerRecord,
                    secondFileEnds: true
                }
            }

            if(fetchedRecord.getValue() < newState.currentSecondFileRecord.getValue()){//series in first file ends
                newState.secondFileSeriesEnds = true;
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
            firstFileEnds: false,
            secondFileEnds: false,
            previousFirstFileRecord: null,
            previousSecondFileRecord: null,
            currentFirstFileRecord: await this.firstFile.readRecord(),
            currentSecondFileRecord: await this.secondFile.readRecord(),
            smallerRecord: null
        };
        let sortingEvent: SortingEvent;

        while(true){
            Object.assign(state, await this.selectSmallerRecordAndGetNewOne({ ...state }));//unhandled EOF
            await this.inputFile.writeRecord(state.smallerRecord);
            if(state.firstFileEnds){
                //fill With rest of SecondFile
                await this.inputFile.writeRecord(state.currentSecondFileRecord);
                await this.fillWithRestOfRecords(this.secondFile);
                break;//merge ends
            }else if(state.secondFileEnds){
                //fill With rest of FirstFile
                await this.inputFile.writeRecord(state.currentFirstFileRecord);
                await this.fillWithRestOfRecords(this.firstFile);
                break;//merge ends
            }else if(state.firstFileSeriesEnds){
                sortingEvent = await this.finishSeries(this.secondFile.id, state.currentSecondFileRecord);// if !EOF then sortingEvent got current record from secondFile
                if(sortingEvent.event === events.EOF){
                    if(state.currentFirstFileRecord){
                        await this.inputFile.writeRecord(state.currentFirstFileRecord);
                    }
                    await this.fillWithRestOfRecords(this.firstFile);
                    break;//merge ends
                }
                state.currentSecondFileRecord = sortingEvent.secondFileRecord;
                //state.currentFirstFileRecord = await this.firstFile.readRecord();
            }else if(state.secondFileSeriesEnds){
                sortingEvent = await this.finishSeries(this.firstFile.id, state.currentFirstFileRecord);// if !EOF then sortingEvent got current record from firstFile
                if(sortingEvent.event === events.EOF){
                    if(state.currentSecondFileRecord){
                        await this.inputFile.writeRecord(state.currentSecondFileRecord);
                    }
                    await this.fillWithRestOfRecords(this.secondFile);
                    break;//merge ends
                }
                state.currentFirstFileRecord = sortingEvent.firstFileRecord;
                //state.currentSecondFileRecord = await this.secondFile.readRecord()
            }
            state.secondFileSeriesEnds = false;
            state.firstFileSeriesEnds = false;
        }
    };

    private fillWithRestOfRecords = async (file: File) => {
        let currentRecord = await file.readRecord();
        while(currentRecord){
            await this.inputFile.writeRecord(currentRecord);
            currentRecord = await file.readRecord();
        }
    };

    private selectSmallerRecord = (r1: Record, r2: Record): Record => r1.getValue() < r2.getValue() ? r1 : r2;

    private divide = async () => {
        let switchingCount = 0;
        this.currentFile = this.firstFile;
        this.currentRecord = undefined;

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

            await this.currentFile.writeRecord(previous);
            if(current === null){
                resolve(events.EOF);
                return;
            }
            while(previous && current && (previous.getValue() < current.getValue())){
                await this.currentFile.writeRecord(current);
                previous = current;
                current = await this.inputFile.readRecord();
                if(current === null){
                    resolve(events.EOF);
                    break;
                }
            }
            this.currentRecord = current;
            resolve(events.SWITCH_FILE);
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
