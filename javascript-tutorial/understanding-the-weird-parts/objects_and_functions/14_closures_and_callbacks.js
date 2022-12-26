function sayHiLater() {
  var greeting = "Hi";

  setTimeout(function () {
    console.log(greeting);
  }, 3000);
}

sayHiLater();

// this works the exact same way (closures)

// jQuery also uses function expressions and first-class functions
// $("button").click(function () {});

// CALLBACK EXAMPLE
function tellMeWhenDone(callback) {
  var a = 1000; // some work
  var b = 2000; // some work

  callback(); // the 'callback', it runs the function I give it
}

tellMeWhenDone(function () {
  alert("I am done");
});
