// FUNCTION CONSTRUCTORS
function Person() {
  console.log(this);

  this.firstname = "John";
  this.lastname = "Doe";

  console.log("This function is invoked");
  console.log(this);
}

Person(); // this points to the global object by default

// the `new` operator creates an empty object and makes the 'this' variable point to it
// after that we call the Person function
// as long as we don't return anything from the Person function JS will return the object created by the 'new' operator
// the first console.log(this) will output an empty object, {}, and the second will output an object with firstname John, and lastname Doe,
// these prove that the facts stated above are true
var john = new Person();
console.log(john);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// with parameters (it's just a normal function)

function Person2(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

var jane = new Person2("Jane", "Smith");
console.log(jane);
