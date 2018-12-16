import { IndexRecord } from './IndexRecord';
import { File } from '../File';
import { IndexFile } from './IndexFile';
import { Record } from '../Record';
import { numberOfRecordsOnPage } from '../../constants';

export class Index {
    private indexList: Array<IndexRecord>;
    private overflowSection: Array<IndexRecord>;
    private file: File;
    private indexFile: IndexFile;
    public currentPage;

    constructor(file){
        this.file = file;
        this.indexFile = new IndexFile('index', 666);
        this.indexList = new Array<IndexRecord>();
        this.overflowSection = new Array<IndexRecord>();
        this.currentPage = {
            recordsOnPage: 0,
            pageNum: 0,
        }
    }

    public async buildIndex() {
        let currentRecord: Record = await this.file.readRecord();
        let maxPageNum = 0;
        let recordsOnLastPage = 0;
        while(currentRecord){
            let currentPage = this.file.getCurrentPage();
            maxPageNum = (currentPage > maxPageNum)? currentPage : maxPageNum;
            this.indexList.push(new IndexRecord(currentRecord.key, currentPage));
            currentRecord = await this.file.readRecord();
        }
        this.currentPage.pageNum = maxPageNum;
        this.indexList.forEach(indexRecord => {
            if(indexRecord.pageNum === maxPageNum){
                recordsOnLastPage++;
            }
        });
        this.currentPage.recordsOnPage = recordsOnLastPage;
        this.sortIndex();
        await this.saveIndexToFile();
    }

    public printIndex() {
        this.indexList.forEach(
            (indexRecord, index) =>(
                console.log(`${index}: key=${indexRecord.key}; pageNum=${indexRecord.pageNum}`))
        );
        console.log('---Overflow---');
        this.overflowSection.forEach(
            (indexRecord, index) =>(
                console.log(`${index}: key=${indexRecord.key}; pageNum=${indexRecord.pageNum}`))
        )
    }

    private sortIndex() {
        this.indexList.sort(
            (currentIndexRecord: IndexRecord, nextIndexRecord) => (
                (currentIndexRecord.key === nextIndexRecord.key) ? 0 : (
                    (currentIndexRecord.key > nextIndexRecord.key)?1:-1)
            )
        );
    }

    private async saveIndexToFile() {
        await this.indexFile.setNewWritable();
        this.indexList.forEach(async (indexRecord: IndexRecord) => await this.indexFile.writeRecord(indexRecord));
        await this.indexFile.closeFileBuffer();
    }

    private removeFromIndex(key) {
        let removed = this.indexList.splice(this.indexList.findIndex((indexRecord: IndexRecord) => indexRecord === key),1);
        if(!removed) {
            removed = this.overflowSection.splice(this.indexList.findIndex((indexRecord: IndexRecord) => indexRecord === key),1);
        }
        return removed;
    }

    public searchForIndexRecord(key: number) {
        const foundedIndexRecord = this.indexList.find((indexRecord: IndexRecord) => indexRecord.key === key);
        if(!foundedIndexRecord){
            return this.overflowSection.find((indexRecord: IndexRecord) => indexRecord.key === key);
        }
        return foundedIndexRecord
    }

    private getAvailablePage(): number {
        if(this.currentPage.recordsOnPage >= numberOfRecordsOnPage) {
            this.currentPage.pageNum++;
            this.currentPage.recordsOnPage=0;
        }
        this.currentPage.recordsOnPage++;
        return this.currentPage.pageNum;
    }

    public async addRecordToIndex(record: Record) {
        if(this.overflowSection.length > Math.ceil(Math.log(this.indexList.length)/Math.log(2))) {
            await this.reorganiseIndex();
        }
        this.overflowSection.push(new IndexRecord(Number(record.key), this.getAvailablePage()))
    }

    public async reorganiseIndex() {
        this.overflowSection.forEach((overflowRecord: IndexRecord) => {
            this.indexList.push(overflowRecord);
        });
        this.overflowSection = new Array<IndexRecord>();
        this.sortIndex();
        await this.saveIndexToFile();
    }
}