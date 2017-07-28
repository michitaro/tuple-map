export class TupleMap<K extends Array<any>, V> {
    private m = new Map<string, V>()
    private idMaker = new TupleIdMaker()

    get(key: K) {
        const id = this.idMaker.get(key)
        const value = this.m.get(id)
        this.idMaker.forget(key)
        return value
    }

    set(key: K, value: V) {
        const id = this.idMaker.get(key)
        if (this.m.has(id))
            this.idMaker.forget(key)
        this.m.set(id, value)
        return this
    }

    has(key: K) {
        const id = this.idMaker.get(key)
        const has = this.m.has(id)
        this.idMaker.forget(key)
        return has
    }

    delete(key: K) {
        const id = this.idMaker.get(key)
        this.m.delete(id)
        this.idMaker.forget(key)
        this.idMaker.forget(key)
        return true
    }

    clear() {
        this.m.clear()
        this.idMaker.clear()
    }
}


class TupleIdMaker {
    private idMaker = new IdMaker()
    get(key: any[]) { return key.map(k => this.idMaker.get(k)).join('-') }
    forget(key: any[]) { key.forEach(k => this.idMaker.forget(k)) }
    clear() { this.idMaker.clear() }
}


interface IdInfo {
    value: number
    refCount: number
}


class IdMaker {
    private serialNumber = 0
    private m = new Map<any, IdInfo>()

    get(key: any) {
        const idInfo = this.m.get(key)
        if (idInfo != undefined) {
            ++idInfo.refCount
            return idInfo.value
        }
        else {
            const value = ++this.serialNumber
            this.m.set(key, {
                refCount: 1,
                value
            })
            return value
        }
    }

    forget(key: any) {
        const idInfo = this.m.get(key)!
        if (--idInfo.refCount == 0)
            this.m.delete(key)
    }

    clear() {
        this.m.clear()
    }
}