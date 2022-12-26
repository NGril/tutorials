// Write 2 functions that find the factorial of any number. One should use recursive, the other should just use a for loop.

// O(n)
function findFactorialRecursive(number) {
  // param check
  if (number < 0) {
    throw new Error("Invalid argument value!");
  }

  // base case - because 0! is 1
  if (number === 0) {
    return 1;
  }

  // recursive case
  return number * findFactorialRecursive(number - 1);
}

// O(n)
function findFactorialIterative(number) {
  if (number < 0) {
    throw new Error("Invalid argument value!");
  }

  let result = 1;

  for (let i = number; i > 1; i--) {
    result *= i;
  }

  return result;
}

console.log("recursive", findFactorialRecursive(5));
console.log("iterative", findFactorialIterative(5));
