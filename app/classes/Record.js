"use strict";
exports.__esModule = true;
var Record = /** @class */ (function () {
    function Record(a, y, c, z, x) {
        var _this = this;
        this.getValue = function () { return 10 * _this.a * (Math.pow(_this.x, 2) + 3 * Math.pow(_this.c, 3) * Math.pow(_this.z, 4) - 5 * Math.pow(_this.y, 7)); };
        this.getRecords = function () {
            return {
                a: _this.a,
                c: _this.c,
                x: _this.x,
                y: _this.y,
                z: _this.z
            };
        };
        this.a = a;
        this.y = y;
        this.c = c;
        this.z = z;
        this.x = x;
    }
    return Record;
}());
exports.Record = Record;
