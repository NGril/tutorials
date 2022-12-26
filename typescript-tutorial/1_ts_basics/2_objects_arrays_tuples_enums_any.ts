// OBJECTS
const obj1 = {
  name: 'Niko',
  age: 24
};

const obj2: object = {
  name: 'Niko',
  age: 24
}

// we can explicitly list the needed types like this, but TS does this automatically (type inference), best practice is person1
const obj3: {
  name: string;
  age: number;
} = {
  name: 'Niko',
  age: 24
};

// console.log(person1.nickname); // TS throws compilation error, a bit less shit than JS
// console.log(person2.nickname); // also compilation error here, noice

////////////////////////////////////////////////////////////////////////////////////////////////

// ARRAYS - type inference works the same
let arr1: string[];
arr1 = ["hiking"];

const arr2 = ['Sports', 'Cooking'];
for (const value of arr2) {
  console.log(value);
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// TUPLES - fixed length and fixed type arrays

const tuple1 = [2, 'author']; 
// if we don't want something like this to be compiled we can use tuples
tuple1.push('admin');
tuple1[1] = 10;


let tuple2: [number, string];
tuple2 = [4, 'illustrator'];
tuple2.push('admin');  // unfortunately no compile error
// role2[1] = 10;  //  compile error

/////////////////////////////////////////////////////////////////////////////////////////////////

// ENUM
enum Enum1 { ADMIN, READ_ONLY, AUTHOR };

const person11 = {
  name: 'Niko',
  age: 24,
  hobbies: ['Sports', 'Cooking'],
  role: Enum1.ADMIN
};

enum Enum2 { ADMIN = 'abc', READ_ONLY = 6, AUTHOR }; // if we don't want to have default value of first element as 0

/////////////////////////////////////////////////////////////////////////////////////////////////

// ANY

// you can pass anything in the variable, same as JS, avoid when possible