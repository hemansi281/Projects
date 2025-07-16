let arr = [];
let obj = { name: "Hemansi" };
arr.push(obj);

obj = null;  
console.log(obj)        //prints null
console.log(arr)        //prints the array containing the whole object 

// same for map
let mp = new Map()
let objm = { subject: "Computer"};
mp.set('key',objm);

console.log(mp.has('key'))      // true
objm=null
console.log(mp.has('key'))      // true
console.log(objm)
console.log(mp)

// why is it so,, because array, map and set prevents the garbage collection. It has the strong reference
// now the solution is WeakSet and WeakMap

// WeakSet
let ws = new WeakSet();
let user={ name : 'user'}
ws.add(user)

console.log(ws.has(user))       //true
user=null
console.log(ws.has(user))       //false

// It uses the garbage collection so, because of weak reference weakset has not that object

// WeakMap
let wp = new WeakMap();
let userwp = {}
wp.set(userwp,{age:90});         //key is only as object

console.log(wp.has(userwp))     // true
console.log(wp.get(userwp))
wp.delete(userwp);
console.log(wp.has(userwp))     // false

// use WeakSet and WeakMap only when working with objects
// you can’t loop over a WeakMap and WeakSet
// no .size, .clear(), or .forEach() for both


// Date
let dt1 = new Date('2025-07-15')
let dt2 = new Date('Nov 14, 2024')  
console.log(dt1)
console.log(dt2)

// JSON
let obj1={
    name:'ABC',
    age:47
}
let arr1=[35,7,89,4,6]

console.log(JSON.stringify(obj1))
console.log(JSON.stringify(arr1))
console.log(JSON.stringify([]))
console.log(JSON.stringify(null))
console.log(JSON.stringify(undefined))

let arrstr = '["black","red","white"]'
// let objstr ='{name:"user", age:89}'         // when try to parse the object into JSON it will not,because of "" is must required

let objstr ='{"name":"user", "age":89}'        // valid object string for parsing

console.log(JSON.parse(arrstr))
console.log(typeof JSON.parse(arrstr))
console.log(JSON.parse(objstr))

// in JSON - function, undefined, comments are not allowed