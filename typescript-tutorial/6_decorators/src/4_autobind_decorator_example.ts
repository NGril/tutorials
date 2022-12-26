// 4. AUTOBIND DECORATOR EXAMPLE
/*
Example of a method decorator which returns a value
*/

function Autobind(
  _target: any, // ignoring these 2 params with _
  _methodName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this); // 'this' here refers to whatever is responsible for triggering this getter method, meaning that it refers to any object calling this method
        return boundFn;
      }
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();


const button = document.querySelector("button")!;

// BEFORE ADDING DECORATOR
// p.showMessage(); // here it works normally
// button.addEventListener("click", p.showMessage); // here, where we point to the function, it doesn't work correctly because the 'this' variable is not defined because 'this' is defined only when the function is called meaning that 'this' will target the target of the event
// button.addEventListener("click", p.showMessage.bind(p)); // the solution would be to bind the this variable to the p object like this

// AFTER ADDING DECORATOR
button.addEventListener("click", p.showMessage); // after adding decorator is autobound