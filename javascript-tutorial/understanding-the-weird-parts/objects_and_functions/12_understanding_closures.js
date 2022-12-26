// EXAMPLE 1
// a function that returns a function (since functions are objects)
function greet(whattosay) {
  return function (name) {
    console.log(whattosay + " " + name);
  };
}

// a bit weird but it works
greet("Hi")("Niko");

// other way of doing it
// how does the sayHi variable still know the value of its whattosay parameter in the second line? CLOSURES
var sayHi = greet("Hi");
sayHi("Niko");

// EXAMPLE 2
function buildFunctions() {
  var arr = [];

  for (var i = 0; i < 3; i++) {
    arr.push(function () {
      console.log(i);
    });
  }

  return arr;
}

var fs = buildFunctions();

// these will all output '3' - a bit confusing
fs[0]();
fs[1]();
fs[2]();

/*
This is because of the closure mechanism. Important things to understand for this example are:
    1. The function we are pushing in the array within the for loop is not run at the point in time its created (
        but later when we actually invoke it)
    2. By the time we exit the buildFunctions function 2 values stick around memory:
        - the value of the variable i which is 3
        - the array arr which holds 3 values
    3. at the time of execution, fs[0](), the execution context of the buildFunctions function has already poped out of the execution stack
    4. because of the way that closures work the inner function that was pushed in the array has access to its outer environment, 
        which is the variable object of its outer function (buildFunctions)
    5. the variable object of the outer function holds the value of 3 for i, and that is why in all of these cases 3 is printed to the
*/

// EXAMPLE 3 - with IIFE
function buildFunctions2() {
  var arr = [];

  for (var i = 0; i < 3; i++) {
    arr.push(
      (function (j) {
        return function () {
          console.log(j);
        };
      })(i)
    );
  }

  return arr;
}

var fs2 = buildFunctions2();

// these will output 0, 1, and 2 now
fs2[0]();
fs2[1]();
fs2[2]();

/*
This now happens because we use an IIFE to push a function into an array
This means that the function (which is an IIFE) gets executed at the exact moment the parser sees it, not later
Because of that IIFE - each pushed function has a separate outer environment and a separate variable object which it points to
*/
