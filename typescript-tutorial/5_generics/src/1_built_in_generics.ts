// 1. BUILT IN GENERICS

const strArr: Array<string> = []; // same type as string[]
// autocomplete available for string methods now

// by adding a promise type we get more type safety
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved');
  }, 2000),
  () => {
    reject('Rejected');
  }
});

promise.then(data => {
  console.log(data);
});

