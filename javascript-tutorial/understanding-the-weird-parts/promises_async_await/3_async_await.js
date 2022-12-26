// ASYNC AWAIT
// syntactic sugar for .then

const doWork = (res, rej) => {
  setTimeout(() => {
    res("Hello world");
  }, 1000);
};

const doOtherWork = (res, rej) => {
  setTimeout(() => {
    res("How are you?");
  }, 1000);
};

// new 'async' keyword
async function doAllTheWork() {
  const someText = new Promise(doWork);
  const text1 = await someText; // new 'await' keyword, here we are waiting until the someText promise is resolved
  console.log(text1);

  const otherText = new Promise(doOtherWork);
  const text2 = await otherText;
  console.log(text2);
}

// note that this is still an async function that uses promises
// the execution of the program will continue while we are waiting for the promise to be resolved
// that is why the console.log bellow will be run first, while we are still waiting the 1000 ms for the promise to be resolved
doAllTheWork();
console.log("done"); // will be run first
