/*
---- 1. How JS code is run ----

JavaScript code is ran on some host (typically a browser or a Node.js server) which has a JavaScript Engine.

A JavaScript Engine is a program that executes JS code.
It does so in the following steps:
    1. parsing our code
    2. converting it to machine code
    3. running the code
*/

////////////////////////////////////////////////////////////////////////////////////////////////////

/*
---- 2. Execution context and Execution stack ----

An execution context is an environment (a container) in which JS variables are stored and where the code is ran.

The default context is the global context, associated with the global object, which in the browser is the window object. It means that all variables not inside any function are actually properties of the window object.

Each new function gets its own execution context which is put on top of the Execution stack (first in last out principle).
*/

var name = 'John';
console.log(name);
console.log(window.name);   // same thing as above

/////////////////////////////////////////////////////////////////////////////////////////////////////

/*
---- 3. Execution phases ----

2 phaeses:
    1. creation of the execution object
    2. the code of the execution context is ran line by line

An execution context object consists of:
    - Variable Object - contains all the function and variable declarations and arguments of the execution context
    - Scope Chain - contains the current Variable Object and the Variable Object of all its parents
    - "This" variable
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////

/*
---- 4. Hoisting ----

Hoisting is a process which happens during the creation of the Variable Object in which the code is scanned for:
    1. functions - for each one a property pointing to the function is created in the Variable Object
    2. variables - for each one a property set to undefined is created in the Variable Object
*/

add(2, 2);  // a function can be used before it is declared - hoisting
function add(num1, num2) {
    console.log(num1 + num2);
}
add(2, 2);


// subtraction(4, 2);  // here we can't use the function before it's declaration because we wrote a function expression, which means that we stored a function in a variable, during hoisting variable declarations are set to undefined, so we get an error!
var subtraction = function (num1, num2) {
    console.log(num1 - num2);
}
subtraction(4, 2);


console.log(age);   // here the variable is undefined, same reason as above
var age = 23;
console.log(age);

var fruit = 'banana';   // variable is stored in the global execution context
function foo() {
    var fruit = 'orange';   // variable is stored in the execution context of the foo function
    console.log(fruit);     // orange
}
foo();
console.log(fruit);     // banana

/////////////////////////////////////////////////////////////////////////////////////////////////////

/*
---- 5. Scoping and scope chain ----

Scoping answers the question where we can access a ceratin variable.
In JS each new function creates a scope. (Condition blocks and loops do not create its own scope)

Lexical scoping - a function that is lexically within another function gets access to the scope of the outer function.
*/

var a = 'Hello';
first();

function first() {
    var b = 'Hi';
    second();

    function second() {
        var c = 'Hey';
        console.log(a + b + c); // this works because of lexical scoping, ofc it doesnt work backwards
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d); // this wouldn't work because third can't access b and c variables
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

/*
---- 6. The 'this' keyword ----

The 'this' keyword points to:
    - the golbal object (regular function call)
    - the object that is calling the method (method call)

The this keyword is not assigned a value until a function where it is defined is actually called!!
*/

console.log(this); // window

function add(num1, num2) {
    console.log(num1 + num2);
    console.log(this); 
}
add(2, 2);  // window - regular function call!


var john = {
    name: 'John',
    age: 50,
    printMe: function() {
        console.log(this);
        console.log(this.name);
        console.log(this.age);
    }
}
john.printMe(); // john object - method call!


var mark = {
    name: 'Mark',
    age: 30,
    outer: function() {
        function inner() {
            console.log(this);
        }
        inner();
    }
}
mark.outer(); // window - inner is a regular function call


var mike = {
    name: 'Mike',
    age: 15
}

mike.printMe = john.printMe; // simply assigning values
mike.printMe(); // calling the function - method borrowing - the 'this' variable is assigned only when the method is called, this is why it works correctly!