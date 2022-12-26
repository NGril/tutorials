// reverse a string using recursion

function reverse(str) {
  // base case
  if (str === "") {
    return str;
  }

  // recursive case
  return reverse(str.substring(1)) + str[0];
}

console.log("reverse", reverse("fizz buzz fizzbuzz"));
