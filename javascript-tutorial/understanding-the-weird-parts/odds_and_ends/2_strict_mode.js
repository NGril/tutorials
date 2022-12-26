"use strict";

var person;

// typo
// no error without strict mode, even though this is not declared
// with strict mode it throws an error
persom = {};
console.log(persom);
