function makeGreeting(language) {
  return function (firstname, lastname) {
    if (language === "en") {
      console.log("Hello " + firstname + " " + lastname);
    }

    if (language === "es") {
      console.log("Hola " + firstname + " " + lastname);
    }
  };
}

var greetEnglish = makeGreeting("en");
var greetSpanish = makeGreeting("es");
// does the second execution of makeGreeting override the reference to the variable object of the first function call?
// what will be the value of language if we now call greetEnglish?
/*
The different makeGreeting calls point to different outer environments because they are called separately, and each time the makeGreeting function
is called a separate execution context is created. That means that this will work as we would expect.
We can take advantage of this to create function factories like this one;
*/

greetEnglish("John", "Doe"); // Hello John Doe
greetSpanish("John", "Doe"); // Hola John Doe
