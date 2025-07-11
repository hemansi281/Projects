let {a,b,cc} = require('./export')

// let a="sbdj"
a()
b()
console.log(a())
// console.log(b())
console.log(cc)

//Nullish
const nullValue = null;
const emptyText = "";
const no = 0;

const valA=nullValue ?? "default for A";
const valB=emptyText ?? "default for B";
const valC=no ?? 33;
const valD=no||10;
const valE=emptyText||"FS"

console.log(valA,valB,valC,valD,valE)