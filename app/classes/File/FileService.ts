//external
import { readFile, writeFile, createReadStream } from 'fs';
import { Buffer } from 'buffer';
//internal
import { DataService } from '../DataService';
import { File } from './File';


export class FileService {
    private dataService: DataService;
    private inputFile: File;
    private firstFile: File;
    private secondFile: File;

    constructor() {
        this.dataService = new DataService(undefined);
        this.inputFile = new File('./unsortedInput', 0);
        this.firstFile = new File('./firstFile', 1);
        this.secondFile = new File('./secondFile', 2);
    };

    private fillFileWithRecords = (data): Promise<void> =>
        new Promise((resolve) => {
            writeFile('./unsortedInput', Buffer.from(data.buffer), (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
                resolve();
            });
        });
    private sleep(time){
        return new Promise((resolve, reject) => {
            if(time){
                setTimeout(() => {
                    resolve();
                }, time);
            } else {
                reject("Time needs to be an integer");
            }
        })
    }
    public generateFileToSort = async () => {
        const data: Int32Array = this.dataService.getDataAsInt32Array();
        console.log(data);
        await this.fillFileWithRecords(data);

        const record = await this.inputFile.readRecord();
        console.log('rec', record);
        this.firstFile.writeRecord(record);

        const record2 = await this.inputFile.readRecord();
        console.log('rec', record2);
        this.firstFile.writeRecord(record2);

        const rec2 = await this.firstFile.readRecord();
        console.log('rec2', rec2);

        const rec3 = await this.firstFile.readRecord();
        console.log('rec2', rec3);

        const rec4 = await this.firstFile.readRecord();
        console.log('rec2', rec4);
    };

}
