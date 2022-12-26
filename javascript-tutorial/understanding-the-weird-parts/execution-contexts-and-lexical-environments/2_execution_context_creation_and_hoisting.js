// this shows the HOISTING mechanism and the difference between the value not being defined at all, and the 'undefined' special JS value

b(); // calls the function and prints "Called b!"
console.log(a); // prints out 'undefined' which is the initial placeholder value which is used for initialization (variable a is declared but not initialized yet)
console.log(c); // throws an error because the c variable doesn't exist (c is not declared and therefore not present in memory at all)

var a = "Hello world!";

function b() {
  console.log("Called b!");
}
