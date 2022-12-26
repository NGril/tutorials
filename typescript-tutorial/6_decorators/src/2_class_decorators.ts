// 2. USEFUL DECORATOR EXAMPLES

// very nice, we specify the HTML in the decorator and it's automatically rendered, we can also used object fields to be displayed
// Angular does something like this behind the scenes

function WithTemplate1(template: string, hookId: string) {
  console.log("Decorator 1 created");
  return function (_: Function) {
    // to tell TS that even though we get an argument we don't need it we can use the _ syntax
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
    console.log("Decorator 1");
  };
}

// not very clean, but for the purposes of the demo
function WithTemplate2(template: string, hookId: string) {
  console.log("Decorator 2 created");
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const person = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = person.name;
    }
    console.log("Decorator 2");
  };
}

// example of a decorator returning a value and changing the original class (it returns a constructor function, which is basically a class)
// this decorator will execute during class definition, but it won't actually render anything to the screen until we instantiate a class object
// it will return the value during every class instantiation, this is because we replaced the original class constructor with a new one (which kept the original functionalities and added new ones on top of it in this case)
function WithTemplate3(template: string, hookId: string) {
  console.log("Decorator 3 created");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) { // we know we don't need args inside the function
        super();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
        console.log("Decorator 3 constructor")
      }
    };
  };
}

// we can also use multiple decorators simultaniously, they are executed from bottom to top, their creation is however executed from top to bottom
@WithTemplate1("<h1> My person object 1 </h1>", "app")
@WithTemplate2("<h1> placeholder 2 </h1>", "app")
@WithTemplate3("<h1> placeholder 3 </h1>", "app")
class Person2 {
  name = "Niko";

  constructor() {
    console.log("Person constructor executed.");
  }
}

const person2 = new Person2();
console.log(person2);
