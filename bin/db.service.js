"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var low = require("lowdb");
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('./db.json');
var lowdb = low(adapter);
var DB = /** @class */ (function (_super) {
    __extends(DB, _super);
    function DB() {
        return _super.call(this) || this;
    }
    Object.defineProperty(DB, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DB.prototype, "proxies", {
        get: function () {
            return lowdb.get('proxies').value();
        },
        enumerable: true,
        configurable: true
    });
    //todo should these functions go to proxy class
    DB.prototype.getProxy = function (proxy) {
        return lowdb.get('proxies')
            .find({ name: proxy.name })
            .value();
    };
    DB.prototype.upsert = function (proxy, cb) {
        if (this.getProxy(proxy)) {
            this.update(proxy, cb);
        }
        else {
            this.add(proxy, cb);
        }
    };
    DB.prototype.add = function (proxy, cb) {
        lowdb.get('proxies')
            .push({
            "name": proxy.name,
            "paths": [proxy.paths],
            "baseUrl": proxy.baseUrl
        })
            .write();
        this.emit('DbService:newProxy', proxy);
        cb();
    };
    DB.prototype.update = function (proxy, cb) {
        lowdb.get('proxies')
            .find({ name: proxy.name })
            .assign({ paths: proxy.paths, baseUrl: proxy.baseUrl })
            .write();
        this.emit('DbService:update', proxy);
        cb();
    };
    DB.prototype.remove = function (proxy) {
        this.emit('DbService:deletedProxy', proxy);
    };
    DB.prototype.disable = function (proxy) {
        this.emit('DbService:disableProxy', proxy);
    };
    return DB;
}(events_1.EventEmitter));
var db = DB.Instance;
exports.default = db;
