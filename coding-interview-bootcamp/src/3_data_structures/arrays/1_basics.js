const strings = ["a", "b", "c", "d"];

// push (add one item to the end)- O(1) - just add at the end
strings.push("e");
console.log(strings);

// pop (remove 1 item from the end) - O(1) - just remove from the end
strings.pop();
console.log(strings);

// unshift (add to the begining) - O(n) - move all values by 1 index to the right
strings.unshift("x");
console.log(strings);

// shift (remove from begining) - O(n) - move all values by 1 index to the left
strings.shift();
console.log(strings);

// splice (insert or remove from index) - O(n) - move all values by 1 index
strings.splice(2, 0, "alien");
console.log(strings);
