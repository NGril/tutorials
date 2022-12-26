// 6. closures

// an inner function always has access to the arguments and parameters of the outer function, even after the outer function has stopped executing (after it returns) - the variable object stays in memory
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = new Date().getFullYear() - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

retirement(70)(1990);   // wow

