// 2. GENERIC FUNCTIONS

// return type not specified because TS automatically infers it to T & U
function merge1<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj1 = merge1({ name: 'Niko', hobbies: ['Sports'] }, { age: 24 });
console.log(mergedObj1.age);



// type constraints
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// const mergedObj2 = merge2({ name: 'Niko', hobbies: ['Sports'] }, 24); // compile error now, we have to pass an argument that extends object



// another example
interface Lenghty {
  length: number;
}

function countAndDescribe<T extends Lenghty>(element: T) : [T, string] {
  let descriptionText = 'Got no value.';
  if(element.length === 1) {
    descriptionText = `Got 1 element.`
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['sports', 'cooking']));
// console.log(countAndDescribe(10)); // compile error, noice



// keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({ name: 'Niko' }, 'name'));
// console.log(extractAndConvert({ name: 'Niko' }, 'age'));  // compile error