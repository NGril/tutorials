class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// TOP IS THE HEAD OF THE LIST, BOTTOM IS THE TAIL
class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    const node = new Node(value);

    if (this.isEmpty()) {
      this.bottom = node;
      this.top = node;
    } else {
      const holdingPointer = this.top;
      this.top = node;
      this.top.next = holdingPointer;
    }

    this.length++;
  }

  pop() {
    if (!this.top) {
      return null;
    }

    if (this.top === this.bottom) {
      this.bottom = null;
    }

    const nodeToPop = this.top;
    this.top = this.top.next;

    this.length--;
    return nodeToPop;
  }

  isEmpty() {
    return this.length === 0;
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
