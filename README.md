# TupleMap

<!-- TupleMapはほとんどES6のMapと同じですが、tupleをキーに持つことができます。 -->
TupleMap is almost same as a ES6's Map, but it can have tuples as its keys.

## Example

```typescript
import { TupleMap } from "../src"

const tm = new TupleMap<[number, number], string>()

console.assert(tm.get([0, 0]) == undefined)

tm.set([0, 0], '0,0')
console.assert(tm.get([0, 0]) == '0,0')
console.assert(tm.get([0, 1]) == undefined)

tm.delete([0, 0])
console.assert(tm.get([0, 0]) == undefined)

tm.set([1, 2], '1,2')
tm.set([1, 2], '1,2')
console.assert(tm.has([1, 2]))
console.assert(tm.get([1, 2]) == '1,2')

tm.delete([1, 2])
console.assert(tm.has([1, 2]) == false)
console.assert((tm as any).idMaker.idMaker.m.size == 0)


tm.set([1, 2], '1,2')
tm.clear()
console.assert(tm.get([1, 2]) == undefined)
```