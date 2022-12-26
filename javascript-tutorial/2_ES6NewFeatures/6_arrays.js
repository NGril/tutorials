// 6. arrays 

const boxes = document.querySelectorAll('.box'); // returns a node list, needs to be transformed to an array

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes); // hackish
boxesArr5.forEach(function (cur) {
    cur.style.backgroundColor = 'blue';
});

// ES6
const boxesArr6 = Array.from(boxes);    // easy transformation
boxesArr6.forEach(cur => cur.style.backgroundColor = 'blue');


///////////////////////////////////////////////////////////////////////


// ES5 - ugly for loop
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }
    boxesArr5[i].textContent = 'I changed to blue!';
}


// ES6 - for of loop
for (const cur of boxesArr6) {
    if (cur.className === 'blue') {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}


////////////////////////////////////////////////////////////////////////


var ages = [12, 17, 8, 21, 14, 11];

// ES5 - finding the index and value is complicated
var full = ages.map(function(cur) {
    return cur >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


// ES6 - finding them is easy peasy
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));