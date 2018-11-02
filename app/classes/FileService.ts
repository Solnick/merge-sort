import { DataService } from './DataService';
import { appendFile } from 'fs';

export class FileService {
    private dataService: DataService;

    constructor() {
        this.dataService = new DataService();
    }

    public generateFileToSort = () => {
        const data = this.dataService.generateData();
        appendFile('./message.txt', data, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        console.log(data);
        console.log('fs', appendFile);
    }
}
