// 7. spread operator
// 'spreads' the elements of an array - transforms them into single values

function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

var ages = [18, 30, 12, 21];

// ES5
var sum2 = addFourAges.apply(null, ages); // apply method takes the array and calls the function with array elements as arguments, first param is to set the 'this' variable, which is not important here
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages); // ... is the spread operator
console.log(sum3);

/////

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];    // coolio
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];                              // also works on node lists

Array.from(all).forEach(cur => cur.style.color = 'purple');