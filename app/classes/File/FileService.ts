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
        // readFile('./unsortedInput', (err, buffer) => {
        //     if (err) throw err;
        //     let i = 0;
        //     console.log('The "data to append" was appended to file!', buffer.readInt32LE(0),buffer.readInt32LE(i+=4), buffer.readInt32LE(i+=4));
        // });
        const record = await this.inputFile.readRecord();
        console.log('rec', record)
    };

}
