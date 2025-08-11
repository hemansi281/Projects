class MyMap {

    constructor(...arrs) {
        this.myObj = {};
        this.nextKeysIndex = 0;
        this.nextValuesIndex = 0;
        this.nextEntriesIndex = 0;
        this.symbolIndex = 0;

        arrs.forEach((oneArr) => {
            // console.log(oneArr)
            this.set(oneArr[0], oneArr[1])
        })
        console.log(arrs)
    }

    set(key, value) {
        Object.defineProperty(this.myObj, key, {
            value: value,
            enumerable: true,
            writable: true,
            configurable: true
        })

        return this;
        // console.log(this.myObj)
    }
    get(key) {
        return this.myObj[key];
    }
    forEach(func) {
        console.log(Object.entries(this.myObj), "input")

        const inpArr = Object.entries(this.myObj);
        inpArr.forEach((arr) => {
            let key = arr[0];
            let value = arr[1]
            func(value, key)
        })
    }
    has(key) {
        return Object.hasOwn(this.myObj, key)
    }

    combinedKeysValues(val) {
        let arrayOfEntries = Object.entries(this.myObj)
        let end = arrayOfEntries.length;

        const iterator = {
            next: () => {
                let result;
                // console.log(this.nextIndex)
                if (val === 'keys' && this.nextKeysIndex < end) {
                    result = { value: arrayOfEntries[this.nextKeysIndex][0], done: false };
                    this.nextKeysIndex++;
                    // iterationCount++;
                    return result;
                }
                else if (val === 'values' && this.nextValuesIndex < end) {
                    result = { value: arrayOfEntries[this.nextValuesIndex][1], done: false };
                    this.nextValuesIndex++;
                    // iterationCount++;
                    return result;
                }
                else if (val === 'entries' && this.nextEntriesIndex < end) {
                    result = { value: arrayOfEntries[this.nextEntriesIndex], done: false };
                    this.nextEntriesIndex++;
                    // iterationCount++;
                    return result;

                }
                return { value: undefined, done: true };
            },
        };
        return iterator;
    }
    keys() {
        return this.combinedKeysValues('keys')
    }

    values() {
        return this.combinedKeysValues('values')
    }

    entries() {
        return this.combinedKeysValues('entries')
    }

    isDisjointFrom(setObj){
        const firstArr = Object.values(this.myObj);
        const secondArr = Object.values(setObj.myObj);  

        const hasCommon = firstArr.some((ele) => secondArr.includes(ele))

        return !hasCommon;
    }
    
    get size() {
        if (!this.myObj) {
            return 0;
        }
        return Object.entries(this.myObj).length;
    }

    clear() {
        this.myObj = {};
        this.nextKeysIndex = 0;
        this.nextValuesIndex = 0;
        this.nextEntriesIndex = 0;
    }

    delete(key) {
        if (this.has(key)) {
            delete this.myObj[key];
            return true;
        }
        else {
            return false;
        }
    }
    *[Symbol.iterator]() {
        for (const entry of Object.entries(this.myObj)) {
            yield entry;
        }
    }
    // [Symbol.iterator]() {
    //     let index = 0;
    //     const entries = Object.entries(this.myObj); 

    //     return {
    //         [Symbol.iterator]() {
    //             return this; 
    //         },
    //         next() {
    //             if (index < entries.length) {
    //                 return { value: entries[index++], done: false };
    //             }
    //             return { done: true };
    //         }
    //     };
    // }
}

// set()
let mp1 = new MyMap();
console.log(mp1.set('log', 2))
mp1.set(6, 'six')
// mp1.set('6',890)
let mp2 = new MyMap();
mp2.set('my', 62)
mp2.set('my', 44)
mp2.set('tu', 87)
mp2.set('my', 768)

console.log(mp1, "mp1111")
console.log(mp2)

// get()
console.log(mp1.get('log'))
console.log(mp2.get('my'))

// forEach()
function handler(value, key) {
    console.log(`m[${key}] = ${value}`);
}
new MyMap(["foo", 3], ["bar", '80']).forEach(handler)

// has()
console.log(mp2.has('mee'))

// keys()
console.log(mp1.keys().next())
console.log(mp1.keys().next())
console.log(mp2.keys().next())
console.log(mp1.keys().next())

// values()
console.log(mp1.values().next())

// entries()
console.log(mp1.entries().next())
console.log(mp1.entries().next())
console.log(mp1.entries().next())

// size()
console.log(mp1.size)

// clear()
// mp1.clear()

console.log(mp1.size)
console.log(mp1)

// delete()
console.log(mp1.delete('log'))
console.log(mp1.myObj)
console.log(mp1.delete('lkog'))

mp1.set({ 'aa': 2 }, 234)
const kk = { 'aa': 2 }
console.log(mp1)
console.log(mp1.get({ 'aa': 2 }))
console.log(mp1.get(kk))
console.log(mp1.get(6))
console.log(mp1.get('6'))


// [Symbol.iterator]()
const iterator = mp2[Symbol.iterator]();
console.log(iterator)

for (const item of iterator) {
    console.log(item);
}