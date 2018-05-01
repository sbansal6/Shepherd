"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_service_1 = require("../../bin/db.service");
var async_1 = require("async");
var Proxy_1 = require("../../bin/Proxy");
module.exports = function (app) {
    app.get('/admin/proxies', getProxies);
    app.post('/admin/proxies', addProxy);
    app.delete('/admin/proxies', removeProxy);
};
function getProxies(req, res) {
    res.send(db_service_1.default.proxies);
}
function addProxy(req, res) {
    var body = req["body"];
    async_1.forEach(body.values, function (p, eachCB) {
        var proxy = new Proxy_1.Proxy(p["name"], p["paths"], p["baseUrl"]);
        db_service_1.default.upsert(proxy, eachCB);
    }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ "status": "proxy added" });
        }
    });
}
function removeProxy() {
}
