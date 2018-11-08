/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/classes/DataService.ts":
/*!************************************!*\
  !*** ./app/classes/DataService.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Record_1 = __webpack_require__(/*! ./Record */ "./app/classes/Record.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./app/constants.ts");
class DataService {
    constructor(data) {
        this.getDataAsArray = () => this.data.map((record) => record.getRecordAsArray());
        this.getFlatData = () => [].concat(...this.getDataAsArray());
        this.getDataAsInt32Array = () => Int32Array.from(this.getFlatData());
        this.generateData = () => {
            const data = [];
            for (let i = 0; i < constants_1.numberOfRecordsToGenerate; i++) {
                data.push(this.generateRecord());
            }
            this.data = data;
        };
        this.generateRecord = () => {
            return new Record_1.Record(Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10));
        };
        if (!data) {
            this.generateData();
        }
        else {
            this.data = data;
        }
    }
}
exports.DataService = DataService;


/***/ }),

/***/ "./app/classes/File/File.ts":
/*!**********************************!*\
  !*** ./app/classes/File/File.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __webpack_require__(/*! fs */ "fs");
const constants_1 = __webpack_require__(/*! ../../constants */ "./app/constants.ts");
const Record_1 = __webpack_require__(/*! ../Record */ "./app/classes/Record.ts");
class File {
    constructor(path, id) {
        this.path = path;
        this.id = id;
        this.initializeRecord = (recordArray) => {
            return new Record_1.Record(recordArray[0], recordArray[1], recordArray[2], recordArray[3], recordArray[4]);
        };
        this.printFile = () => __awaiter(this, void 0, void 0, function* () {
            let record;
            this.setNewReadable();
            console.log('printFILE');
            while (record = yield this.readRecord()) {
                console.log(record.getValue());
            }
            console.log('number of reads', this.readCount);
            console.log('number of writes', this.writeCount);
            console.log('printEND');
            console.log();
        });
        this.readRecord = () => __awaiter(this, void 0, void 0, function* () {
            const recordArray = new Int32Array(constants_1.numbersInRecord);
            const buffer = yield this.getDataBuffer();
            this.readCount++;
            if (buffer === null) {
                this.readPosition = 0;
                return null;
            }
            for (let i = 0; i < constants_1.numbersInRecord; i++) {
                recordArray[i] = buffer.readInt32LE(i * constants_1.sizeOfInt);
                if (recordArray[i] === null) {
                    this.readPosition = 0;
                    return null;
                }
            }
            return this.initializeRecord(recordArray);
        });
        this.getDataBuffer = () => (new Promise((resolve) => {
            const readable = fs_1.createReadStream(this.path, { start: this.readPosition, end: this.readPosition + constants_1.sizeOfRecord });
            this.readPosition += constants_1.sizeOfRecord;
            readable.on('readable', () => {
                resolve(readable.read(constants_1.sizeOfRecord));
            });
        }));
        this.writeRecord = (record) => {
            this.writeCount++;
            const buffer = Buffer.from(record.getRecordAsInt32Array().buffer);
            this.writable.write(buffer);
            this.writePosition += constants_1.sizeOfRecord;
        };
        this.setNewWritable = () => {
            this.writable = fs_1.createWriteStream(this.path);
        };
        this.setNewReadable = () => {
            this.readPosition = 0;
        };
        this.readPosition = 0;
        this.writePosition = 0;
        this.readCount = 0;
        this.writeCount = 0;
        this.writable = fs_1.createWriteStream(this.path);
    }
}
exports.File = File;


/***/ }),

/***/ "./app/classes/Record.ts":
/*!*******************************!*\
  !*** ./app/classes/Record.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Record {
    constructor(a, c, x, y, z) {
        this.a = a;
        this.c = c;
        this.x = x;
        this.y = y;
        this.z = z;
        this.getValue = () => 10 * this.a * (Math.pow(this.x, 2) + 3 * Math.pow(this.c, 3) * Math.pow(this.z, 4) - 5 * Math.pow(this.y, 7));
        this.getRecordAsArray = () => [
            this.a,
            this.c,
            this.x,
            this.y,
            this.z
        ];
        this.getRecordAsInt32Array = () => Int32Array.from([
            this.a,
            this.c,
            this.x,
            this.y,
            this.z
        ]);
    }
}
exports.Record = Record;


/***/ }),

/***/ "./app/classes/Sort/SortService.ts":
/*!*****************************************!*\
  !*** ./app/classes/Sort/SortService.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __webpack_require__(/*! fs */ "fs");
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const DataService_1 = __webpack_require__(/*! ../DataService */ "./app/classes/DataService.ts");
const File_1 = __webpack_require__(/*! ../File/File */ "./app/classes/File/File.ts");
class SortService {
    constructor() {
        this.generateFileToSort = () => __awaiter(this, void 0, void 0, function* () {
            const data = this.dataService.getDataAsInt32Array();
            return new Promise((resolve, reject) => {
                fs_1.writeFile('./unsortedInput', buffer_1.Buffer.from(data.buffer), (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        });
        this.sort = () => __awaiter(this, void 0, void 0, function* () {
            yield this.inputFile.printFile();
            while ((yield this.divide()) !== 5) {
                this.firstFile.setNewReadable();
                this.secondFile.setNewReadable();
                this.inputFile.setNewWritable();
                yield this.merge();
                this.inputFile.setNewReadable();
                this.firstFile.setNewWritable();
                this.secondFile.setNewWritable();
            }
            yield this.inputFile.printFile();
        });
        this.finishSeries = (fileID, readedRecord) => __awaiter(this, void 0, void 0, function* () {
            const sourceFile = this.filesArray[fileID];
            let currentRecord = yield sourceFile.readRecord();
            let previousRecord = readedRecord;
            let fileEnd;
            this.inputFile.writeRecord(readedRecord);
            if (!currentRecord) {
                return {
                    firstFileRecord: null,
                    secondFileRecord: null,
                    event: 0,
                };
            }
            while (previousRecord.getValue() < currentRecord.getValue()) {
                this.inputFile.writeRecord(currentRecord);
                previousRecord = currentRecord;
                currentRecord = yield sourceFile.readRecord();
                if (currentRecord === null) {
                    fileEnd = 0;
                }
            }
            return {
                firstFileRecord: fileID === 1 && currentRecord,
                secondFileRecord: fileID === 2 && currentRecord,
                event: fileEnd === 0 ? 0 : (fileID === 1 ? 2 : 3)
            };
        });
        this.selectSmallerRecordAndGetNewOne = (state) => __awaiter(this, void 0, void 0, function* () {
            const newState = Object.assign({}, state);
            const smallerRecord = this.selectSmallerRecord(newState.currentFirstFileRecord, newState.currentSecondFileRecord);
            if (smallerRecord === newState.currentFirstFileRecord) {
                const fetchedRecord = yield this.firstFile.readRecord();
                if (fetchedRecord === null) {
                    return Object.assign({}, newState, { smallerRecord, firstFileEnds: true });
                }
                if (fetchedRecord.getValue() < newState.currentFirstFileRecord.getValue()) {
                    newState.firstFileSeriesEnds = true;
                }
                newState.previousFirstFileRecord = newState.currentFirstFileRecord;
                newState.currentFirstFileRecord = fetchedRecord;
            }
            else if (smallerRecord === newState.currentSecondFileRecord) {
                const fetchedRecord = yield this.secondFile.readRecord();
                if (fetchedRecord === null) {
                    return Object.assign({}, newState, { smallerRecord, secondFileEnds: true });
                }
                if (fetchedRecord.getValue() < newState.currentSecondFileRecord.getValue()) {
                    newState.secondFileSeriesEnds = true;
                }
                newState.previousSecondFileRecord = newState.currentSecondFileRecord;
                newState.currentSecondFileRecord = fetchedRecord;
            }
            return Object.assign({}, newState, { smallerRecord });
        });
        this.merge = () => __awaiter(this, void 0, void 0, function* () {
            const state = {
                firstFileSeriesEnds: false,
                secondFileSeriesEnds: false,
                firstFileEnds: false,
                secondFileEnds: false,
                previousFirstFileRecord: null,
                previousSecondFileRecord: null,
                currentFirstFileRecord: yield this.firstFile.readRecord(),
                currentSecondFileRecord: yield this.secondFile.readRecord(),
                smallerRecord: null
            };
            let sortingEvent;
            while (true) {
                Object.assign(state, yield this.selectSmallerRecordAndGetNewOne(Object.assign({}, state)));
                this.inputFile.writeRecord(state.smallerRecord);
                if (state.firstFileEnds) {
                    this.inputFile.writeRecord(state.currentSecondFileRecord);
                    this.fillWithRestOfRecords(this.secondFile);
                    break;
                }
                else if (state.secondFileEnds) {
                    this.inputFile.writeRecord(state.currentFirstFileRecord);
                    this.fillWithRestOfRecords(this.firstFile);
                    break;
                }
                else if (state.firstFileSeriesEnds) {
                    sortingEvent = yield this.finishSeries(this.secondFile.id, state.currentSecondFileRecord);
                    if (sortingEvent.event === 0) {
                        if (state.currentFirstFileRecord) {
                            this.inputFile.writeRecord(state.currentFirstFileRecord);
                        }
                        yield this.fillWithRestOfRecords(this.firstFile);
                        break;
                    }
                    state.currentSecondFileRecord = sortingEvent.secondFileRecord;
                }
                else if (state.secondFileSeriesEnds) {
                    sortingEvent = yield this.finishSeries(this.firstFile.id, state.currentFirstFileRecord);
                    if (sortingEvent.event === 0) {
                        if (state.currentSecondFileRecord) {
                            this.inputFile.writeRecord(state.currentSecondFileRecord);
                        }
                        yield this.fillWithRestOfRecords(this.secondFile);
                        break;
                    }
                    state.currentFirstFileRecord = sortingEvent.firstFileRecord;
                }
                state.secondFileSeriesEnds = false;
                state.firstFileSeriesEnds = false;
            }
        });
        this.fillWithRestOfRecords = (file) => __awaiter(this, void 0, void 0, function* () {
            let currentRecord = yield file.readRecord();
            while (currentRecord) {
                this.inputFile.writeRecord(currentRecord);
                currentRecord = yield file.readRecord();
            }
        });
        this.selectSmallerRecord = (r1, r2) => r1.getValue() < r2.getValue() ? r1 : r2;
        this.divide = () => __awaiter(this, void 0, void 0, function* () {
            let switchingCount = 0;
            this.currentFile = this.firstFile;
            this.currentRecord = undefined;
            while ((yield this.writeSeries()) !== 0) {
                this.switchFile();
                switchingCount++;
            }
            if (switchingCount === 0) {
                return 5;
            }
        });
        this.writeSeries = () => __awaiter(this, void 0, void 0, function* () {
            return (new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let previous = this.currentRecord || (yield this.inputFile.readRecord());
                let current = yield this.inputFile.readRecord();
                this.currentFile.writeRecord(previous);
                if (current === null) {
                    resolve(0);
                    return;
                }
                while (previous.getValue() < current.getValue()) {
                    this.currentFile.writeRecord(current);
                    previous = current;
                    current = yield this.inputFile.readRecord();
                    if (current === null) {
                        resolve(0);
                        break;
                    }
                }
                this.currentRecord = current;
                resolve(1);
            })));
        });
        this.switchFile = () => {
            if (this.currentFile.id === this.firstFile.id) {
                this.currentFile = this.secondFile;
            }
            else if (this.currentFile.id === this.secondFile.id) {
                this.currentFile = this.firstFile;
            }
        };
        this.dataService = new DataService_1.DataService(undefined);
        this.inputFile = new File_1.File('./unsortedInput', 0);
        this.firstFile = new File_1.File('./firstFile', 1);
        this.currentFile = this.firstFile;
        this.secondFile = new File_1.File('./secondFile', 2);
        this.filesArray = [
            this.inputFile,
            this.firstFile,
            this.secondFile
        ];
    }
    ;
}
exports.SortService = SortService;


/***/ }),

/***/ "./app/constants.ts":
/*!**************************!*\
  !*** ./app/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.numberOfRecordsToGenerate = 17;
exports.sizeOfRecord = 20;
exports.sizeOfInt = 4;
exports.numbersInRecord = 5;
var events;
(function (events) {
    events[events["EOF"] = 0] = "EOF";
    events[events["SWITCH_FILE"] = 1] = "SWITCH_FILE";
    events[events["SERIES_IN_FIRST_FILE_END"] = 2] = "SERIES_IN_FIRST_FILE_END";
    events[events["SERIES_IN_SECOND_FILE_END"] = 3] = "SERIES_IN_SECOND_FILE_END";
    events[events["FIRST_FILE_EOF"] = 4] = "FIRST_FILE_EOF";
    events[events["SORTING_ENDS"] = 5] = "SORTING_ENDS";
})(events = exports.events || (exports.events = {}));


/***/ }),

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SortService_1 = __webpack_require__(/*! ./classes/Sort/SortService */ "./app/classes/Sort/SortService.ts");
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sortService = new SortService_1.SortService();
        yield sortService.generateFileToSort();
        yield sortService.sort();
    });
})();


/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsYXNzZXMvRGF0YVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsYXNzZXMvRmlsZS9GaWxlLnRzIiwid2VicGFjazovLy8uL2FwcC9jbGFzc2VzL1JlY29yZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2xhc3Nlcy9Tb3J0L1NvcnRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL2FwcC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJ1ZmZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGdGQUFrQztBQUNsQyxrRkFBeUQ7QUFFekQsTUFBYSxXQUFX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QUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksV0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsSUFBSSxDQUFDLFNBQVM7WUFDZCxJQUFJLENBQUMsU0FBUztZQUNkLElBQUksQ0FBQyxVQUFVO1NBQ2xCLENBQUM7SUFDTixDQUFDO0lBQUEsQ0FBQztDQW1OTDtBQXhPRCxrQ0F3T0M7Ozs7Ozs7Ozs7Ozs7OztBQ25QWSxpQ0FBeUIsR0FBRyxFQUFFLENBQUM7QUFDL0Isb0JBQVksR0FBRyxFQUFFLENBQUM7QUFDbEIsaUJBQVMsR0FBRyxDQUFDLENBQUM7QUFDZCx1QkFBZSxHQUFHLENBQUMsQ0FBQztBQUNqQyxJQUFrQixNQU9qQjtBQVBELFdBQWtCLE1BQU07SUFDcEIsaUNBQUc7SUFDSCxpREFBVztJQUNYLDJFQUF3QjtJQUN4Qiw2RUFBeUI7SUFDekIsdURBQWM7SUFDZCxtREFBWTtBQUNoQixDQUFDLEVBUGlCLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQU92Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYRCxpSEFBdUQ7QUFFdkQsQ0FBQyxTQUFlLElBQUk7O1FBQ2hCLE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDdkMsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUFBLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUNOTCxtQzs7Ozs7Ozs7Ozs7QUNBQSwrQiIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnLi9SZWNvcmQnO1xuaW1wb3J0IHsgbnVtYmVyT2ZSZWNvcmRzVG9HZW5lcmF0ZSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZGF0YTogUmVjb3JkW107XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBSZWNvcmRbXSkge1xuICAgICAgICBpZighZGF0YSl7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlRGF0YSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YUFzQXJyYXkgPSAoKTogQXJyYXk8QXJyYXk8bnVtYmVyPj4gID0+IHRoaXMuZGF0YS5tYXAoKHJlY29yZDogUmVjb3JkKSA9PiByZWNvcmQuZ2V0UmVjb3JkQXNBcnJheSgpKTtcblxuICAgIHB1YmxpYyBnZXRGbGF0RGF0YSA9ICgpOiBBcnJheTxudW1iZXI+ID0+IFtdLmNvbmNhdCguLi50aGlzLmdldERhdGFBc0FycmF5KCkpO1xuXG4gICAgcHVibGljIGdldERhdGFBc0ludDMyQXJyYXkgPSAoKTogSW50MzJBcnJheSA9PiBJbnQzMkFycmF5LmZyb20odGhpcy5nZXRGbGF0RGF0YSgpKTtcblxuICAgIHB1YmxpYyBnZW5lcmF0ZURhdGEgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG51bWJlck9mUmVjb3Jkc1RvR2VuZXJhdGU7IGkrKykge1xuICAgICAgICAgICAgZGF0YS5wdXNoKHRoaXMuZ2VuZXJhdGVSZWNvcmQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVJlY29yZCA9ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUmVjb3JkKFxuICAgICAgICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApLFxuICAgICAgICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApLFxuICAgICAgICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApLFxuICAgICAgICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApLFxuICAgICAgICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICApO1xuICAgIH07XG59XG4iLCIvL2V4dGVybmFsXG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtLCBjcmVhdGVXcml0ZVN0cmVhbSwgV3JpdGVTdHJlYW0gfSBmcm9tICdmcyc7XG4vL2ludGVybmFsXG5pbXBvcnQgeyBzaXplT2ZJbnQsIHNpemVPZlJlY29yZCwgbnVtYmVyc0luUmVjb3JkIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnLi4vUmVjb3JkJztcblxuZXhwb3J0IGNsYXNzIEZpbGUge1xuICAgIHByaXZhdGUgcmVhZFBvc2l0aW9uOiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3cml0ZVBvc2l0aW9uOiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3cml0YWJsZTogV3JpdGVTdHJlYW07XG4gICAgcHJpdmF0ZSB3cml0ZUNvdW50OiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZWFkQ291bnQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBhdGg6IHN0cmluZywgcmVhZG9ubHkgaWQ6IG51bWJlcil7XG4gICAgICAgIHRoaXMucmVhZFBvc2l0aW9uID0gMDtcbiAgICAgICAgdGhpcy53cml0ZVBvc2l0aW9uID0gMDtcbiAgICAgICAgdGhpcy5yZWFkQ291bnQgPSAwO1xuICAgICAgICB0aGlzLndyaXRlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gY3JlYXRlV3JpdGVTdHJlYW0odGhpcy5wYXRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVSZWNvcmQgPSAocmVjb3JkQXJyYXk6IEludDMyQXJyYXkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWNvcmQoXG4gICAgICAgICAgICByZWNvcmRBcnJheVswXSxcbiAgICAgICAgICAgIHJlY29yZEFycmF5WzFdLFxuICAgICAgICAgICAgcmVjb3JkQXJyYXlbMl0sXG4gICAgICAgICAgICByZWNvcmRBcnJheVszXSxcbiAgICAgICAgICAgIHJlY29yZEFycmF5WzRdXG4gICAgICAgIClcbiAgICB9O1xuXG4gICAgcHVibGljIHByaW50RmlsZSA9IGFzeW5jKCkgPT4ge1xuICAgICAgICBsZXQgcmVjb3JkOiBSZWNvcmQ7XG4gICAgICAgIHRoaXMuc2V0TmV3UmVhZGFibGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3ByaW50RklMRScpO1xuICAgICAgICB3aGlsZShyZWNvcmQgPSBhd2FpdCB0aGlzLnJlYWRSZWNvcmQoKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWNvcmQuZ2V0VmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ251bWJlciBvZiByZWFkcycsIHRoaXMucmVhZENvdW50KTtcbiAgICAgICAgY29uc29sZS5sb2coJ251bWJlciBvZiB3cml0ZXMnLCB0aGlzLndyaXRlQ291bnQpO1xuICAgICAgICBjb25zb2xlLmxvZygncHJpbnRFTkQnKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICB9O1xuXG4gICAgcHVibGljIHJlYWRSZWNvcmQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY29yZEFycmF5OiBJbnQzMkFycmF5ID0gbmV3IEludDMyQXJyYXkobnVtYmVyc0luUmVjb3JkKTtcbiAgICAgICAgY29uc3QgYnVmZmVyOiBCdWZmZXIgPSBhd2FpdCB0aGlzLmdldERhdGFCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5yZWFkQ291bnQrKztcblxuICAgICAgICBpZihidWZmZXIgPT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5yZWFkUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG51bWJlcnNJblJlY29yZDsgaSsrKSB7XG4gICAgICAgICAgICByZWNvcmRBcnJheVtpXSA9IGJ1ZmZlci5yZWFkSW50MzJMRShpICogc2l6ZU9mSW50KTtcbiAgICAgICAgICAgIGlmKHJlY29yZEFycmF5W2ldID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplUmVjb3JkKHJlY29yZEFycmF5KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBnZXREYXRhQnVmZmVyID0gKCk6UHJvbWlzZTxCdWZmZXI+ID0+IChcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkYWJsZSA9IGNyZWF0ZVJlYWRTdHJlYW0odGhpcy5wYXRoLCB7c3RhcnQ6IHRoaXMucmVhZFBvc2l0aW9uLCBlbmQ6IHRoaXMucmVhZFBvc2l0aW9uICsgc2l6ZU9mUmVjb3JkfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRQb3NpdGlvbiArPSBzaXplT2ZSZWNvcmQ7XG4gICAgICAgICAgICAgICAgcmVhZGFibGUub24oJ3JlYWRhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlYWRhYmxlLnJlYWQoc2l6ZU9mUmVjb3JkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICApO1xuXG4gICAgcHVibGljIHdyaXRlUmVjb3JkID0gKHJlY29yZDogUmVjb3JkKSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVDb3VudCsrXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHJlY29yZC5nZXRSZWNvcmRBc0ludDMyQXJyYXkoKS5idWZmZXIpO1xuICAgICAgICB0aGlzLndyaXRhYmxlLndyaXRlKGJ1ZmZlcik7XG4gICAgICAgIHRoaXMud3JpdGVQb3NpdGlvbiArPSBzaXplT2ZSZWNvcmQ7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXROZXdXcml0YWJsZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGNyZWF0ZVdyaXRlU3RyZWFtKHRoaXMucGF0aCk7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXROZXdSZWFkYWJsZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5yZWFkUG9zaXRpb24gPSAwO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZWNvcmQge1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGE6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgeDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHk6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSB6OiBudW1iZXIpIHt9XG5cbiAgICBwdWJsaWMgZ2V0VmFsdWUgPSAoKSA9PiAxMCAqIHRoaXMuYSAqIChNYXRoLnBvdyh0aGlzLngsIDIpICsgMyAqIE1hdGgucG93KHRoaXMuYywgMykgKiBNYXRoLnBvdyh0aGlzLnosIDQpIC0gNSAqIE1hdGgucG93KHRoaXMueSwgNykpO1xuXG4gICAgcHVibGljIGdldFJlY29yZEFzQXJyYXkgPSAoKSA9PiBbXG4gICAgICAgICAgICB0aGlzLmEsXG4gICAgICAgICAgICB0aGlzLmMsXG4gICAgICAgICAgICB0aGlzLngsXG4gICAgICAgICAgICB0aGlzLnksXG4gICAgICAgICAgICB0aGlzLnpcbiAgICAgICAgXTtcblxuICAgIHB1YmxpYyBnZXRSZWNvcmRBc0ludDMyQXJyYXkgPSAoKSA9PlxuICAgICAgICBJbnQzMkFycmF5LmZyb20oW1xuICAgICAgICAgICAgdGhpcy5hLFxuICAgICAgICAgICAgdGhpcy5jLFxuICAgICAgICAgICAgdGhpcy54LFxuICAgICAgICAgICAgdGhpcy55LFxuICAgICAgICAgICAgdGhpcy56XG4gICAgICAgIF0pXG59XG4iLCIvL2V4dGVybmFsXG5pbXBvcnQge3dyaXRlRmlsZX0gZnJvbSAnZnMnO1xuaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ2J1ZmZlcic7XG4vL2ludGVybmFsXG5pbXBvcnQge0RhdGFTZXJ2aWNlfSBmcm9tICcuLi9EYXRhU2VydmljZSc7XG5pbXBvcnQge0ZpbGV9IGZyb20gJy4uL0ZpbGUvRmlsZSc7XG5pbXBvcnQge1JlY29yZH0gZnJvbSAnLi4vUmVjb3JkJztcbmltcG9ydCB7ZXZlbnRzfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xuaW1wb3J0IHtTb3J0aW5nRXZlbnR9IGZyb20gJy4vU29ydGluZ0V2ZW50JztcblxuXG5leHBvcnQgY2xhc3MgU29ydFNlcnZpY2Uge1xuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlO1xuICAgIHByaXZhdGUgaW5wdXRGaWxlOiBGaWxlO1xuICAgIHByaXZhdGUgZmlyc3RGaWxlOiBGaWxlO1xuICAgIHByaXZhdGUgc2Vjb25kRmlsZTogRmlsZTtcbiAgICBwcml2YXRlIGN1cnJlbnRGaWxlOiBGaWxlO1xuICAgIHByaXZhdGUgcHJldmlvdXNSZWNvcmQ6IFJlY29yZDtcbiAgICBwcml2YXRlIGN1cnJlbnRSZWNvcmQ6IFJlY29yZDtcbiAgICBwcml2YXRlIGZpbGVzQXJyYXk6IEZpbGVbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlID0gbmV3IERhdGFTZXJ2aWNlKHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuaW5wdXRGaWxlID0gbmV3IEZpbGUoJy4vdW5zb3J0ZWRJbnB1dCcsIDApO1xuICAgICAgICB0aGlzLmZpcnN0RmlsZSA9IG5ldyBGaWxlKCcuL2ZpcnN0RmlsZScsIDEpO1xuICAgICAgICB0aGlzLmN1cnJlbnRGaWxlID0gdGhpcy5maXJzdEZpbGU7XG4gICAgICAgIHRoaXMuc2Vjb25kRmlsZSA9IG5ldyBGaWxlKCcuL3NlY29uZEZpbGUnLCAyKTtcbiAgICAgICAgdGhpcy5maWxlc0FycmF5ID0gW1xuICAgICAgICAgICAgdGhpcy5pbnB1dEZpbGUsXG4gICAgICAgICAgICB0aGlzLmZpcnN0RmlsZSxcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kRmlsZVxuICAgICAgICBdO1xuICAgIH07XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVGaWxlVG9Tb3J0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhOiBJbnQzMkFycmF5ID0gdGhpcy5kYXRhU2VydmljZS5nZXREYXRhQXNJbnQzMkFycmF5KCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdyaXRlRmlsZSgnLi91bnNvcnRlZElucHV0JywgQnVmZmVyLmZyb20oZGF0YS5idWZmZXIpLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgcHVibGljIHNvcnQgPSBhc3luYygpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbnB1dEZpbGUucHJpbnRGaWxlKCk7XG4gICAgICAgIHdoaWxlKGF3YWl0IHRoaXMuZGl2aWRlKCkgIT09IGV2ZW50cy5TT1JUSU5HX0VORFMpe1xuICAgICAgICAgICAgdGhpcy5maXJzdEZpbGUuc2V0TmV3UmVhZGFibGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kRmlsZS5zZXROZXdSZWFkYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEZpbGUuc2V0TmV3V3JpdGFibGUoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWVyZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWxlLnNldE5ld1JlYWRhYmxlKCk7XG4gICAgICAgICAgICB0aGlzLmZpcnN0RmlsZS5zZXROZXdXcml0YWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5zZWNvbmRGaWxlLnNldE5ld1dyaXRhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5pbnB1dEZpbGUucHJpbnRGaWxlKCk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZmluaXNoU2VyaWVzID0gYXN5bmMgKGZpbGVJRDogbnVtYmVyLCByZWFkZWRSZWNvcmQ6IFJlY29yZCkgPT4ge1xuICAgICAgICBjb25zdCBzb3VyY2VGaWxlOiBGaWxlID0gdGhpcy5maWxlc0FycmF5W2ZpbGVJRF07XG4gICAgICAgIGxldCBjdXJyZW50UmVjb3JkOiBSZWNvcmQgPSBhd2FpdCBzb3VyY2VGaWxlLnJlYWRSZWNvcmQoKTtcbiAgICAgICAgbGV0IHByZXZpb3VzUmVjb3JkOiBSZWNvcmQgPSByZWFkZWRSZWNvcmQ7XG4gICAgICAgIGxldCBmaWxlRW5kOiBldmVudHM7XG5cbiAgICAgICAgdGhpcy5pbnB1dEZpbGUud3JpdGVSZWNvcmQocmVhZGVkUmVjb3JkKTtcbiAgICAgICAgaWYoIWN1cnJlbnRSZWNvcmQpey8vRU9GXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpcnN0RmlsZVJlY29yZDogbnVsbCxcbiAgICAgICAgICAgICAgICBzZWNvbmRGaWxlUmVjb3JkOiBudWxsLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudHMuRU9GLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlKHByZXZpb3VzUmVjb3JkLmdldFZhbHVlKCkgPCBjdXJyZW50UmVjb3JkLmdldFZhbHVlKCkpe1xuICAgICAgICAgICAgdGhpcy5pbnB1dEZpbGUud3JpdGVSZWNvcmQoY3VycmVudFJlY29yZCk7XG4gICAgICAgICAgICBwcmV2aW91c1JlY29yZCA9IGN1cnJlbnRSZWNvcmQ7XG4gICAgICAgICAgICBjdXJyZW50UmVjb3JkID0gYXdhaXQgc291cmNlRmlsZS5yZWFkUmVjb3JkKCk7XG4gICAgICAgICAgICBpZihjdXJyZW50UmVjb3JkID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICBmaWxlRW5kID0gZXZlbnRzLkVPRlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpcnN0RmlsZVJlY29yZDogZmlsZUlEID09PSAxICYmIGN1cnJlbnRSZWNvcmQsXG4gICAgICAgICAgICBzZWNvbmRGaWxlUmVjb3JkOiBmaWxlSUQgPT09IDIgJiYgY3VycmVudFJlY29yZCxcbiAgICAgICAgICAgIGV2ZW50OiBmaWxlRW5kID09PSBldmVudHMuRU9GID8gZXZlbnRzLkVPRiA6IChmaWxlSUQgPT09IDEgPyBldmVudHMuU0VSSUVTX0lOX0ZJUlNUX0ZJTEVfRU5EIDogZXZlbnRzLlNFUklFU19JTl9TRUNPTkRfRklMRV9FTkQpXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBzZWxlY3RTbWFsbGVyUmVjb3JkQW5kR2V0TmV3T25lID0gYXN5bmMgKHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9O1xuICAgICAgICBjb25zdCBzbWFsbGVyUmVjb3JkID0gdGhpcy5zZWxlY3RTbWFsbGVyUmVjb3JkKG5ld1N0YXRlLmN1cnJlbnRGaXJzdEZpbGVSZWNvcmQsIG5ld1N0YXRlLmN1cnJlbnRTZWNvbmRGaWxlUmVjb3JkKTtcblxuICAgICAgICBpZihzbWFsbGVyUmVjb3JkID09PSBuZXdTdGF0ZS5jdXJyZW50Rmlyc3RGaWxlUmVjb3JkKXtcbiAgICAgICAgICAgIGNvbnN0IGZldGNoZWRSZWNvcmQgPSBhd2FpdCB0aGlzLmZpcnN0RmlsZS5yZWFkUmVjb3JkKCk7Ly91bmhhbmRsZWQgRU9GXG4gICAgICAgICAgICBpZihmZXRjaGVkUmVjb3JkID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5uZXdTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgc21hbGxlclJlY29yZCxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWxlRW5kczogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZmV0Y2hlZFJlY29yZC5nZXRWYWx1ZSgpIDwgbmV3U3RhdGUuY3VycmVudEZpcnN0RmlsZVJlY29yZC5nZXRWYWx1ZSgpKXsvL3NlcmllcyBpbiBmaXJzdCBmaWxlIGVuZHNcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5maXJzdEZpbGVTZXJpZXNFbmRzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1N0YXRlLnByZXZpb3VzRmlyc3RGaWxlUmVjb3JkID0gbmV3U3RhdGUuY3VycmVudEZpcnN0RmlsZVJlY29yZDtcbiAgICAgICAgICAgIG5ld1N0YXRlLmN1cnJlbnRGaXJzdEZpbGVSZWNvcmQgPSBmZXRjaGVkUmVjb3JkO1xuICAgICAgICB9ZWxzZSBpZihzbWFsbGVyUmVjb3JkID09PSBuZXdTdGF0ZS5jdXJyZW50U2Vjb25kRmlsZVJlY29yZCl7XG4gICAgICAgICAgICBjb25zdCBmZXRjaGVkUmVjb3JkID0gYXdhaXQgdGhpcy5zZWNvbmRGaWxlLnJlYWRSZWNvcmQoKTtcbiAgICAgICAgICAgIGlmKGZldGNoZWRSZWNvcmQgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLm5ld1N0YXRlLFxuICAgICAgICAgICAgICAgICAgICBzbWFsbGVyUmVjb3JkLFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWxlRW5kczogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZmV0Y2hlZFJlY29yZC5nZXRWYWx1ZSgpIDwgbmV3U3RhdGUuY3VycmVudFNlY29uZEZpbGVSZWNvcmQuZ2V0VmFsdWUoKSl7Ly9zZXJpZXMgaW4gZmlyc3QgZmlsZSBlbmRzXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2Vjb25kRmlsZVNlcmllc0VuZHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3U3RhdGUucHJldmlvdXNTZWNvbmRGaWxlUmVjb3JkID0gbmV3U3RhdGUuY3VycmVudFNlY29uZEZpbGVSZWNvcmQ7XG4gICAgICAgICAgICBuZXdTdGF0ZS5jdXJyZW50U2Vjb25kRmlsZVJlY29yZCA9IGZldGNoZWRSZWNvcmQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ubmV3U3RhdGUsXG4gICAgICAgICAgICBzbWFsbGVyUmVjb3JkXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByaXZhdGUgbWVyZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgICAgZmlyc3RGaWxlU2VyaWVzRW5kczogZmFsc2UsXG4gICAgICAgICAgICBzZWNvbmRGaWxlU2VyaWVzRW5kczogZmFsc2UsXG4gICAgICAgICAgICBmaXJzdEZpbGVFbmRzOiBmYWxzZSxcbiAgICAgICAgICAgIHNlY29uZEZpbGVFbmRzOiBmYWxzZSxcbiAgICAgICAgICAgIHByZXZpb3VzRmlyc3RGaWxlUmVjb3JkOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNTZWNvbmRGaWxlUmVjb3JkOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudEZpcnN0RmlsZVJlY29yZDogYXdhaXQgdGhpcy5maXJzdEZpbGUucmVhZFJlY29yZCgpLFxuICAgICAgICAgICAgY3VycmVudFNlY29uZEZpbGVSZWNvcmQ6IGF3YWl0IHRoaXMuc2Vjb25kRmlsZS5yZWFkUmVjb3JkKCksXG4gICAgICAgICAgICBzbWFsbGVyUmVjb3JkOiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBzb3J0aW5nRXZlbnQ6IFNvcnRpbmdFdmVudDtcblxuICAgICAgICB3aGlsZSh0cnVlKXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIGF3YWl0IHRoaXMuc2VsZWN0U21hbGxlclJlY29yZEFuZEdldE5ld09uZSh7IC4uLnN0YXRlIH0pKTsvL3VuaGFuZGxlZCBFT0ZcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWxlLndyaXRlUmVjb3JkKHN0YXRlLnNtYWxsZXJSZWNvcmQpO1xuICAgICAgICAgICAgaWYoc3RhdGUuZmlyc3RGaWxlRW5kcyl7XG4gICAgICAgICAgICAgICAgLy9maWxsIFdpdGggcmVzdCBvZiBTZWNvbmRGaWxlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEZpbGUud3JpdGVSZWNvcmQoc3RhdGUuY3VycmVudFNlY29uZEZpbGVSZWNvcmQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbFdpdGhSZXN0T2ZSZWNvcmRzKHRoaXMuc2Vjb25kRmlsZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7Ly9tZXJnZSBlbmRzXG4gICAgICAgICAgICB9ZWxzZSBpZihzdGF0ZS5zZWNvbmRGaWxlRW5kcyl7XG4gICAgICAgICAgICAgICAgLy9maWxsIFdpdGggcmVzdCBvZiBGaXJzdEZpbGVcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RmlsZS53cml0ZVJlY29yZChzdGF0ZS5jdXJyZW50Rmlyc3RGaWxlUmVjb3JkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGxXaXRoUmVzdE9mUmVjb3Jkcyh0aGlzLmZpcnN0RmlsZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7Ly9tZXJnZSBlbmRzXG4gICAgICAgICAgICB9ZWxzZSBpZihzdGF0ZS5maXJzdEZpbGVTZXJpZXNFbmRzKXtcbiAgICAgICAgICAgICAgICBzb3J0aW5nRXZlbnQgPSBhd2FpdCB0aGlzLmZpbmlzaFNlcmllcyh0aGlzLnNlY29uZEZpbGUuaWQsIHN0YXRlLmN1cnJlbnRTZWNvbmRGaWxlUmVjb3JkKTsvLyBpZiAhRU9GIHRoZW4gc29ydGluZ0V2ZW50IGdvdCBjdXJyZW50IHJlY29yZCBmcm9tIHNlY29uZEZpbGVcbiAgICAgICAgICAgICAgICBpZihzb3J0aW5nRXZlbnQuZXZlbnQgPT09IGV2ZW50cy5FT0Ype1xuICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZS5jdXJyZW50Rmlyc3RGaWxlUmVjb3JkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGaWxlLndyaXRlUmVjb3JkKHN0YXRlLmN1cnJlbnRGaXJzdEZpbGVSZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmlsbFdpdGhSZXN0T2ZSZWNvcmRzKHRoaXMuZmlyc3RGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7Ly9tZXJnZSBlbmRzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnRTZWNvbmRGaWxlUmVjb3JkID0gc29ydGluZ0V2ZW50LnNlY29uZEZpbGVSZWNvcmQ7XG4gICAgICAgICAgICAgICAgLy9zdGF0ZS5jdXJyZW50Rmlyc3RGaWxlUmVjb3JkID0gYXdhaXQgdGhpcy5maXJzdEZpbGUucmVhZFJlY29yZCgpO1xuICAgICAgICAgICAgfWVsc2UgaWYoc3RhdGUuc2Vjb25kRmlsZVNlcmllc0VuZHMpe1xuICAgICAgICAgICAgICAgIHNvcnRpbmdFdmVudCA9IGF3YWl0IHRoaXMuZmluaXNoU2VyaWVzKHRoaXMuZmlyc3RGaWxlLmlkLCBzdGF0ZS5jdXJyZW50Rmlyc3RGaWxlUmVjb3JkKTsvLyBpZiAhRU9GIHRoZW4gc29ydGluZ0V2ZW50IGdvdCBjdXJyZW50IHJlY29yZCBmcm9tIGZpcnN0RmlsZVxuICAgICAgICAgICAgICAgIGlmKHNvcnRpbmdFdmVudC5ldmVudCA9PT0gZXZlbnRzLkVPRil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlLmN1cnJlbnRTZWNvbmRGaWxlUmVjb3JkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGaWxlLndyaXRlUmVjb3JkKHN0YXRlLmN1cnJlbnRTZWNvbmRGaWxlUmVjb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZpbGxXaXRoUmVzdE9mUmVjb3Jkcyh0aGlzLnNlY29uZEZpbGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsvL21lcmdlIGVuZHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhdGUuY3VycmVudEZpcnN0RmlsZVJlY29yZCA9IHNvcnRpbmdFdmVudC5maXJzdEZpbGVSZWNvcmQ7XG4gICAgICAgICAgICAgICAgLy9zdGF0ZS5jdXJyZW50U2Vjb25kRmlsZVJlY29yZCA9IGF3YWl0IHRoaXMuc2Vjb25kRmlsZS5yZWFkUmVjb3JkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlLnNlY29uZEZpbGVTZXJpZXNFbmRzID0gZmFsc2U7XG4gICAgICAgICAgICBzdGF0ZS5maXJzdEZpbGVTZXJpZXNFbmRzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBmaWxsV2l0aFJlc3RPZlJlY29yZHMgPSBhc3luYyAoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudFJlY29yZCA9IGF3YWl0IGZpbGUucmVhZFJlY29yZCgpO1xuICAgICAgICB3aGlsZShjdXJyZW50UmVjb3JkKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWxlLndyaXRlUmVjb3JkKGN1cnJlbnRSZWNvcmQpO1xuICAgICAgICAgICAgY3VycmVudFJlY29yZCA9IGF3YWl0IGZpbGUucmVhZFJlY29yZCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgc2VsZWN0U21hbGxlclJlY29yZCA9IChyMTogUmVjb3JkLCByMjogUmVjb3JkKTogUmVjb3JkID0+IHIxLmdldFZhbHVlKCkgPCByMi5nZXRWYWx1ZSgpID8gcjEgOiByMjtcblxuICAgIHByaXZhdGUgZGl2aWRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgc3dpdGNoaW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRGaWxlID0gdGhpcy5maXJzdEZpbGU7XG4gICAgICAgIHRoaXMuY3VycmVudFJlY29yZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB3aGlsZShhd2FpdCB0aGlzLndyaXRlU2VyaWVzKCkgIT09IGV2ZW50cy5FT0Ype1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hGaWxlKCk7XG4gICAgICAgICAgICBzd2l0Y2hpbmdDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmKHN3aXRjaGluZ0NvdW50ID09PSAwKXsvLz9cbiAgICAgICAgICAgIHJldHVybiBldmVudHMuU09SVElOR19FTkRTO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgd3JpdGVTZXJpZXMgPSBhc3luYyAoKTogUHJvbWlzZTxldmVudHM+ID0+IChcbiAgICAgICAgbmV3IFByb21pc2U8ZXZlbnRzPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGxldCBwcmV2aW91czogUmVjb3JkID0gdGhpcy5jdXJyZW50UmVjb3JkIHx8IGF3YWl0IHRoaXMuaW5wdXRGaWxlLnJlYWRSZWNvcmQoKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50OiBSZWNvcmQgPSBhd2FpdCB0aGlzLmlucHV0RmlsZS5yZWFkUmVjb3JkKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZpbGUud3JpdGVSZWNvcmQocHJldmlvdXMpO1xuICAgICAgICAgICAgaWYoY3VycmVudCA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShldmVudHMuRU9GKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZShwcmV2aW91cy5nZXRWYWx1ZSgpIDwgY3VycmVudC5nZXRWYWx1ZSgpKXtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWxlLndyaXRlUmVjb3JkKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gYXdhaXQgdGhpcy5pbnB1dEZpbGUucmVhZFJlY29yZCgpO1xuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGV2ZW50cy5FT0YpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZWNvcmQgPSBjdXJyZW50O1xuICAgICAgICAgICAgcmVzb2x2ZShldmVudHMuU1dJVENIX0ZJTEUpO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICBwcml2YXRlIHN3aXRjaEZpbGUgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmKHRoaXMuY3VycmVudEZpbGUuaWQgPT09IHRoaXMuZmlyc3RGaWxlLmlkKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZpbGUgPSB0aGlzLnNlY29uZEZpbGU7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuY3VycmVudEZpbGUuaWQgPT09IHRoaXMuc2Vjb25kRmlsZS5pZCl7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWxlID0gdGhpcy5maXJzdEZpbGVcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBudW1iZXJPZlJlY29yZHNUb0dlbmVyYXRlID0gMTc7XG5leHBvcnQgY29uc3Qgc2l6ZU9mUmVjb3JkID0gMjA7XG5leHBvcnQgY29uc3Qgc2l6ZU9mSW50ID0gNDtcbmV4cG9ydCBjb25zdCBudW1iZXJzSW5SZWNvcmQgPSA1O1xuZXhwb3J0IGNvbnN0IGVudW0gZXZlbnRzIHtcbiAgICBFT0YsXG4gICAgU1dJVENIX0ZJTEUsXG4gICAgU0VSSUVTX0lOX0ZJUlNUX0ZJTEVfRU5ELFxuICAgIFNFUklFU19JTl9TRUNPTkRfRklMRV9FTkQsXG4gICAgRklSU1RfRklMRV9FT0YsXG4gICAgU09SVElOR19FTkRTXG59XG4iLCJpbXBvcnQge1NvcnRTZXJ2aWNlfSBmcm9tICcuL2NsYXNzZXMvU29ydC9Tb3J0U2VydmljZSc7XG5cbihhc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IHNvcnRTZXJ2aWNlID0gbmV3IFNvcnRTZXJ2aWNlKCk7XG4gICAgYXdhaXQgc29ydFNlcnZpY2UuZ2VuZXJhdGVGaWxlVG9Tb3J0KCk7XG4gICAgYXdhaXQgc29ydFNlcnZpY2Uuc29ydCgpO1xufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJ1ZmZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9