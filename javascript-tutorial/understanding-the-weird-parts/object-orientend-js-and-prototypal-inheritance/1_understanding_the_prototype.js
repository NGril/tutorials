// UNDERSTANDING THE PROTOTYPE
var person = {
  firstname: "Default",
  lastname: "Default",
  getFullName: function () {
    return this.firstname + " " + this.lastname;
  },
};

var john = {
  firstname: "John",
  lastname: "Doe",
};

// DON'T DO THIS EVER! for demo only
// prototype chain
john.__proto__ = person; // we can now access the getFullName function through the prototype
console.log(john.getFullName()); // John Doe
console.log(john.firstname); // John
console.log(john.__proto__.firstname); // Default

var jane = {
  firstname: "Jane",
};
jane.__proto__ = person;
console.log(jane.getFullName()); // Jane Default
