function calcSum(arr) {
    let totalOrders = 0;
    for (let i = 0; i < arr.length; i++) {
        totalOrders += arr[i];
    }
    console.log('sum:', totalOrders);
}
// debugger;
let orders = [341, 454, 198, 264, 307];
console.log('hi1');
console.log('hi2');
console.log('hi3');
calcSum(orders);
console.log('hi4');

// node inspect debugger.js // - pause on 1st line.
// NODE_INSPECT_RESUME_ON_START=1 node inspect gdb.js     // - run until the first breakpoint


// stepping:>
//  c : continue
//  n : step next
//  s : step in
//  o : step out

// Breakpoints:>
// sb(line)             - set breakpoint
// cb(file, line)       - clear breakpoint

// info:>
// bt : Print backtrace of current execution frame
// repl : opens up interactive interpreter
// list(<num>) : print <num> line before/after of current context code
// watch(expr): Add expression to watch list
// unwatch(expr): Remove expression from watch list
// watchers

// connecting runtime to chrome dev tool
//  >> about://inspect
//  >> inspect

// reference:>
// https://nodejs.org/docs/latest-v16.x/api/debugger.html#stepping
// https://nodejs.org/en/docs/guides/debugging-getting-started/