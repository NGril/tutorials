// pretty similar to interface, interfaces are used to explicitly define the structure of an object, also interfaces can be implemented
type GreetType = {
  name: string;
  age: number;

  greet(phrase: string): void;
};

///////////////////////////////////////////////////////////////////////////////////

interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(phrase: string): void {
    console.log(`${this.name} uses this phrase: ${phrase}`);
  }
}

let user1: Greetable;
user1 = new Person("Niko", 30);

user1.greet("Burazzz");
console.log(user1);

/////////////////////////////////////////////////////////////////////////////////////////
// Function types
type AddFnType = (a: number, b: number) => number;

// Interface as function type
interface AddFnInterface {
  (a: number, b: number): number;
}

let add1: AddFnType;
add1 = (n1: number, n2: number) => {
  return n1 + n2;
};

let add2: AddFnInterface;
add2 = (n1: number, n2: number) => {
  return n1 + n2;
};

//////////////////////////////////////////////////////////////////////////////////////////
// Optional parameters & properties

interface Named {
  readonly firstName: string;
  outputName?: string; // Optional property

  printOutputName?(): void; // Optional function
}

class CroName implements Named {    // optional property not set
  firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}

class UsaName implements Named {
  firstName: string;
  outputName?: string;  // optional property

  constructor(firstName: string, outputName?: string) { // optional parameter
    this.firstName = firstName;
    this.outputName = outputName;
  }

  printOutputName() {
      if(this.outputName) {
          console.log(this.outputName);
      }
  }
}

const croName = new CroName('Ivan');

const usaName = new UsaName('Jonathan', 'John');
usaName.printOutputName();