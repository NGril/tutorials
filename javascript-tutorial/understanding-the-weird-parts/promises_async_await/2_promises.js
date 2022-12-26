// USING PROMISES

const doWork = (res, rej) => {
  setTimeout(() => {
    res("Hello world");
  }, 1000);
};

const doOtherWork = (res, rej) => {
  setTimeout(() => {
    res("How are you?");
  }, 3000);
};

let someText = new Promise(doWork);

// one handler is attached to the original promise, and another to the result of that promise - we can chain .then methods
// when the .then handler returns a value it's wrapped in a promise so that we can chain the next .then
// we can even return a new promise directly - in this case the next .then() will be run only when the returned promise resolves
someText
  .then((val) => {
    console.log("1st log: " + val);
    return new Promise(doOtherWork);
  })
  .then((val) => {
    console.log(val);
  });

// EXAMPLE WHEN CALLING AN API (.fetch)
// the fetch API isn't a part of the JS specification, it's its own specification
// it's used within the JS engine, but it's implemented by the environments within the JS engine is used (such as the browser)
// it goes out to some API and returns some value
fetch("video.json")
  .then((response) => response.json()) // .json() parses the JSON string into an object, returns a promise
  .then((data) => console.log(data));
