"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var httpErrors = require('httperrors');
/**
 * ProxyHandler class
 * Actually takes action on proxy in flight
 */
var ProxyHandler = /** @class */ (function () {
    function ProxyHandler() {
    }
    ProxyHandler.handle = function (proxy) {
        return function (req, res, next) {
            var url = proxy.baseUrl + req.url;
            var r = null;
            if (req.method === 'POST') {
                r = request.post({ uri: url, json: req.body });
            }
            else {
                r = request(url);
            }
            var stream = req.pipe(r);
            stream.on('error', function (err) {
                return next(new httpErrors.InternalServerError(err));
            });
            stream.pipe(res);
        };
    };
    return ProxyHandler;
}());
exports.ProxyHandler = ProxyHandler;
