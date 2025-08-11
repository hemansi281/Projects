// Proxy object can be used in place of original object
// It allows to redefine behaviour of objects x 

const target={
    user1: 'ABC',
    user2: 'DEF'
}

const handler1={};

const proxy1 = new Proxy(target,handler1);
// target - the object proxy will wrap
// handler - An object that defines which operations to intercept (called traps) and how to redefine them

console.log(proxy1)


// apply()
function sum(a, b) {
  return a + b;
}

const handler = {
  apply(target, thisArg, argumentsList) {               // trap for function call   
    console.log(`Calculate sum for: ${argumentsList}`);

    return target(argumentsList[0], argumentsList[1]) * 10;
  },
};

const proxy2 = new Proxy(sum, handler);
console.log(sum(1, 2));             //3
console.log(proxy2(1, 2));          //30


// get()
const admin={
    id:1,
    role:'admin'
} 

const handler3={
    get(target,prop){
        if(prop === 'role'){
            return `user`
        }
        return Reflect.get(...arguments)
    }

}
const proxy3= new Proxy(admin,handler3)
console.log(admin.role)
console.log(proxy3.id)
console.log(proxy3.role)