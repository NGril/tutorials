// BY VALUE - DEEP COPY (primitives)
// when creating copies of primitive values they occupy different spaces in memory and we can change them independently
var a = 3;
var b;

b = a;
a = 2;

console.log(a); // 2
console.log(b); // 3

// BY REFERENCE - SHALLOW COPY (all objects, including functions)
// when creating copies of object values they occupy the same space in memory and we can't change them independently
// they are essentially one value in memory
var c = { greeting: "hi" };
var d;

d = c;
c.greeting = "hello";

console.log(c.greeting); // hello
console.log(d.greeting); // hello

// the same rule applies for parameters
function changeGreeting(obj) {
  obj.greeting = "hola"; // mutate
}

changeGreeting(d);

console.log(c.greeting); // hola
console.log(d.greeting); // hola

// equals operator sets up new memory space (new address)
// in this case we are setting c to a completely new value
c = { greeting: "howdy" };

console.log(c.greeting); // howdy
console.log(d.greeting); // hola
