/* 
7. bind, call and apply

Special methods of the Function object which allow us to set the 'this' variable manually.
*/

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', ladies and gentlemen! I\'m ' + this.name +  ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');

// by using the call method we can set the this variable of a method -> method borrowing
john.presentation.call(emily, 'friendly', 'afternoon');

// similar to the call method but it receives an array instead
john.presentation.apply(emily, ['friendly', 'afternoon']);

// the bind method doesn't immediatelly call the function but it creates a copy of it to be stored in memory, useful for creating functions with preset arguments - currying function
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormalAfternoon = john.presentation.bind(emily, 'formal', 'afternoon');
emilyFormalAfternoon();