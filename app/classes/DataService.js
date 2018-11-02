"use strict";
exports.__esModule = true;
var Record_1 = require("./Record");
var constants_1 = require("../constants");
var DataService = /** @class */ (function () {
    function DataService() {
        var _this = this;
        this.generateData = function () {
            var data = [];
            for (var i = 0; i < constants_1["default"].numberOfRecordsToGenerate; i++) {
                data.push(_this.generateRecord());
            }
        };
        this.generateRecord = function () {
            return new Record_1.Record(Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 1000));
        };
    }
    return DataService;
}());
exports.DataService = DataService;
