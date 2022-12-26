// Google question - first recurring char
// Given an array = [2, 5, 1, 2, 3, 5, 1, 2, 4]
// It should return 2

// Given an array = [2, 1, 1, 2, 3, 4, 1, 2, 4]
// It should return 1

// Given an array = [2, 3, 4, 5]
// It should return undefined

const arr1 = [2, 5, 1, 2, 3, 5, 1, 2, 4];
const arr2 = [2, 1, 1, 2, 3, 4, 1, 2, 4];
const arr3 = [2, 3, 4, 5];

// O(n)
const findRecurring = (arr) => {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      return arr[i];
    }

    map.set(arr[i], true);
  }
};

console.log(findRecurring(arr1));
console.log(findRecurring(arr2));
console.log(findRecurring(arr3));
