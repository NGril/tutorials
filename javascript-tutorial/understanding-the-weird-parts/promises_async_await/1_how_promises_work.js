// THIS CODE IS JUST SO WE CAN UNDERSTAND PROMISES MORE EASILY

// PROMISE STATES
const PENDING = 0; // waiting for execution
const FULFILLED = 1; // executed and a value is returned
const REJECTED = 2; // executed and an error is thrown

// PROMISE OBJECT WHICH TAKES AN EXECUTOR FUNCTION AS A PARAMETER
function CustomPromise(executor) {
  let state = PENDING; // initial state before execution
  let value = null; // initial value before the promise is executed
  let handlers = []; // we can have multiple handler functions (for each .then() we add)
  let catches = []; // we can have multiple error handling functions (for each .catch() we add)

  // we'll pass the resolve and reject functions to the executor

  // if state is PENDING fulfill the promise and execute all handler functions
  function resolve(result) {
    if (state !== PENDING) return;

    state = FULFILLED;
    value = result;

    handlers.forEach((h) => h(value));
  }

  // of state is PENDING reject the promise and execute all catch functions
  function reject(err) {
    if (state !== PENDING) return;

    state = REJECTED;
    value = err;

    catches.forEach((c) => c(value));
  }

  // the .then method either immediatelly calls the callback function passed to it (if promise is already fulfilled) or adds the function to the array of handlers
  // we could've added some error handling here as well
  this.then = function (callback) {
    if (state === FULFILLED) {
      callback(value);
    } else {
      handlers.push(callback);
    }

    // the real .then method returns a Promise - because if the callback is also asynchronous we could chain .then methods
  };

  executor(resolve, reject);
}

// executor function
const doWork = (res, rej) => {
  setTimeout(() => {
    res("Hello world");
  }, 1000);
};

// imagine that this promise is returned from some function
let someText = new CustomPromise(doWork);

// we can add multiple .then handlers
someText.then((val) => {
  console.log("1st log: " + val);
});

someText.then((val) => {
  console.log("2nd log: " + val);
});

setTimeout(() => {
  // here we can see that the .then will be invoked immediatelly if the promise is FULFILLED already
  someText.then((val) => {
    console.log("3rd log: " + val);
  });
}, 3000);
