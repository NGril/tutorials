// OTHER DECORATOR TYPES
/*
Property decorator args:
    - target -> prototype of the property, if it's static than it's the constructor function
    - property name -> string or a symbol
*/

/*
Accessor decorator args:
    - target -> prototype of the property, if it's static than it's the constructor function
    - accessor name -> string or a symbol
    - property descriptor -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

    - this decorator can also have a return value, same as the class decorator
    - it returns a brand new property descriptor
*/

/*
Method decorator args:
    - target -> prototype of the property, if it's static than it's the constructor function
    - method name -> string or a symbol
    - property descriptor -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

    - this decorator can also have a return value, same as the class decorator
    - it returns a brand new property descriptor
*/

/*
Parameter decorator args:
    - target -> prototype of the property, if it's static than it's the constructor function
    - name -> string or a symbol - METHOD name, not the param name
    - position -> number of the argument (in order, starting from 0)
*/

// decorators are executed during the definition of a class, not during instantiation!

function LogProperty(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target);
  console.log(propertyName);
}

function LogAccessor(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function LogMethod(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @LogProperty
  title: string;
  private price: number;

  @LogAccessor
  set setPrice(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error("Invalid price - should be more than 0");
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    return this.price * (1 + tax);
  }
}
