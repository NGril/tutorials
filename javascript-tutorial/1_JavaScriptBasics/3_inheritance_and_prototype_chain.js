// 3. inheritance and prototype chain
/*
Primitives - numbers, strings, booleans, undefined, null
Everything else in JS is an object (arrays, functions, user objects, dates, wrappers for primitives...)

What is called a Class in other (better) programming languages in JS is called a Constructor.
The parent Constrcutor, or the parent class, of all objects in JS is the Object Constructor.
Every JS object has a prototype property, which makes inheritance possible in JS. 
The prototype property of an object is where we put methods and properties that we want other objects to inherit.
The Constructors prototype property is not the prototype property of the Constructor itself, it's the prototype of all instances that are created through it.
When a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the parent objects prototype. This continues until the method is found: PROTOTYPE CHAIN.
*/ 

var Person = function(name, yearOfBirth, job) { // function constructor
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    // functions can be added directly to the constructor like this, but it's not very efficient to have large functions in the constructor because then they are copied every time a new object is instantiated, a better practice is to put it in the prototype property so that it's instead inherited by all instantiated objects
    this.calculateAgeBad = function() {    
        console.log(new Date().getFullYear() - this.yearOfBirth);   
    }
}

// correct way of attaching functions to Constructors (classes)
Person.prototype.calculateAgeGood = function() {
    console.log(new Date().getFullYear() - this.yearOfBirth);   
}

// instantiation, the new operator creates an empty Object and points the 'this' variable to that empty object so that the constructor function works properly
var john = new Person('John', 1990, 'plumber'); 
var mark = new Person('Mark', 1980, 'mechanic'); 
var luke = new Person('Luke', 1970, 'clown'); 

john.calculateAgeBad();
mark.calculateAgeBad();
luke.calculateAgeBad();

john.calculateAgeGood();
mark.calculateAgeGood();
luke.calculateAgeGood();

//properties can also be added in the prototype, but it's not that common and useful
Person.prototype.lastName = 'Smith';

console.log(john.lastName);
console.log(mark.lastName);
console.log(luke.lastName);

//////////////////////////////////////////////////////////////////////////////////////////////////

// instead of function constructors objects can also be created via the Object.create method, it's not so popular though
var numberProto = {
    add(num1, num2) {
        console.log(num1 + num2);
    }
}

var mathematician = Object.create(numberProto);
mathematician.name = 'Gauss';
mathematician.job = 'Professor';

console.log(mathematician);
mathematician.add(2, 2);