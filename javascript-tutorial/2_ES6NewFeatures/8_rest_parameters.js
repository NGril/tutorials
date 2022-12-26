// 8. Rest parameters

// Rest parameters 
// allow us to pass an arbitrary number of parameters into a function
// similar syntax to spread parameter but it does the opposite, transforms all function arguments into an array

// ES5
function isFullAge5() {
    console.log(arguments); // arguments is an array-like function
    var argsArr = Array.prototype.slice.call(arguments); // transform arguments to an array

    argsArr.forEach(function (cur) {
        console.log((new Date().getFullYear() - cur) >= 18);
    })
}

isFullAge5(1990, 2004, 1965);


// ES6
function isFullAge6(...years) { // as soon as we call the function it tranforms the args into an array
    console.log(years);
    years.forEach(cur => console.log((2016 - cur) >= 18));
}

isFullAge6(1990, 2004, 1965);


///////////////////////////////////// example 2 /////////////////////////////////////////


// ES5
function isFullAge5(limit) {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1); // if we need some argument in order for it not to be a part of argsArr we use the argument of slice method which indicates from where does the slicing start (index 1 in this case)
    console.log(argsArr);

    argsArr.forEach(function (cur) {
        console.log((new Date().getFullYear() - cur) >= limit);
    })
}

isFullAge5(21, 1990, 2004, 1965);


// ES6
function isFullAge6(limit, ...years) { // easy peasy
    console.log(years);
    years.forEach(cur => console.log((2016 - cur) >= limit));
}

isFullAge6(16, 1990, 2004, 1965);