class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return this;
    }

    let currentNode = this.root;

    while (true) {
      if (node.value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = node;
          return this;
        }

        currentNode = currentNode.right;
        continue;
      }

      if (node.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = node;
          return this;
        }

        currentNode = currentNode.left;
        continue;
      }
    }
  }

  lookup(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return currentNode;
  }

  // see https://visualgo.net/en/bst to understand and test logic
  remove(value) {
    const { currNode, prevNode } = this.findCurrAndPrevNode(value);

    // Option 1 - no right child
    if (!currNode.right) {
      // curr node is the root
      if (prevNode === null) {
        this.root = currNode.left;
      } else {
        this.isRightChild(prevNode, currNode) ? (prevNode.right = currNode.left) : (prevNode.left = currNode.left);
      }
    }
    // Option 2 - has right child that has no left child
    else if (!currNode.right.left) {
      if (prevNode === null) {
        this.root = currNode.left;
      } else {
        currNode.right.left = currNode.left;
        this.isRightChild(prevNode, currNode) ? (prevNode.right = currNode.right) : (prevNode.left = currNode.right);
      }
    }
    // Option 3 - has right child that has left child
    else {
      // find the right child's left most child
      let leftmost = currNode.right.left;
      let leftmostParent = currNode.right;
      while (leftmost.left) {
        leftmostParent = leftmost;
        leftmost = leftmost.left;
      }

      // parent's left subtree is now leftmost's right subtree and the leftmost node takes the place of the node that is deleted
      leftmostParent.left = leftmost.right;
      leftmost.left = currNode.left;
      leftmost.right = currNode.right;

      if (prevNode === null) {
        this.root = leftmost;
      } else {
        this.isRightChild(prevNode, currNode) ? (prevNode.right = leftmost) : (prevNode.left = leftmost);
      }
    }

    return this;
  }

  findCurrAndPrevNode(value) {
    if (!this.root) {
      return;
    }

    let prevNode = null;
    let currNode = this.root;

    while (true) {
      if (value === currNode.value) {
        break;
      } else if (value < currNode.value) {
        prevNode = currNode;
        currNode = currNode.left;
      } else {
        prevNode = currNode;
        currNode = currNode.right;
      }
    }

    return { currNode, prevNode };
  }

  isRightChild(parent, child) {
    return child.value > parent.value;
  }

  // -------------- BFS ---------------------------
  breadthFirstSearch() {
    let currentNode = this.root;
    let result = [];
    let queue = [];

    queue.push(currentNode);

    while (queue.length > 0) {
      currentNode = queue.shift();
      result.push(currentNode.value);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  breadthFirstSearchRecusrive(queue, list) {
    if (!queue.length) {
      return list;
    }

    let currentNode = queue.shift();
    list.push(currentNode.value);

    if (currentNode.left) {
      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    return this.breadthFirstSearchRecusrive(queue, list);
  }

  // -------------- DFS ---------------------------
  dfsInOrder() {
    return traverseInOrder(this.root, []);
  }

  dfsPostOrder() {
    return traversePostOrder(this.root, []);
  }

  dfsPreOrder() {
    return traversePreOrder(this.root, []);
  }

  validate() {
    return validateBST(this.root);
  }
}

function traverseInOrder(node, list) {
  if (node.left) {
    traverseInOrder(node.left, list);
  }

  list.push(node.value);

  if (node.right) {
    traverseInOrder(node.right, list);
  }

  return list;
}

function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }

  if (node.right) {
    traversePostOrder(node.right, list);
  }

  list.push(node.value);

  return list;
}

function traversePreOrder(node, list) {
  list.push(node.value);

  if (node.left) {
    traversePreOrder(node.left, list);
  }

  if (node.right) {
    traversePreOrder(node.right, list);
  }

  return list;
}

// https://leetcode.com/problems/validate-binary-search-tree/
function validateBST(root) {
  const queue = [root];
  let currentNode;

  while (queue.length > 0) {
    currentNode = queue.shift();

    if (currentNode.left) {
      if (currentNode.left.value >= currentNode.value) {
        return false;
      }

      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      if (currentNode.right.value <= currentNode.value) {
        return false;
      }

      queue.push(currentNode.right);
    }
  }

  return true;
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

/*
//        9
//   4       20
// 1   6  15    170
*/

console.log("BFS", tree.breadthFirstSearch());
console.log("BFS recursive", tree.breadthFirstSearchRecusrive([tree.root], []));

console.log("DFS in order", tree.dfsInOrder());
console.log("DFS post order", tree.dfsPostOrder());
console.log("DFS pre order", tree.dfsPreOrder());

console.log("validate bst", tree.validate());

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}

console.log(JSON.stringify(traverse(tree.root)));

console.log(tree.lookup(20));
console.log(tree.lookup(9));
console.log(tree.lookup(170));

console.log(tree.findCurrAndPrevNode(20));

tree.remove(170);
console.log(JSON.stringify(traverse(tree.root)));
