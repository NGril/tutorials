// Even though we have no code written, these 2 values exist
// this shows that the global execution context was created and that it automatically created these 2 things for us
console.log(this);
console.log(window);

var a = "Hello world!";

function b() {}

// this shows that variables and functions automatically get attached to the global object (if they're not created within another function)
console.log(a);
console.log(window.a);
