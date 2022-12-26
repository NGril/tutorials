// YT link - https://www.youtube.com/watch?v=XKu_SEDAykw
const array1 = [1, 2, 3, 9];
const array2 = [1, 2, 3, 5];

// naive approach
function hasPairWithSum(arr, sum) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        return true;
      }
    }
  }

  return false;
}

// better approach - store complements in Set, console log each step if you don't get it
function hasPairWithSum2(arr, sum) {
  const mySet = new Set();
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (mySet.has(arr[i])) {
      return true;
    }
    mySet.add(sum - arr[i]);
  }
  return false;
}

console.log(hasPairWithSum2(array2, 8));
