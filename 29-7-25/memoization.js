function slowAdd(a, b) {
  console.log("Calculating..."); 
  
  for (let i = 0; i < 1000000000; i++) {} // Busy wait
  return a + b;
}

console.log(slowAdd(5, 3)); // takes time
console.log(slowAdd(5, 3)); // takes time again



const memoizedAdd = (() => {
  const cache = {};
 
  return function (a, b) {
    const key = `${a},${b}`; // unique key
 
    if (key in cache) {
      console.log("Retrieved from cache");
      return cache[key];                // retrun earlier
    }
 
    console.log("Calculating...");
  
    for (let i = 0; i < 10000000000; i++) {}
 
    const result = a + b;
    cache[key] = result; // store the result
    return result;
  };
})();
 
console.log(memoizedAdd(5, 3)); // takes time
console.log(memoizedAdd(5, 3)); // give o/p at that time