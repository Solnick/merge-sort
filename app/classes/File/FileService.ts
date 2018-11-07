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

    public generateFileToSort = async () => {
        const data: Int32Array = this.dataService.getDataAsInt32Array();
        console.log(data);
        await this.fillFileWithRecords(data);
    }
}
