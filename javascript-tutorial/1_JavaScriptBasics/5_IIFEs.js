// 5. IIFEs - Immediately invoked function expressions

// used to achieve data privacy - JS evaluates this as an expression because it's inside parentheses and that's why we can't access the variables inside

(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

// console.log(score); // illegal

// with params
(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(4);