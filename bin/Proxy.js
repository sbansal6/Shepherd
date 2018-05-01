"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Proxy = /** @class */ (function () {
    function Proxy(name, paths, baseUrl, timeout) {
        this._name = name;
        this.paths = paths;
        this.baseUrl = baseUrl;
        this.timeout = timeout;
    }
    Object.defineProperty(Proxy.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Proxy;
}());
exports.Proxy = Proxy;
