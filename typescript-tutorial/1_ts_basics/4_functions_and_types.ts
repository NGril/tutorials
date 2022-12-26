// FUNCTION RETURN TYPES & VOID
// infered return type
function add1(n1: number, n2: number) {
  return n1 + n2;                 
}

// infered return type
function add2(n1: number, n2: number) {
  return n1.toString() + n2.toString(); 
}

// explicit return type, good practice is to let TS infer the type if it can, if it can't only then you should explicitly write it
function add3(n1: number, n2: number) : number {
  return n1 + n2;                 
}

// void return type is also infered
function printResult(num: number) {
  console.log(`Result: ${num}`);               
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTIONS AS TYPES
let combineValues3: (a: number, b: number) => number; // function type - a function that takes 2 number params and returns a number
combineValues3 = add;
// combineValues3 = printResult; // compilation error, yaay
console.log(combineValues3(8, 8));

/////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION TYPES & CALLBACKS
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}
addAndHandle(10, 20, result => console.log(result));
addAndHandle(2, 3, result => {
  return 2 + 3; // this compiles by design, void return type in the function declaration just means we won't do anything with the returned value of the callback, shitty imo
});
