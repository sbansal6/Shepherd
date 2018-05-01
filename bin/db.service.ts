import {EventEmitter} from 'events'
import {Proxy} from './Proxy'
const low = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const lowdb = low(adapter)

class DB extends EventEmitter {

    private static _instance: DB;

    private constructor() {
        super()
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get proxies(): Proxy[] {
       return lowdb.get('proxies').value()
    }

    //todo should these functions go to proxy class
    getProxy(proxy: Proxy): any {
        return lowdb.get('proxies')
            .find({ name: proxy.name })
            .value()
    }

    upsert(proxy: Proxy, cb) {
        if (this.getProxy(proxy)){
            this.update(proxy,cb)
        } else {
            this.add(proxy,cb)
        }

    }

    add(proxy: Proxy, cb) {
        lowdb.get('proxies')
            .push({
                "name": proxy.name,
                "paths": [proxy.paths],
                "baseUrl": proxy.baseUrl
            })
            .write()
        this.emit('DbService:newProxy',proxy)
        cb()
    }

    update(proxy:Proxy,cb){
        lowdb.get('proxies')
            .find({ name: proxy.name })
            .assign({ paths:proxy.paths,baseUrl:proxy.baseUrl})
            .write()
        this.emit('DbService:update',proxy)
        cb()
    }

    remove(proxy): any {
        this.emit('DbService:deletedProxy', proxy)
    }

    disable(proxy): any {
        this.emit('DbService:disableProxy', proxy)
    }

}

const db = DB.Instance;
export default db;