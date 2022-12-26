console.log(1 < 2 < 3); // true
console.log(3 < 2 < 1); // true - because of type coerction (false < 1) => (0 < 1)

console.log(Number(undefined)); // coerced to NaN
console.log(Number(null)); // coerced to 0

console.log(false == 0); // true - because of coercion of false to 0
console.log(null == 0); // false - even though we saw that null gets coerced to 0, it doesn't do so when using comparison operators - LOL

console.log(false === 0); // false - strict comparison (no coercion)
console.log(1 === "1"); // false - strict comparison (no coercion)

// same thing applies to 'not equals'
console.log(false != 0);
console.log(false !== 0);
