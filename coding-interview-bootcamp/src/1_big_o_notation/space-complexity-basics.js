// SPACE COMPLEXITY BASICS

// O(1) since we don't add anything to memory within the function
function boo(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log("boo");
  }
}
boo([1, 2, 3, 4, 5]);

// O(n) since we add items to array based on size of n
function arrayOfHiNTimes(n) {
  const hiArray = [];
  for (let i = 0; i < n; i++) {
    hiArray[i] = "Hi";
  }
  return hiArray;
}
arrayOfHiNTimes(6);
