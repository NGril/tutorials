// in JS an array can hold different value types since it's dynamically typed
var arr = [
  1,
  false,
  "hola",
  { name: "Niko", address: "111 Main St." },
  function (name) {
    var greeting = "Hello";
    console.log(greeting + " " + name);
  },
];

console.log(arr);
arr[4](arr[3].name); // Hello Niko
