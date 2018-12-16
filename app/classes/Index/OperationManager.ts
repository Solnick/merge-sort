import * as readline from 'readline';
import { File } from '../File';
import { writeFile } from 'fs';
import { Buffer } from 'buffer';
import {CLI_EVENTS, dataArray, numberOfRecordsOnPage, numbersInRecord, sizeOfInt, sizeOfRecord} from '../../constants';
import { Record } from '../Record';
import { DataService } from '../DataService';
import { Index } from './Index';
import {IndexRecord} from './IndexRecord';
import {sleep} from '../../utils/sleep';

export class OperationManager {
    private inputFile: File;
    private dataService: DataService;
    private index: Index;
    private consoleInputReader;

    constructor() {
        const recordsArray = dataArray && dataArray.map((obj)=> new Record(obj.a, obj.c, obj.x, obj.y, obj.z, obj.key));
        this.dataService = new DataService(recordsArray);
        this.inputFile = new File('./Database', 1234);
        this.consoleInputReader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public async initializeIndex() {
        await this.inputFile.printRecordsAndKeys();
        this.index = new Index(this.inputFile);
        await this.index.buildIndex();
    }

    public printIndex() {
        console.log();
        this.index.printIndex();
    }
    public generateDatabase = async () => {
        return new Promise((resolve, reject) => {
            const data: Int32Array = this.dataService.getDataAsInt32Array();
            writeFile('./Database', Buffer.from(data.buffer), (err) => {
                if (err) {
                    reject();
                }
                resolve()
            });
        })
    };

    private async removeRecord(key) {
        const { pageNum } = this.index.searchForIndexRecord(key);
    }


    private async printRecord(key) {
        let endOfRecordIndex: number;
        const indexRecord = this.index.searchForIndexRecord(key);
        await this.inputFile.closeAppendBuffer();
        if(!indexRecord) {
            console.log('record not found');
        } else {
            const pageBuffer: Buffer = await this.inputFile.readPage(indexRecord.pageNum);
            let flatRecordsArray: Int32Array = new Int32Array(numberOfRecordsOnPage * numbersInRecord);

            for (let i = 0; i < numberOfRecordsOnPage * numbersInRecord; i++) {
                flatRecordsArray[i] = pageBuffer.readInt32LE(i * sizeOfInt);
                if (flatRecordsArray[i] === key && i % 6 === 5) {
                    endOfRecordIndex = i;
                    break;
                }
            }

            console.log(`
                a=${flatRecordsArray[endOfRecordIndex - 5]}
                c=${flatRecordsArray[endOfRecordIndex - 4]}
                x=${flatRecordsArray[endOfRecordIndex - 3]}
                y=${flatRecordsArray[endOfRecordIndex - 2]}
                z=${flatRecordsArray[endOfRecordIndex - 1]}
                key=${flatRecordsArray[endOfRecordIndex]}
                `)
        }
    }
    // private async updateRecord(key) {
    //     let endOfRecordIndex: number;
    //     const indexRecord: IndexRecord = this.index.searchForIndexRecord(key);
    //     const pageBuffer: Buffer = await this.inputFile.readPage(indexRecord.pageNum);
    //     let flatRecordsArray: Int32Array = new Int32Array();
    //
    //     for(let i = 0; i < numberOfRecordsOnPage * numbersInRecord; i+=sizeOfRecord) {
    //         flatRecordsArray[i] = pageBuffer.readInt32LE(i*sizeOfInt);
    //         if(flatRecordsArray[i] === key && i%6 === 5) {
    //             endOfRecordIndex = i;
    //         }
    //     }
    //
    // }

    private async addRecord(record: Record) {
        await this.inputFile.appendRecord(record);
        await this.index.addRecordToIndex(record);
    }

    private runTestCommand(input) {
        return new Promise((async (resolve) => {
            switch (input.action) {
                case 'exit': {
                    await this.index.reorganiseIndex();
                    resolve(CLI_EVENTS.EXIT);
                    break;
                }
                case 'print record': {
                    console.log(`-------------print record --key ${input.key}-------------`);
                    await this.printRecord(Number(input.key));
                    await sleep(1000);
                    break;
                }
                case 'add': {
                    console.log(`-------------add record --key ${input.key}-------------`);
                    await this.addRecord(new Record(
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        input.key,
                    ));
                    this.printIndex();
                    this.inputFile.printNumberOfOperations();
                    await sleep(1000);
                    break;
                }
                case 'reorganise': {
                    console.log(`-------------reorganise-------------`);
                    await this.index.reorganiseIndex();
                    this.printIndex();
                    await sleep(1000);
                    break;
                }
                case 'print file': {
                    console.log(`-------------print file-------------`);
                    await this.inputFile.printRecordsAndKeys();
                    await sleep(1000);
                    break;
                }
                case 'print index': {
                    console.log(`-------------print index-------------`);
                    this.printIndex();
                    await sleep(1000);
                    break;
                }
                default: {
                    break;
                }
            }
        }));
    }
    public runFromTestInput(inputActions) {
        inputActions.forEach(async (input) => {
           await this.runTestCommand(input);
        })
    }

    public runCLI(): Promise<CLI_EVENTS> {
        return new Promise((resolve, reject) => {
            this.consoleInputReader.question('type command: ', async answer => {
                switch (answer) {
                    // case 'exit': {
                    //     resolve(CLI_EVENTS.EXIT);
                    //     break;
                    // }
                    case 'print record': {
                        this.consoleInputReader.question('key:', async key => {
                            await this.printRecord(Number(key));
                            resolve(CLI_EVENTS.CONTINUE);
                        });
                        break;
                    }
                    case 'add': {
                        this.consoleInputReader.question('type key:', async key => {
                            await this.addRecord(new Record(
                                Math.ceil(Math.random() * 10),
                                Math.ceil(Math.random() * 10),
                                Math.ceil(Math.random() * 10),
                                Math.ceil(Math.random() * 10),
                                Math.ceil(Math.random() * 10),
                                key,
                            ));
                            this.printIndex();
                            this.inputFile.printNumberOfOperations();
                            resolve(CLI_EVENTS.CONTINUE);
                        });
                        break;
                    }
                    case 'reorganise': {
                        await this.index.reorganiseIndex();
                        this.printIndex();
                        resolve(CLI_EVENTS.CONTINUE);
                        break;
                    }
                    case 'print file': {
                        await this.inputFile.printRecordsAndKeys();
                        resolve(CLI_EVENTS.CONTINUE);
                        break;
                    }
                    case 'print index': {
                        this.printIndex();
                        resolve(CLI_EVENTS.CONTINUE);
                        break;
                    }
                    default: {
                        resolve(CLI_EVENTS.CONTINUE);
                    }
                }
            });
        })
    }

}