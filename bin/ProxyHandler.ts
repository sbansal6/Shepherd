import {Proxy} from "./Proxy";
const request = require("request");
const httpErrors = require('httperrors');

/**
 * ProxyHandler class
 * Actually takes action on proxy in flight
 */
abstract class ProxyHandler {
    static handle(proxy:Proxy){
        return function(req,res,next){
            let url = proxy.baseUrl+ req.url;
            let r = null;
            if(req.method === 'POST') {
                r = request.post({uri: url, json: req.body});
            } else {
                r = request(url);
            }
            const stream = req.pipe(r);
            stream.on('error', function(err){
                return next(new httpErrors.InternalServerError(err))
            })
            stream.pipe(res)
        }
    }
}

export {ProxyHandler};