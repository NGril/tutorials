// this shows that each variable is unique within its execution context

function b() {
  var myVar;
  console.log(myVar);
}

function a() {
  var myVar = 2;
  console.log(myVar);
  b();
}

var myVar = 1;
console.log(myVar); // global context - myVar = 1
a(); // first it calls a() which prints 2, then it goes into b which prints 'undefined'
console.log(myVar); // global context again - myVar = 1
