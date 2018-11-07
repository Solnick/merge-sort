import {SortService} from './classes/Sort/SortService';

(async function main() {
    const sortService = new SortService();
    await sortService.generateFileToSort();
    await sortService.sort();
})();
