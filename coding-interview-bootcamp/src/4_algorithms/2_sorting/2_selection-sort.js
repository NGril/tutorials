const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let smallestValue = array[i];
    let smallestIndex = i;

    for (let j = i; j < array.length; j++) {
      if (array[j] < smallestValue) {
        smallestValue = array[j];
        smallestIndex = j;
      }
    }

    const temp = array[i];
    array[i] = smallestValue;
    array[smallestIndex] = temp;
  }
}

selectionSort(numbers);
console.log(numbers);
