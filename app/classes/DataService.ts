import { Record } from './Record';
import consts from '../constants';

export class DataService {

    public generateData = () => {
        const data = [];
        for(let i = 0; i < consts.numberOfRecordsToGenerate; i++) {
            data.push(this.generateRecord());
        }
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
