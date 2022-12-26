// 9. default parameters

// ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName;
    nationality === undefined ? nationality = 'American' : nationality;

    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var john = new SmithPerson5('John', 1990); // js is retarded so the compiler allows us to call any function without specifying all of the parameters, the ones which are not specified will be 'undefined'
var emily = new SmithPerson5('Emiliy', 1983, 'Diaz', 'Spanish');

console.log(john);
console.log(emily);


// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var mark = new SmithPerson6('Mark', 1940);
var sue = new SmithPerson6('Sue', 1999, 'Bird', 'Australian');
console.log(mark);
console.log(sue);