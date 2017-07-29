export declare class TupleMap<K extends Array<any>, V> {
    private m;
    private idMaker;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    _internalMapSize(): any;
}
