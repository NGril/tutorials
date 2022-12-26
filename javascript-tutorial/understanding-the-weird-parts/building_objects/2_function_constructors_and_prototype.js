// FUNCTION CONSTRUCTORS AND SETTING THE PROTOTYPE
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype.getFullName = function () {
  return this.firstname + " " + this.lastname;
};

var john = new Person("John", "Doe");
console.log(john);

var jane = new Person("Jane", "Smith");
console.log(jane);

Person.prototype.getFormalFullName = function () {
  return this.lastname + ", " + this.firstname;
};

console.log(john.getFormalFullName());

/*
- we usually set properties directly within the function constructor, and methods through the prototype
- this is because functions take up memory space, and if we put them within the function constructor that would mean that every new object created
with the new keyword would get a new copy of the function
- if we created a 1000 new objects, there would be a 1000 new functions which take up memory space
- by doing it through the prototype property they all point to the same function 
*/
