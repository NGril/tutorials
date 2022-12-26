// person = new Object();
// person.firstname = "Niko";
// person.lastname = "Gril";
// ...

// object literal notation, instead of the above:
var niko = {
  firstname: "Niko",
  lastname: "Gril",
  address: {
    street: "111 Main St.",
    city: "Ney York",
    state: "NY",
  },
};

function greet(person) {
  console.log("HI " + person.firstname);
}

greet(niko);

greet({
  firstname: "Jane",
  lastname: "Doe",
});
