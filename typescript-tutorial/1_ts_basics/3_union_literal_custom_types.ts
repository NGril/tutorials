// UNION TYPES
function combine1(input1: number | string, input2: number | string) {
  let result: number | string;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges1 = combine1(34, 23);
console.log(combinedAges1);

const combinedNames1 = combine1('Niko', 'Ana');
console.log(combinedNames1);

/////////////////////////////////////////////////////////////////////////////////////////////////

// LITERAL TYPES - if we want an exact value to be infered

function combine2(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text') {
  let result: number | string;
  if (resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges2 = combine2(34, 23, 'as-number');
console.log(combinedAges2);

const combinedStringAges2 = combine2('34', '23', 'as-text');
console.log(combinedStringAges2);

// const combinedStringAgesTypo2 = combine2(34, 23, 'as-text-typo'); // compile error

/////////////////////////////////////////////////////////////////////////////////////////////////

// TYPE ALIASES / CUSTOM TYPES
type CombineTextNumber = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine3(input1: CombineTextNumber, input2: CombineTextNumber, resultConversion: ConversionDescriptor) {
  let result: number | string;
  if (resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}