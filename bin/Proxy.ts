type TypeTimeout = Number | undefined;

class Proxy {
    readonly _name:string
    paths:string
    baseUrl:string
    timeout:TypeTimeout

    constructor(name:string,paths:string,baseUrl:string,timeout?:TypeTimeout){
        this._name = name
        this.paths = paths
        this.baseUrl = baseUrl
        this.timeout = timeout
    }

    get name():string{
        return this._name
    }
}

export {Proxy};