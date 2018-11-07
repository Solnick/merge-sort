"use strict";
exports.__esModule = true;
var DataService_1 = require("../DataService");
var fs_1 = require("fs");
var FileService = /** @class */ (function () {
    function FileService() {
        var _this = this;
        this.generateFileToSort = function () {
            var data = _this.dataService.generateData();
            fs_1.appendFile('./message.txt', data, function (err) {
                if (err)
                    throw err;
                console.log('The "data to append" was appended to file!');
            });
            console.log(data);
            console.log('fs', fs_1.appendFile);
        };
        this.dataService = new DataService_1.DataService();
    }
    return FileService;
}());
exports.FileService = FileService;
