function greet(name) {
  console.log("Hello " + name);
}

greet("Niko"); // Hello Niko
greet(); // Hello undefined

// logical operators have one neat additional functionalty in that they return the truthy value if they can resolve it
// examples
console.log(undefined || "hello"); // 'hello'
console.log("hello" || undefined); // 'hello'
console.log("hello" || "hi"); // 'hello'
console.log("hi" || "hello"); // 'hi'

undefined && console.log("asd"); // this will not get executed
"hello" && console.log("asd"); // this will print out 'asd'
