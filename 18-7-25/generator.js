let arr = [2,5,20,7,8]

arr.forEach(item => {
    if (item === 20) return; // only exits current callback, not entire loop.
    console.log(item);
});

for (let ele in arr) {
    console.log(ele + 1, typeof ele)    
}

const one = true && false && 3;
const two = null || false || '';
const three = [] || 0 || true;

console.log(one, two, three);

console.log([] == false);       //true
console.log({} == false);       //false
console.log(NaN == NaN)         //false
console.log(null == undefined)      //true
console.log(null == NaN,"NNN")  //false - NaN jode koi bi comparison false return karse

///////////// Generators //////////////

function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
}
const gen = myGenerator();
console.log(gen)            // Object [Generator] {}
console.log(gen.next())     // {value:1, done:false}
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())


function* demo() {
    yield 10;
    yield 20;
    return 30;
}

const gen1 = demo();

console.log("demo",gen1.next());  // ?
console.log(gen1.next());  // ?
console.log(gen1.next());  // ?
console.log(gen1.next());

function* test() {
    yield 'A';
    yield 'B';
    yield 'C';
}

const iterator = test();
for (const value of iterator) {
    console.log(value);
    break;
}

console.log(iterator.next());

function* countForever() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const gen2 = countForever();
for (const value of gen2) {
    if (value > 5) break;
    console.log(value);
}

function* sample() {
    yield* [1, 2, 3];
    yield 4;
}

const gen3 = sample();
console.log("gen3",gen3.next().value);
console.log(gen3.next().value);
console.log(gen3.next().value);
console.log(gen3.next().value);
console.log(gen3.next().done);

function* gene() {
    yield 1;
    yield 2;
    yield 3;
}

const g = gene();
console.log([...g]);
console.log([...g]);

