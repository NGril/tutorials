var a = 3;
console.log(typeof a); // number

var b = "Hello";
console.log(typeof b); // string

var c = {};
console.log(typeof c); // object

var d = [];
console.log(typeof d); // also an object, since arrays are objects - weird!
console.log(Object.prototype.toString.call(d)); // better! but still weird, who would use this

function Person(name) {
  this.name = name;
}

var e = new Person("Jane");
console.log(typeof e); // object
console.log(e instanceof Person); // true

console.log(typeof undefined); // undefined
console.log(typeof null); // null - this is a bug since, like, forever...

var z = function () {};
console.log(typeof z); // function
