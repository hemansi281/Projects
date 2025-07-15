let str = "This is a string";

let sliced = str.slice(0, 2);
let subs = str.substring(-1, 2)  //negative number treated as 0

console.log(sliced)
console.log(str.slice(6, 2))
console.log(str.substring(6, 2))
console.log(subs)

function foo() {
    console.log(1);
}
var foo = function () {
    console.log(2);
};
function foo() {
    console.log(3);
}
foo();      //print 2

var fn;
function foo1() {
    var a = 27;
    function baz() {
        console.log(a);
    }
    fn = baz; // assign baz to global variable
}
function bar() {
    fn(); 
}
foo1();
bar();

// for (let i = 1; i <= 5; i++) {
//     setTimeout(function timer() {
//         console.log(i);
//     }, i * 1000);
// }

const arr = [1, 2, 3];
arr[10] = 99;

console.log(arr.length); // Output: 11
console.log(arr[5]); // Output: undefined
console.log(arr); // Output: [1, 2, 3, <7 empty items>, 99]

//Local storage
// localStorage.setItem('fname','ABC')
// const fullname={
//     fname:"ABC",
//     lname:"JUH"
// }
// localStorage.setItem('fullname',JSON.stringify(fullname))
// console.log(localStorage.getItem('fname'))

// localStorage.removeItem('fname')

// sessionStorage.setItem('name',"OOO")


// Optional chaining
const user = {};
console.log(user.address?.country, "chaining");


//Buffer
// const { Buffer } = require('buffer')

// const buf1 = Buffer.from('helllo')
// console.log(buf1)
// buf1.write('how are you')
// console.log(buf1.toString())
// console.log(buf1.toString('hex'))
// console.log(buf1.length)

// const buf2 = Buffer.alloc(10)
// buf2.write("OOO")
// console.log(buf2.toString())

//////////////Array
const arr1=[3,5,6,7]
console.log(arr1.length)
console.log(arr1.pop())
let ele=arr1.push(90)
console.log(ele)
console.log(arr1)

const trees = ["redwood", "bay", "cedar", "oak", "maple"];
console.log(trees.length,"before")
delete trees[3];
console.log(trees.length,"after")
console.log(3 in trees);

const arr2 = ["a", "b", "c"];
const iterator = arr2.entries();
console.log(iterator)
 
for (const key in arr2) {
  console.log(key);
  console.log(typeof key)
}

//// object methods
const person = { name: "ABC", age: 26 };

Object.seal(person);    //prevent adding or removing the propeerties only allow modifying

person.age = 30; // Allowed  updating   
console.log(person.age); 

person.profession = "Web Developer"; // Ignored
delete person.name; // Ignored

// Object.freeze(person);    //prevent adding removing and modifying the properties
console.log(Object.entries(person)); 

for(let key in person){
    console.log(key, ":", person[key])
}

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const mergedObject = Object.assign(target, source);     //create copy of objects
const shallowC = Object.assign({}, source);         //creates shallow copy
console.log(mergedObject,shallowC); 

const original = {
  name: "Hello",
  social: {
    X: "World",
  },
};

const deepCopy = structuredClone(original);

deepCopy.social.X = "learnify"; 
deepCopy.name="REG"

console.log(original.social.X); 
console.log(deepCopy.social.X); 
console.log(original,deepCopy)

const colors = ["red", "green", "blue", "black"];
let { [2]: color1, [1]: color2 } = colors;

console.log(color1); 
console.log(color2);


/// Array methods
const users=[
  {firstName:"john",lastName:"Biden",age:26},
  {firstName:"jimmy",lastName:"cob",age:75},
  {firstName:"sam",lastName:"lewis",age:50},
  {firstName:"Ronald",lastName:"Mathew",age:26},  
];

const fullname =users.map(e =>{return e.firstName+" "+e.lastName})
console.log(fullname)

const count = users.reduce((acc,cur)=>{
    if(acc[cur.age]){
        acc[cur.age]++;
    }
    else{
        acc[cur.age]=1
    }
    return acc
},{})
console.log(count)

let student =[
 {name:"Smith",rollNumber:31,marks:80},
 {name:"Jenny",rollNumber:15,marks:69},
 {name:"John",rollNumber:16,marks:35},
 {name:"Tiger",rollNumber:7,marks:55}
];

const find=student.filter((e)=>{
    return e.marks>60 && e.rollNumber>15
})
console.log(find)

const sum = student.reduce((acc,cur)=> acc+cur.marks,0)
console.log(sum)