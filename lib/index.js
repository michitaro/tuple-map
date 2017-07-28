"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TupleMap = (function () {
    function TupleMap() {
        this.m = new Map();
        this.idMaker = new TupleIdMaker();
    }
    TupleMap.prototype.get = function (key) {
        var id = this.idMaker.get(key);
        var value = this.m.get(id);
        this.idMaker.forget(key);
        return value;
    };
    TupleMap.prototype.set = function (key, value) {
        var id = this.idMaker.get(key);
        if (this.m.has(id))
            this.idMaker.forget(key);
        this.m.set(id, value);
        return this;
    };
    TupleMap.prototype.has = function (key) {
        var id = this.idMaker.get(key);
        var has = this.m.has(id);
        this.idMaker.forget(key);
        return has;
    };
    TupleMap.prototype.delete = function (key) {
        var id = this.idMaker.get(key);
        this.m.delete(id);
        this.idMaker.forget(key);
        this.idMaker.forget(key);
        return true;
    };
    TupleMap.prototype.clear = function () {
        this.m.clear();
        this.idMaker.clear();
    };
    return TupleMap;
}());
exports.TupleMap = TupleMap;
var TupleIdMaker = (function () {
    function TupleIdMaker() {
        this.idMaker = new IdMaker();
    }
    TupleIdMaker.prototype.get = function (key) {
        var _this = this;
        return key.map(function (k) { return _this.idMaker.get(k); }).join('-');
    };
    TupleIdMaker.prototype.forget = function (key) {
        var _this = this;
        key.forEach(function (k) { return _this.idMaker.forget(k); });
    };
    TupleIdMaker.prototype.clear = function () { this.idMaker.clear(); };
    return TupleIdMaker;
}());
var IdMaker = (function () {
    function IdMaker() {
        this.serialNumber = 0;
        this.m = new Map();
    }
    IdMaker.prototype.get = function (key) {
        var idInfo = this.m.get(key);
        if (idInfo != undefined) {
            ++idInfo.refCount;
            return idInfo.value;
        }
        else {
            var value = ++this.serialNumber;
            this.m.set(key, {
                refCount: 1,
                value: value
            });
            return value;
        }
    };
    IdMaker.prototype.forget = function (key) {
        var idInfo = this.m.get(key);
        if (--idInfo.refCount == 0)
            this.m.delete(key);
    };
    IdMaker.prototype.clear = function () {
        this.m.clear();
    };
    return IdMaker;
}());
