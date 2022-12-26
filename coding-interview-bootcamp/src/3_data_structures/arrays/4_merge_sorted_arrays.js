/* eslint-disable */
// [0, 3, 4, 31], [4, 6, 30] => [0, 3, 4, 4, 6, 30, 31]

const arr1 = [0, 3, 4, 31];
const arr2 = [4, 6, 30];

// brute force
const mergeSortedArrays = (arr1, arr2) => {
  return [...arr1, ...arr2].sort((a, b) => a - b);
};

// O(a+b) time & O(a+b) space
function mergeSortedArrays2(arr1, arr2) {
  let merged = [];
  let index1 = 0;
  let index2 = 0;
  let current = 0;

  while (current < arr1.length + arr2.length) {
    let isArr1Depleted = index1 >= arr1.length;
    let isArr2Depleted = index2 >= arr2.length;

    if (!isArr1Depleted && (isArr2Depleted || arr1[index1] < arr2[index2])) {
      merged[current] = arr1[index1];
      index1++;
    } else {
      merged[current] = arr2[index2];
      index2++;
    }

    current++;
  }

  return merged;
}

console.log(mergeSortedArrays(arr1, arr2));
console.log(mergeSortedArrays2(arr1, arr2));
