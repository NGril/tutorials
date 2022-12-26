// Reverse a (singly) linked list - using code from src/3_data_structures/linked-lists/1_creating_a_linked_list.js

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value);

    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const node = new Node(value);

    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  prepend(value) {
    const node = new Node(value);

    node.next = this.head;
    this.head = node;
    this.length++;
  }

  insert(index, value) {
    if (index === 0) {
      return this.prepend(value);
    }

    if (index >= this.length) {
      return this.append(value);
    }

    const currNode = this.getNodeAtIndex(index);
    const nextNode = currNode.next;
    const newNode = new Node(value);

    newNode.next = nextNode;
    currNode.next = newNode;
    this.length++;
  }

  remove(index) {
    const nodeToDelete = this.getNodeAtIndex(index);

    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      return nodeToDelete;
    }

    const prevNode = this.getNodeAtIndex(index - 1);
    prevNode.next = nodeToDelete.next;
    this.length--;
    return nodeToDelete;
  }

  getNodeAtIndex(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    let i = 0;
    let currEl = this.head;
    while (i !== index) {
      currEl = currEl.next;
      i++;
    }

    return currEl;
  }

  printList() {
    const arr = [];
    let currNode = this.head;

    while (currNode !== null) {
      arr.push(currNode.value);
      currNode = currNode.next;
    }

    console.log(arr);
  }

  // SOLUTION HERE
  // basically iterate over current and next and just change pointer
  // at the end switch head and tail
  reverse() {
    if (!this.length === 1) {
      return this;
    }

    // start from the first 2 elements
    let currNode = this.head;
    let nextNode = currNode.next;

    while (nextNode) {
      // temp is the 3rd element
      const temp = nextNode.next;

      // 2nd element points to first
      nextNode.next = currNode;

      // current node becomes the 2nd node
      currNode = nextNode;

      // next becomes the 3rd node
      nextNode = temp;
    }

    // tail becomes the head
    this.tail = this.head;
    // since head is now the tail it's the last node and it points to null
    this.tail.next = null;
    // the current node becomes the head because it's now the first node
    this.head = currNode;
  }
}

const myLinkedList = new LinkedList(10);

myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.printList();

myLinkedList.prepend(18);
myLinkedList.printList();

myLinkedList.insert(2, 99);
myLinkedList.insert(0, 99);
myLinkedList.insert(myLinkedList.length - 1, 99);
myLinkedList.printList();

myLinkedList.remove(0);
myLinkedList.remove(3);
myLinkedList.remove(myLinkedList.length - 1);
myLinkedList.printList();

myLinkedList.reverse();
myLinkedList.printList();
