/*
Given 2 arrays, create a function that let's a user know (true/false) whether these 2 arrays contain any common items

Example

const arr1 = ['a', 'b', 'c', 'x']
const arr2 = ['z', 'y', 'i']
should return false

const arr1 = ['a', 'b', 'c', 'x']
const arr2 = ['z', 'y', 'x']
should return true
*/

// CHEATSHEET QUICK NOTES
// 1. write out top comment
// 2. always string / char elements? 2 arrays input, output boolean
// 3. array size (time & memory complexity)
// 4. enough with the questions
// 5. brute force - O(n^2) => nested loops
// 6. not the best
// 7. transform array into an object and than loop
// 8. steps
// 9. modularize code
// 10. code
// 11. it will work with empty arrays
// 12. readable code
// 13. test, always 2 params
// 14. ask if there's a better solution
// 15. scale question

// time complexity O(a)
// space complexity O(a)
function containsCommonItems(arr1, arr2) {
  // 8. transform arr1 into an object { a: true, b: true... }
  const map = transformArrayIntoObject(arr1);

  // 8. loop through arr2 and check if value exists in map
  for (let i = 0; i < arr2.length; i++) {
    if (map[arr2[i]]) return true;
  }

  return false;
}

// 9. modularize
function transformArrayIntoObject(arr) {
  return arr.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
}

// readable
// time complexity O(a*b)
// space complexity O(1)
function containsCommonItems2(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}

const arr1 = ["a", "b", "c", "x"];
const arr2 = ["z", "y", "x"];

console.log(containsCommonItems(arr1, arr2));
console.log(containsCommonItems2(arr1, arr2));
