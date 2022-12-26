// Fibonacci
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233...

// (O 2^n)
let calculationsNoMemo = 0;
function fibonacciAtIndex(index) {
  calculationsNoMemo++;
  if (index < 2) {
    return index;
  }

  return fibonacciAtIndex(index - 2) + fibonacciAtIndex(index - 1);
}

console.log("without memo");
console.log("result", fibonacciAtIndex(7));
console.log("num of calculations", calculationsNoMemo); // O(2^n), very bad

// O(n)
let calculationsMemo = 0;
function fibonacciAtIndexMemo() {
  let cache = {};

  return function fib(index) {
    if (index in cache) {
      return cache[index];
    }

    calculationsMemo++;
    if (index < 2) {
      return index;
    }

    cache[index] = fib(index - 2) + fib(index - 1);
    return cache[index];
  };
}

// another memo approach - bottom up
function fibonacciAtIndexMemo2(index) {
  if (index < 2) {
    return index;
  }

  const answer = [0, 1];

  for (let i = 2; i <= index; i++) {
    answer.push(answer[i - 2] + answer[i - 1]);
  }

  return answer.pop();
}

const memoFibonacci = fibonacciAtIndexMemo();

console.log("with memo");
console.log("result", memoFibonacci(7));
console.log("num of calculations", calculationsMemo); // O(n) - noice

console.log("memo 2", fibonacciAtIndexMemo2(7));
