function addTo80(n) {
  console.log("long time");
  return n + 80;
}

function memoizedAddTo80() {
  let cache = {};

  return (n) => {
    if (n in cache) {
      return cache[n];
    }

    console.log("long time");
    cache[n] = n + 80;
    return cache[n];
  };
}

const memoizedFun = memoizedAddTo80();

console.log(memoizedFun(5));
console.log(memoizedFun(5));
console.log(memoizedFun(6));
