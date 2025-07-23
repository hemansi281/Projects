Object.prototype.sayHello= function(){
    console.log(`Helloo, This is ${this.name}`)
}

let obj = {
    name: 'Virat Kohli',
    age: 33
}
obj.sayHello()

Array.prototype.multiply= function(){
    let mul=1;

    for(let i=0;i<this.length;i++){
        mul *= this[i]
    }
    return mul;
}

let arr1=[1,2,3,4]
console.log(arr1.multiply())

String.prototype.getFirstLast= function(){
    return `${this[0]}, ${this[this.length-1]}`
}

let str='Hemansi'
console.log(str.getFirstLast())
// console.log(arr1.getFirstLast())

function Person(name,age){
    this.name=name;
    this.age=age
}

let person1 = new Person('ABC',28)
console.log(person1.name)

Person.prototype.gender= function(gender){
    this.gender=gender
}
Person.prototype.state='Gujarat'

person1.gender('Male')
console.log(person1)
console.log(person1.state)

let person2 = new Person('JI',50)
console.log(person2)

