// this shows how the scope chain works and that it looks at the lexical environment, and not the execution stack order in order to find a value

// ---- EXAMPLE 1 ----
function b() {
  console.log(myVar);
}

function a() {
  var myVar = 2;
  b();
}

var myVar = 1;
a();
// this would print 1, because the outer reference of the b() function points to the global execution context
// this is because of the lexical environment within which the b() function is written - it's parent is the global environment

// ---- EXAMPLE 2 ----
function d() {
  function c() {
    console.log(myVar2);
  }

  var myVar2 = 2;

  c();
}

var myVar2 = 1;
d();
// this would now print 2 because the outer reference of the c() function points to the execution context of the d() function now
// this is because the parent lexical environment within which the c() function is written is the environment of the function d()
// we also wouldn't be able to call the c() function directly from the global object, because it's now attached to the variable object of the d() function
