// 1. variable declarations with let and const

// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
age5 = 24;

// ES6
const name6 = 'Jane Smith';
name6 = 'Jane Miller'; // illegal
let age6 = 23;
age6 = 24; // legal


// ES5
function driversLicence5(passedTest) {
    if (passedTest) {
        var name = 'John';
        var yearOfBirth = 1995;
    }

    console.log(name + '-' + yearOfBirth);  // legal (function scoping)
}
driversLicence5(true);
console.log(name + '-' + yearOfBirth);  // illegal (function scoping)

// ES6
function driversLicence6(passedTest) {
    if (passedTest) {
        let name = 'John';
        const yearOfBirth = 1995;
    }

    console.log(name + '-' + yearOfBirth); // illegal (block scoping)
}
driversLicence6(true);