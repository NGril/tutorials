const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const curr = array[j];
      const next = array[j + 1];

      if (curr > next) {
        const temp = next;
        array[j + 1] = curr;
        array[j] = temp;
      }
    }
  }
}

bubbleSort(numbers);
console.log(numbers);
