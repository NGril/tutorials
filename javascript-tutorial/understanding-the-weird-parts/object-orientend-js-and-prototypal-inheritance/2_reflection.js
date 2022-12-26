// REFLECTION AND EXTEND
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
john.__proto__ = person;

// REFLECTION EXAMPLE - it's really that simple (the object is looking inside itself, it could also modify itself like this)
for (var prop in john) {
  // with this check we won't go into the prototype, otherwise we would (and we would see the getFullName method)
  if (john.hasOwnProperty(prop)) {
    console.log(prop + ": " + john[prop]);
  }
}
