// 10. maps
// new data structure in ES6

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
console.log(question.size);

if(question.has(4)) {
    // question.delete(4);
    console.log('Answer 4 is here');
}

// question.clear();

question.forEach((value, key) => console.log(`This is ${key} and it's set to ${value}`));

///Quiz
console.log(question.get('question'));

for (const [key, value] of question.entries()) { // destructuring is noice
    if(typeof(key) === 'number') {
        console.log(`${key} - ${value}`);
    }
}

const answer = parseInt(prompt('Write the correct answer'));

console.log(question.get(answer === question.get('correct'))); // cool line of code