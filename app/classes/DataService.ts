import { Record } from './Record';
import consts from '../constants';

export class DataService {

    public data: Record[];

    constructor(data: Record[]) {
        if(!data){
            this.data = this.generateData();
        }else{
            this.data = data;
        }

    }


    public generateData = () => {
        const data = [];
        for(let i = 0; i < consts.numberOfRecordsToGenerate; i++) {
            data.push(this.generateRecord());
        }
        return data;
    }

    private generateRecord = () => {
      return new Record(
          Math.ceil(Math.random() * 1000),
          Math.ceil(Math.random() * 1000),
          Math.ceil(Math.random() * 1000),
          Math.ceil(Math.random() * 1000),
          Math.ceil(Math.random() * 1000)
      );
    }
}
