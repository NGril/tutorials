// 1. first class decorator

// convention is to use decorator functions with upper case
// depending on where it is used decorators receive appropriate arguments
// for class decorators we need target (in this case called constructor)
// decorators execute during the definition of the class / constructor function, not during instantiation!
function Logger1(constructor: Function) { 
  console.log('Logging 1...');
  console.log(constructor);
}

// another way of creating decorators is using decorator factories which let us define the parameters when we use the decorator
function Logger2(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
} 

// @Logger1
@Logger2('Logging 2...')
class Person1 {
  name = 'Niko';

  constructor() {
    console.log('Person constructor executed.');
  }
}

const person1 = new Person1();
console.log(person1);