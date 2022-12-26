// 5. destructuring 
// a convenient way to extract data from an object / array

// ES5 
var john = ['John', 26];
var name5 = john[0];
var age5 = john[1];

// ES6
const [name6, age6] = ['John', 26]; //destructuring
console.log(name6);
console.log(age6);


const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const { firstName, lastName } = obj; // variable names must match the object property names in order for this to work
console.log(firstName);
console.log(lastName);

const { firstName: a, lastName: b } = obj; // if we don't wont the variable names to match the object property names
console.log(a);
console.log(b);


function calcAgeRetirement(year) {
    const ageOfRetirement = 65;
    const age = new Date().getFullYear() - year;
    return [age, ageOfRetirement - age];
}
const [age, retirement] = calcAgeRetirement(1990); // nice way to return 2 values from a function, althoguh this is not clean code and shouldn't really be done
console.log(age);
console.log(retirement);