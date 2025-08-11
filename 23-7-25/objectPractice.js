let obj1 ={a:2, b:4};
let target ={a:6, c:56};

let finalObj = Object.assign(target,obj1)
console.log(finalObj)

Object.defineProperty(obj1,'name',{
    value:'Hemansi',
    writable: true,
    enumerable:true   
})
delete obj1.name;
console.log(obj1)           //{a:2, b:4}
obj1.name="ABC"

console.log(obj1.name)      

const object = {
  a: "some string",
  b: 42,
};
console.log(Object.entries(object))


// in operator and hasOwn
const obj2 = {
  prop: "exists",
  45: "jj"
};
console.log(obj2)
console.log(Object.hasOwn(obj2, "prop"));
console.log('prop' in obj2)
// console.log('toString' in obj2)
console.log(Object.hasOwn(obj2,'toString'))

// seal() & freeze()
const obj3 = {
  foo: 42,
};
Object.seal(obj3);      // only update not add or remove
obj3.foo = 33;
obj3.hii=true;
console.log(obj3);

delete obj3.foo;       
console.log(obj3.foo);

Object.freeze(obj3);    // cannot update 
obj3.foo=55;
console.log(obj3)


console.log(Object.is("1", 1));
console.log(Object.is(undefined,undefined))
console.log(NaN == NaN)
console.log(Object.is(NaN, NaN));
console.log(Object.is(-0, 0));
const obj = {};
console.log(Object.is(obj, {}));


const obj4 = {
  foo: 42,
};
const descriptor = Object.getOwnPropertyDescriptor(obj4, "foo");
console.log(descriptor)
console.log(descriptor.configurable);
console.log(descriptor.value);


let user={
  fame:'ABC',
  lname:'OOO',
  address:{
    state:'GUJ',
    city:{
      name:'Ahmedabad'
    }
  },
  // fullname:function(){                 // function cannot be cloned using structuredClone
  //   return `${fname} ${lname}`
  // },
  neighbour:[2,3,4]
}

let userclone = structuredClone(user)
console.log(userclone)

let userCopy = JSON.parse(JSON.stringify(user))
console.log(userCopy)