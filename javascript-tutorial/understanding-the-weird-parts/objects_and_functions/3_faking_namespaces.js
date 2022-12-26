// let's imagine these variables were set in different JS files
var greet = "Hello";
var greet = "Hola";

console.log(greet);

// faking namespaces - using objects as containers
var english = {};
var spanish = {};

english.greet = "Hello!";
spanish.greet = "Hola!";

// this will fail - because the dot operator has left to right associativity and greetings is undefined
english.greetings.greet = "Hello!";

// to solve this we can
var english = {
  greetings: {
    basic: "Hello",
  },
};
