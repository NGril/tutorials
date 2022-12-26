// TYPE GUARDS
type Combineable = string | number;

function add(a: Combineable, b: Combineable) {
  if(typeof a === 'string' || typeof b === 'string') {  // this if check is a type guard
    return a.toString() + b.toString();
  }
  return a + b;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

type Admin1 = {
  name: string;
  privileges: string[];
};

type Employee1 = {
  name: string;
  startDate: Date;
};

type UnknownEmployee = Admin1 | Employee1;

const emp1: Employee1 = {
  name: 'Duderoni',
  startDate: new Date()
};

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  
  if('privileges' in emp) {   // another guard
    console.log(`Privileges: ${emp.privileges}`);
  } else if ('startDate' in emp) {
    console.log(`Start date: ${emp.startDate}`);
  }
}

printEmployeeInformation(emp1);

//////////////////////////////////////////////////////////////////////////////////////////////////

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  
  loadCargo(amount: number) {
    console.log(`Loading cargo... ${amount}`);
  }
}

type Veichle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVeichle(veichle: Veichle) {
  veichle.drive();
  if(veichle instanceof Truck) {
    veichle.loadCargo(10);
  } 
}

useVeichle(v1);
useVeichle(v2);