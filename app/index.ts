import {SortService} from './classes/Sort/SortService';
import {OperationManager} from './classes/Index/OperationManager';
import {sleep} from './utils/sleep';
import {CLI_EVENTS, actions} from './constants';

(async function main() {
    // const sortService = new SortService();
    // await sortService.generateFileToSort();
    // await sortService.sort();
    const operationManager = new OperationManager();
    await operationManager.generateDatabase();
    await operationManager.initializeIndex();
    operationManager.printIndex();
    if(!actions) {
        let cliStatus = await operationManager.runCLI();
        while (cliStatus !== 1) {
            cliStatus = await operationManager.runCLI();
        }
    } else {
        await operationManager.runFromTestInput(actions);
    }
    return 0;

})();
