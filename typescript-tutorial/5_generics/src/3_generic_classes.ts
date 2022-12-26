// 3. GENERIC CLASSES

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  getItems() {
    return this.data;
  }

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Niko');
textStorage.addItem('Ivan');
textStorage.removeItem('Ivan');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(5);
numberStorage.addItem(10);
numberStorage.removeItem(5);
console.log(numberStorage.getItems());
