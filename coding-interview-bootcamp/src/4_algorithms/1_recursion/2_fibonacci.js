// Given a number N return the index value of the Fibonacci sequence, where the sequence is:
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...

// e.g. fibonacciRecursive(8) should return 21

// O(2^n)
function fibonacciRecursive(index) {
  // param check
  if (index < 0) {
    throw new Error("Invalid argument value!");
  }

  // base case
  if (index === 0 || index === 1) {
    return index;
  }

  // recursive case
  return fibonacciRecursive(index - 2) + fibonacciRecursive(index - 1);
}

// O(n)
function fibonacciIterative(index) {
  const fibonacciSequence = [0, 1];

  if (index < 0) {
    throw new Error("Invalid argument value!");
  }

  // if indices are 0 or 1
  if (fibonacciSequence[index] !== undefined) {
    return fibonacciSequence[index];
  }

  let currIdx = 1;
  while (currIdx < index) {
    fibonacciSequence.push(fibonacciSequence[currIdx - 1] + fibonacciSequence[currIdx]);
    currIdx++;
  }

  return fibonacciSequence[currIdx];
}

console.log("recursive", fibonacciRecursive(8));
console.log("iterative", fibonacciIterative(8));
