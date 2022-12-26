var person = new Object();

// [] is actually an operator (computed member access operator)
person["firstname"] = "Niko";
person["lastname"] = "Gril";
var firstNameProperty = "firstname";
console.log(person);
console.log(person[firstNameProperty]);

// the dot operator - preferred to the []
console.log(person.lastname);

person.address = new Object();

// you can see the left to right associativity here
person.address.street = "111 Main St.";
person.address.city = "Ney York";
person.address.state = "NY";

console.log(person.address.street);
console.log(person["address"]["city"]);
// we can combine both
console.log(person.address["state"]);
