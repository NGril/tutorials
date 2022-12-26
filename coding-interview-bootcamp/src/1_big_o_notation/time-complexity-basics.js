// TIME COMPLEXITY BASICS

// example 1
const nemo = ["nemo"];
const everyone = ["dory", "bruce", "marlin", "nemo", "gill", "bloat", "nigel", "squirt", "darla", "hank"];
const large = new Array(100000).fill("nemo");

// O(n) -> Linear time
function findNemo(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "nemo") {
      console.log("found NEMO!");
    }
  }
}
findNemo(nemo);
findNemo(everyone);
findNemo(large);

// example 2
const boxes = [0, 1, 2, 3, 4, 5];

// O(1) -> constant time
function logFirstTwo(array) {
  console.log(array[0]);
  console.log(array[1]);
}
logFirstTwo(boxes);

// example 3
const arr = [1, 2, 3, 4, 5];

// O(n^2) -> quadratic time
function logAllPairsOfArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i], array[j]);
    }
  }
}
logAllPairsOfArray(arr);
