// reference types - boxing in primitive values
var a = new Number(5);
console.log(Number.prototype);
console.log(a.__proto__);

// JS also knows to do it automatically if we access some property used in a reference type on a primitive
// it won't do it on numbers though
var b = "abcd".length;
console.log(b);

var c = new Date("1/1/2021");
console.log(c);

// we can even do something like this (useful for libraries / frameworks)
String.prototype.isLengthGreaterThan = function (limit) {
  return this.length > limit;
};
console.log("test".isLengthGreaterThan(3));

Number.prototype.isPositive = function () {
  return this > 0;
};
var d = 5;
console.log(d.isPositive());

// DANGERS
console.log("----- dangers: ------");
// by reference vs by value, deep vs shallow copy
var a = 3;
var b = new Number(3);
console.log(a == b); // true
console.log(a === b); // false

// NOTE - momentjs is a useful lib when working with dates
