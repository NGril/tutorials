// 4. Primitives vs Objects

// deep vs shallow copy problem (primitive creates a new physical copy in memory, object creates a reference to the original)

// primitives
var a = 23;
var b = a;
a = 46;
console.log(a); // 46
console.log(b); // 23

// objects
var obj1 = {
    name: 'John',
    age: 25
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age); // 30
console.log(obj2.age); // 30

// functions
var age = 27;
var obj = {
    name: 'Luke',
    city: 'New York'
}
function change(a, b) {
    a = 30;
    b.city = 'Chicago';
}

change(age, obj);
console.log(age);   // 27
console.log(obj.city);  // Chicago

