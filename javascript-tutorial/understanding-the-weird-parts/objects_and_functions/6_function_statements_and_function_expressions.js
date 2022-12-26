var a;

// this is an expression because the equals operator returns the value 3
a = 3;
// this is also an expression because the plus operator also returns a value, it doesn't matter that this value is not stored anywhere
1 + 2;

// 'if' is a statement because it doesn't return any value, it just 'does' the work
// a === 3 is an expression on the other hand, since a === 3 returns a boolean value
if (a === 3) {
  // ...
}

// -----------------------------------------------------------------------------------------------------------

// FUNCTION STATEMENT
// this function is a STATEMENT since it doesn't immediatelly return a value (we would have to invoke it)
function greet() {
  console.log("hi");
}

// FUNCTION EXPRESSION
// this is allowed since functions are objects
// the anonymousGreet variable will contain the function
// this is an anonymous function since it doesn't have a name property, it can be referenced through the variable
// this is a function EXPRESSION since it results in a value (and that value is the function object which we store inside the anonymousGreet variable)
var anonymousGreeet = function () {
  console.log("hi");
};

// invocation of an anonymous function
// NOTICE that since this is now a variable that contains a function
// it can't be invoked before it's declared because during the hoisting process it will be initialized to undefined
anonymousGreeet();

// since functions are objects we can pass them between each other, this is an examplem of a function within a function
function log(a) {
  a();
}

log(function () {
  console.log("function within a function");
});
