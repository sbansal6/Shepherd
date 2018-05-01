import db from "../../bin/db.service";
import {forEach} from 'async'
import {Proxy} from '../../bin/Proxy'

module.exports = function(app){
    app.get('/admin/proxies',getProxies);
    app.post('/admin/proxies',addProxy);
    app.delete('/admin/proxies',removeProxy)
}

function getProxies(req,res){
    res.send(db.proxies)
}

function addProxy(req,res){
    const body = req["body"]
    forEach(body.values,function (p,eachCB) {
        const proxy = new Proxy(p["name"],p["paths"],p["baseUrl"])
        db.upsert(proxy,eachCB)
    },function(err){
      if (err){
          res.send(err)
      } else {
          res.send({"status":"proxy added"})
      }
    })
}

function removeProxy(){

}



