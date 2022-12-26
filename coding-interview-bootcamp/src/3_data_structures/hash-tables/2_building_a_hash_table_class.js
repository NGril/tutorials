class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  // dealing with collisions
  set(key, value) {
    const address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
  }

  get(key) {
    const address = this._hash(key);
    const currentBucket = this.data[address];

    if (!currentBucket) {
      return;
    }

    for (let i = 0; i < currentBucket.length; i++) {
      if (currentBucket[i][0] === key) {
        return currentBucket[i][1];
      }
    }
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0][0]);
      }
    }
    return keysArray;
  }
}

const myHashTable = new HashTable(50);

myHashTable.set("grapes", 10000);
myHashTable.set("oranges", 50);
myHashTable.set("apples", 5);

const grapes = myHashTable.get("grapes");
console.log(grapes);

const keys = myHashTable.keys();
console.log(keys);
