// EXAMPLE 1
// here 'this' points to the global object - window
console.log(this);

// EXAMPLE 2
// 'this' gets initialized only when we invoke a function
// when invoking both of these functions 'this' points to the global object
function a() {
  console.log(this); // global object - window
  this.newVariable = "hello";
}
a();
console.log(newVariable); // hello - new variable is attached to the window object, this is the same as window.newVariable

var b = function () {
  console.log(this); // global object - window
};
b();

// EXAMPLE 3
// when used within object methods 'this' points to the parent object
// using the 'this' keyword we can access and mutate the properties and methods of an object (if used within its method)
var c = {
  name: "The c object",
  log: function () {
    this.name = "Updated c object";
    console.log(this); // points to the c object
  },
};
c.log();

// EXAMPLE 4
// using 'this' within inner functions of methods
var d = {
  name: "The d object",
  log: function () {
    this.name = "Updated d object";
    console.log(this); // points to the d object

    var setName = function (newName) {
      this.name = newName; // here this points to the global object again, so here we actually updated the window object
    };

    setName("Updated again! The d object");
    console.log(this); // points to the d object
  },
};
d.log(); // here we'll see that the inner functions 'this' points to the global object, since the name hasn't been updated (again)
console.log(window.name); // we'll see that the name updated within the setName function is actually updated here, on the global object

// EXAMPLE 4.1
// common pattern to circumvent the behavior of 'this' within inner functions - using 'self'
var d1 = {
  name: "The d1 object",
  log: function () {
    var self = this; // self now points to the 'this' keyword (equality by reference, it's the same object in memory)

    self.name = "Updated d1 object";
    console.log(self);

    var setName = function (newName) {
      self.name = newName; // here we can access self (lexical scope)
    };

    setName("Updated again! The d1 object");
    console.log(self);
  },
};
d1.log(); // now we see that the d1.name has been successfully updated as we would expect
