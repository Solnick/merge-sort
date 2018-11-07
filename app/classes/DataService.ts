import { Record } from './Record';
import { numberOfRecordsToGenerate } from '../constants';

export class DataService {

    public data: Record[];

    constructor(data: Record[]) {
        if(!data){
            this.generateData();
        }else{
            this.data = data;
        }

    }

    private getDataAsArray = (): Array<Array<number>>  => this.data.map((record: Record) => record.getRecordAsArray());

    public getFlatData = (): Array<number> => [].concat(...this.getDataAsArray());

    public getDataAsInt32Array = (): Int32Array => Int32Array.from(this.getFlatData());

    public generateData = () => {
        const data = [];
        for(let i = 0; i < numberOfRecordsToGenerate; i++) {
            data.push(this.generateRecord());
        }
        this.data = data;
    };

    private generateRecord = () => {
      return new Record(
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
      );
    };
}
