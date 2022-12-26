// BASIC TYPES - number, string, boolean
function add(n1: number, n2: number) {
  return n1 + n2;
}

const nubmer1 = 5; 
const nubmer2 = 2.8;

const result = add(nubmer1, nubmer2); // we can now only use numbers in this function
console.log(result);

const num = 5; // type inference, TS knows this is a number
const num2: number = 5; // reduntant
let num3: number; // good practice if we don't initialize the variable right away

