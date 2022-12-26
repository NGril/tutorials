function greet(firstname, lastname, language) {
  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log("-----------------");
}

greet(); // no error -> all arguments are undefined because of hoisting

greet("John"); // 'John', undefined, undefined
greet("John", "Doe"); // 'John', 'Doe', undefined
greet("John", "Doe", "en"); // 'John', 'Doe', 'en'

// USING DEFAULT PARAMETERS
function greet2(firstname, lastname = "Doe", language) {
  // the old way of setting default parameters (before ES6)
  language = language || "en";

  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log("-----------------");
}

greet2();

// THE ARGUMENTS KEYWORD
function greet3(firstname, lastname, language) {
  if (arguments.length === 0) {
    console.log("Missing parameters");
    console.log("-----------------");
    return;
  }

  console.log(arguments);
  console.log(arguments[0]);

  console.log("-----------------");
}

greet3();
greet3("John", "Doe", "en");
