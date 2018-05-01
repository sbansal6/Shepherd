import db from "../bin/db.service";
import {Proxy} from "../bin/Proxy";
import {ProxyHandler} from "../bin/ProxyHandler"

// express app settings
const app = require('express')();
const bodyParser = require('body-parser');
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
    } else {
        next();
    }
});

/**
 * Spin up routes
 */
require('../api/routes/index')(app);
/**
 * Engine should process all proxies at startup
 */
db.proxies.forEach(function(proxy:Proxy){
    app.use(proxy.paths,[], ProxyHandler.handle(proxy));
})
db.on("DbService:newProxy",function(proxy:Proxy){
    app.use(proxy.paths,[],ProxyHandler.handle(proxy))
})
db.on("DbService:update",function (proxy:Proxy) {
    app.use(proxy.paths,[],ProxyHandler.handle(proxy))
})

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});