var arr = ["John", "Jane", "Jim"];

for (var prop in arr) {
  console.log(prop + ": " + arr[prop]);
}

// because an array is an object each entry is actually a key - value pair where the key is the position in the array
// for in loop goes through all the properties of an object so if we (or some framework) did this:
console.log("------------------------------------------");
Array.prototype.myCustomFeature = "cool";

for (var prop in arr) {
  console.log(prop + ": " + arr[prop]);
}
