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
        this.inputFile = new File('./unsortedInput');
        this.firstFile = new File('./firstFile');
        this.secondFile = new File('./secondFile');
    };

    public generateFileToSort = async () => {
        const data: Int32Array = this.dataService.getDataAsInt32Array();
        console.log(data);
        writeFile('./unsortedInput', Buffer.from(data.buffer), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        const record = await this.inputFile.readRecord();
        console.log('rec', record)
        this.firstFile.writeRecord(record);
        const rec2 = await this.firstFile.readRecord();
        console.log('rec2', rec2)
    };

}
