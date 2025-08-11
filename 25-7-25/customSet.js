class MySet {
    constructor(arrs) {
        this.myObj = {};
        this.key = 0;
        this.nextKeysIndex=0;
        this.nextValuesIndex=0;

        console.log(arrs)

        arrs?.forEach((ele) => {
            this.add(ele)
        })
    }

    add(val) {
        let arrayValues = Object.values(this.myObj);

        if (arrayValues.findIndex((ele) => ele === val) === -1) {
            this.myObj[this.key] = val;
            this.key++;
        }
    }

    *[Symbol.iterator]() {
        for (const entry of Object.entries(this.myObj)) {
            yield entry;
        }
    }

    clear() {
        this.myObj = {};
        this.key = 0;
    }

    delete(val) {
        if (this.has(val)) {
            const key = Object.values(this.myObj).findIndex((ele) => ele === val)
            delete this.myObj[key];
            console.log(key);
            // this.key--;
            return true;
        }
        else {
            return false;
        }
    }

    has(val) {
        // console.log(Object.values(this.myObj),"llll")
        return Object.values(this.myObj).some((ele) => ele === val)
    }

    *entries() {
        let arrayOfValues = Object.values(this.myObj)
        // let i = 0;
        for (let val of arrayOfValues) {
            yield [val, val];
        }
        // yield [arrayOfValues[i], arrayOfValues[i]]
    }

    forEach(func){
        const inpArr = Object.values(this.myObj);
        inpArr.forEach((ele) => {
            let key = ele;
            let value = ele;
            func(value, key)
        })
    }

    intersection(setObj){
        const firstArr = Object.values(this.myObj);
        const secondArr = Object.values(setObj.myObj);
        
        // console.log(firstArr,secondArr)
        const finalArr=firstArr.filter((ele)=>{
            return ele === secondArr.find((val)=>val === ele)
        })
        // console.log({...finalArr})
        return finalArr;
    }

    difference(setObj){
        const firstArr = Object.values(this.myObj);
        const secondArr = Object.values(setObj.myObj);
        
        const finalArr=firstArr.filter((ele)=>{
            return ele !== secondArr.find((val)=>val === ele)
        })
        return finalArr;
    }

    isDisjointFrom(setObj){
        const firstArr = Object.values(this.myObj);
        const secondArr = Object.values(setObj.myObj);  

        const hasCommon = firstArr.some((ele) => secondArr.includes(ele))

        return !hasCommon;
    }

    isSubsetOf(setObj){
        const firstArr = Object.values(this.myObj);
        const secondArr = Object.values(setObj.myObj); 
     
        const hasCommonAll = firstArr.every((ele) => secondArr.includes(ele))
        // console.log(hasCommonAll,"commonAll")

        return hasCommonAll;
    }

    isSupersetOf(setObj){
        const firstArr = Object.values(setObj.myObj);
        const secondArr = Object.values(this.myObj);

        const hasCommonAll = firstArr.every((ele) => secondArr.includes(ele))
        // console.log(hasCommonAll,"commonAll")

        return hasCommonAll;
    }

    symmetricDifference(setObj){
        const firstArr = Object.values(this.myObj);
        const secondArr = Object.values(setObj.myObj); 

        const concatArr = firstArr.concat(secondArr)
        const commonEle = firstArr.filter((ele)=> secondArr.includes(ele))
        // console.log(concatArr,"concate")    
        // console.log(commonele)
        const diffArr = concatArr.filter((ele)=> !commonEle.includes(ele))

        return diffArr;
    }

    keys(){
        let arrayOfEntries = Object.entries(this.myObj)
        let end = arrayOfEntries.length;

        const iterator={
            next:()=>{
                let result;
                if(this.nextKeysIndex < end){
                    result = { value: arrayOfEntries[this.nextKeysIndex][1], done: false };
                    this.nextKeysIndex++;
                    // iterationCount++;
                    return result;
                }
                else{
                    return { value: undefined, done: true };
                }
            }
        }
        return iterator
    }

    values(){
        let arrayOfEntries = Object.entries(this.myObj)
        console.log(arrayOfEntries,'values')
        let end = arrayOfEntries.length;

        const iterator={
            next:()=>{
                let result;
                if(this.nextValuesIndex < end){
                    result = { value: arrayOfEntries[this.nextValuesIndex][1], done: false };
                    this.nextValuesIndex++;
                    // iterationCount++;
                    return result;
                }
                else{
                    return { value: undefined, done: true };
                }
            }
        }
        return iterator
    }

    union(setObj){
        let arr1 = Object.values(this.myObj)
        console.log(arr1,"aaa")
        // console.log(this.values())
        let arr2=Object.values(setObj.myObj)

        return arr1.concat(arr2)
    }

    get size() {
        if (!this.myObj) {
            return 0;
        }
        return Object.entries(this.myObj).length;
    }
}

// add()
let st = new MySet();

st.add(45);
st.add(67)
st.add({ x: 10, y: 20 })

let st2 = new MySet([1, 2, 4])
console.log(st2)

console.log(st)
for (const item of st) {
    console.log(item);
}
// has()
console.log(st.has(45))

// delete()
console.log(st.delete(67))
st.add(80)
st.add(80)

console.log(st)

// entries()
const iterator = st.entries();
for (const entry of iterator) {
    console.log(entry);
}

// forEach()
function logSetElements(value1, value2, set) {
  console.log(`s[${value1}] = ${value2}`);
}
new Set(["foo", "bar", undefined]).forEach(logSetElements);

// intersection() & difference() & isDisjointFrom() & isSubsetOf() & isSupersetOf() & symmetricDifference()
const odds = new MySet([2, 3, 9, 5, 7, 11, 13, 17, 19]);
const squares = new MySet([1, 4, 9, 16]);
console.log(odds.intersection(squares)); 
console.log(odds.difference(squares)); 
console.log(odds.isDisjointFrom(squares)); 
console.log(squares.isSubsetOf(odds)); 
console.log(odds.isSupersetOf(squares)); 
console.log(odds.symmetricDifference(squares));

// keys()
const setIter = st.keys();
console.log(setIter.next());
console.log(setIter.next());
console.log(setIter.next());

// values()
const setVal = st.values();
console.log(setVal.next());
console.log(setVal.next());
console.log(setVal.next());
console.log(setVal.next());

// union()
const evens = new MySet([2, 4, 6, 8]);
console.log(evens.union(st));

// size()
console.log(st.size);

// clear()
// st.clear();
// console.log(st)
