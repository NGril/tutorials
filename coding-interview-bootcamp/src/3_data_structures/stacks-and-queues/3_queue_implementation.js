class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// FIRST IS THE HEAD, LAST IS THE TAIL OF THE LIST
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const node = new Node(value);

    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }

    this.length++;
  }

  dequeue() {
    if (!this.first) {
      return null;
    }

    if (this.first === this.last) {
      this.last = null;
    }

    const nodeToRemove = this.first;
    this.first = this.first.next;

    this.length--;
    return nodeToRemove;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const myQueue = new Queue();
console.log(myQueue);

myQueue.enqueue("Joy");
console.log(myQueue);

myQueue.enqueue("Matt");
console.log(myQueue);

myQueue.enqueue("Pavel");
myQueue.enqueue("Samir");
console.log(myQueue);

const res1 = myQueue.peek();
console.log(res1);

myQueue.dequeue();
myQueue.dequeue();
console.log(myQueue);

myQueue.dequeue();
myQueue.dequeue();
console.log(myQueue);
