var person = {
  firstname: "John",
  lastname: "Doe",
  getFullName: function () {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  },
};

var logName = function (lang1, lang2) {
  console.log("Logged: " + this.getFullName());
  console.log("Arguments: " + lang1 + ", " + lang2);
  console.log("----------------------------------");
}; // we could've also directly added .bind(), .call(), or .apply() to this line as well
// logName(); // this will of course fail because this.getFullName() doesn't exist in the global object

// BIND
/* 
- here we are using the function as an object and acessing its bind() method
- its first argument is the value of the this variable
- by using bind we could've also set some predefined parameters (for example set lang1 to always be 'en') - function currying
- bind returns a copy of the entire function with its this variable pointing to wherever we indicated
*/
var logPersonName = logName.bind(person);
logPersonName("en", "es"); // Logged: John Doe, Arguments 'en', 'es'

// CALL
/*
- call just invokes the function (same as parantheses, ())
- the difference is that we can control the value of the this variable (1st parameter of call())
*/
logName.call(person, "en", "es");

// APPLY
/*
- apply also just invokes the function (same as parantheses, ())
- the difference is that we can control the value of the this variable (1st parameter of apply())
- the difference between call and apply is that call takes in spreaded args after the 1st parameter, while apply takes in an array of args 
*/
logName.apply(person, ["en", "es"]);

// -------------------------------------------------------------------------------------------
// USAGES

// 1. METHOD / FUNCTION BORROWING
// using method from one object on another
var person2 = {
  firstname: "Jane",
  lastname: "Doe",
};
console.log(person.getFullName.apply(person2));

// 2. FUNCTION CURRYING
// creating a new function copy with some predefined parameters
// we could predefine no parameters, some parameters or even all parameters
// useful in mathematical situations
function multiply(a, b) {
  return a * b;
}

var multiplyByTwo = multiply.bind(this, 2);
// the above line is the equivalent of:
function multiplyByTwo2(b) {
  var a = 2;
  return a * b;
}

console.log(multiplyByTwo(4));
