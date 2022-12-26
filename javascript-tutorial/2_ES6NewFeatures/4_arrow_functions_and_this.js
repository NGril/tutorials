// 4. Arrow functions

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
    return 2020 - el;
});
console.log(ages5);

// ES6
let ages6 = years.map(el => 2020 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Ages element ${index + 1}: ${2020 - el}.`);
console.log(ages);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Ages element ${index + 1}: ${age}.`
});
console.log(ages);


// arrow functions and 'this' keyword (lexical this)

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe1: function () {
        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        }) // function call, 'this' points to the global object (window), so both of these variables are undefined 
    },

    clickMe2: function () {
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        }) // solution before ES6, a bit hackish
    }
}
box5.clickMe1();
box5.clickMe2();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe1: function () {
        document.querySelector('.green').addEventListener('click', () => {
            const str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        }) // the arrow function doesn't have its own 'this' keyword, it shares the lexical 'this' of the parent object, so this expression is ok
    }
}
box6.clickMe1();

const box66 = {
    color: 'green',
    position: 1,
    clickMe1: () => {
        document.querySelector('.green').addEventListener('click', () => {
            const str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        }) // now it's not okay because the clickMe1 function now also shares the this keyword of its parent object (which is now the window), so now we have undefined variables (a function creates a new execution context)
    }
}
box66.clickMe1();

/////////////////////////////////////////////////////////////////////////////////////////

function Person(name) {
    this.name = name;
}
const friends = ['Bob', 'Jane', 'Mark'];

// ES5
Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (el) {
        return this.name + ' is friends with ' + el;
    }.bind(this));  // another trick in order to point the 'this' variable to the parent object and not the window
    console.log(arr);
}
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
    var arr = friends.map(el => `${this.name} is friends with ${el}`);
}
new Person('Mike').myFriends6(friends);

