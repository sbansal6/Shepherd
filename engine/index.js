"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_service_1 = require("../bin/db.service");
var ProxyHandler_1 = require("../bin/ProxyHandler");
// express app settings
var app = require('express')();
var bodyParser = require('body-parser');
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 4);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.all('/*', function (req, res, next) {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    }
    else {
        next();
    }
});
// engine should render index.html
app.get('/', function (req, res) {
    res.sendfile('index.html', { root: __dirname + "/../ui" });
});
require('../api/routes/index')(app);
// engine should server api (admin api as well)
app.use("/admin", [], function (req, res, next) {
    res.send({ status: "admin ok" });
});
// engine should process all proxies
db_service_1.default.proxies.forEach(function (proxy) {
    app.use(proxy.paths, [], ProxyHandler_1.ProxyHandler.handle(proxy));
});
db_service_1.default.on("DbService:newProxy", function (proxy) {
    app.use(proxy.paths, [], ProxyHandler_1.ProxyHandler.handle(proxy));
});
db_service_1.default.on("DbService:update", function (proxy) {
    app.use(proxy.paths, [], ProxyHandler_1.ProxyHandler.handle(proxy));
});
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
