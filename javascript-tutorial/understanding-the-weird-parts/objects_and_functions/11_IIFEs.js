// function statement
function greet(name) {
  console.log("Hello " + name);
}
greet("Niko");

// function expression
var greetFun = function (name) {
  console.log("Hello " + name);
};
greetFun("Niko");

// IIFE - immediatelly invoked function expression
var greeting = (function (name) {
  return "Hello " + name;
})("Niko");
console.log(greeting);

(function (name) {
  console.log("Hello " + name);
})("Niko");

// btw this is valid JS - we are just not doing anything with these values
3;
("I'm a string");
({ name: "John" });

// also note that there are 2 different syntaxes for IIFEs - with invocatio inside parentheses, and with invocation outside of them
(function (name) {
  console.log("Hello " + name);
}("Niko"));

(function (name) {
  console.log("Hello " + name);
})("Niko");
