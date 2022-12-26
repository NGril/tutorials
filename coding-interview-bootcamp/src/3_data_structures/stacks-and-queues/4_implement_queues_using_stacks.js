// common interview question
// https://leetcode.com/problems/implement-queue-using-stacks/description/

class MyQueue {
  constructor() {
    this.ordered = [];
    this.reversed = [];
  }

  // push to the back of the queue
  push(value) {
    const length = this.reversed.length;
    // empty the reversed stack and fill the ordered stack with with all values + the last added one
    for (let i = 0; i < length; i++) {
      this.ordered.push(this.reversed.pop());
    }
    this.ordered.push(value);
  }

  // remove from beginning
  pop() {
    const length = this.ordered.length;
    // empty the ordered stack and fill the reversed stack, than pop one value from the end
    for (let i = 0; i < length; i++) {
      this.reversed.push(this.ordered.pop());
    }
    return this.reversed.pop();
  }

  peek() {
    return this.ordered?.[0] ?? this.reversed?.[this.reversed.length - 1] ?? null;
  }

  empty() {
    return this.ordered.length === 0 && this.reversed.length === 0;
  }
}

const queue = new MyQueue();

queue.push(1);
console.log(queue);
queue.push(2);
queue.push(3);
console.log(queue);

const res = queue.peek();
console.log(res);

queue.pop();
console.log(queue);
queue.pop();
queue.pop();
console.log(queue);

const isEmpty = queue.empty();
console.log(isEmpty);
