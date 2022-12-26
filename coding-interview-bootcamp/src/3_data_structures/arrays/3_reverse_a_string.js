/* eslint-disable */
// Create a function that reverses a string
// 'Hi my name is Andrei' should become 'ierdnA si eman ym iH'

function reverse(str) {
  if (typeof str !== "string") {
    throw new Error("Invalid input");
  }

  return [...str].reverse().join("");
}

function reverse2(str) {
  if (typeof str !== "string") {
    throw new Error("Invalid input");
  }

  const reversed = [];
  for (let i = str.length - 1; i >= 0; i--) {
    reversed.push(str[i]);
  }

  return reversed.join("");
}

console.log(reverse("Hi my name is Niko"));
console.log(reverse2("Hi my name is Niko"));
console.log(reverse(123));
console.log(reverse2(123));
