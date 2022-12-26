// DISCRIMINATED UNIONS

interface Bird {
  type: 'bird'; // discriminated union pattern
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch(animal.type) { // visitor would be even better
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }  
  console.log(`Moving with speed: ${speed}`);
}

moveAnimal({type: 'bird', flyingSpeed: 10});


// TYPE CASTING

// const paragraph = document.querySelector('p');

// const userInputElement = <HTMLInputElement> document.querySelector('#user-input')!;  // 1st casting syntax
const userInputElement = document.querySelector('#user-input')! as HTMLInputElement;  // 2nd casting syntax

// ! is used to tell TS that the expression before won't be null

userInputElement.value = 'Hi there!';