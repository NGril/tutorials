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
}

const myLinkedList = new LinkedList(10);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend(18);
myLinkedList.insert(2, 99);
myLinkedList.insert(0, 99);
myLinkedList.insert(myLinkedList.length - 1, 99);
myLinkedList.remove(0);
myLinkedList.remove(3);
myLinkedList.remove(myLinkedList.length - 1);

myLinkedList.printList();
