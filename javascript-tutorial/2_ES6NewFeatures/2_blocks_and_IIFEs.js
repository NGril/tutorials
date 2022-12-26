// 2. blocks and IIFEs (immediately invodked function expression)

// ES5
(function () {
    var a = 5;
})();
console.log(a); // illegal

// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

console.log(a + b); // illegal
console.log(c); // legal
