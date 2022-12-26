class Stack {
  constructor() {
    this.array = [];
  }

  peek() {
    // error check
    return this.array[this.array.length - 1];
  }

  push(value) {
    this.array.push(value);
  }

  pop() {
    this.array.pop();
  }

  isEmpty() {
    return this.array.length === 0;
  }
}

const myStack = new Stack();

myStack.push("google");
console.log(myStack);

myStack.push("youtube");
console.log(myStack);

myStack.push("discord");
console.log(myStack);

const res = myStack.peek();
console.log(res);

myStack.pop();
console.log(myStack);

myStack.pop();
console.log(myStack);

const res2 = myStack.peek();
console.log(res2);

myStack.pop();
console.log(myStack);
