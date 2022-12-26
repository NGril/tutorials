// CLASSES
class Department {
  private readonly id: number; // TS adds private and public modifier, default is public, also readonly is something like final in Java
  private name: string; // in TS we specify the fields here, wanna be like Java
  protected employees: string[] = []; // also added protected modifier
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  describe() {  // we can add a dummy param 'this: Department' to improve type safety
    console.log(`Department ${this.id}: ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

}

// shorcut syntax for classes so we don't specify fields from the constructor at the top and then initialize them in constructor:
/*
class ShortcutClass {
  constructor(private readonly id: number, private name: string) { }
}
const a = new ShortcutClass(1, 'shortcut class');
console.log(a);
*/

// INHERITANCE
class ITDepartment extends Department {
  admins: string[];
  constructor(id: number, admins: string[]) {
    super(id, 'ITDepartment');  // super needs to be called first
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: number, private reports: string[]) {
    super(id, 'Accounting Department');  // super needs to be called first
    this.lastReport = reports[0];
  }

  get mostRecentReport() {  // getter method syntax
      return this.lastReport;
  }

  set mostRecentReport(value: string) { // setter method
    this.addReport(value);
  }

  addEmployee(name: string) { // overriding base class methods works
    if(name === 'Niko') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  readReports() {
    console.log(this.reports);
  }
}

const itDepartment = new ITDepartment(2, ['Ivo', 'Pero']);
itDepartment.addEmployee('Marko');
itDepartment.addEmployee('Luka');
console.log(itDepartment);

const accountingDepartment = new AccountingDepartment(3, []);
accountingDepartment.mostRecentReport = 'reportic'; // accessing setters like this, weird
console.log(accountingDepartment.mostRecentReport); //accessing getters like a property
accountingDepartment.addEmployee('Hrle');
accountingDepartment.addEmployee('Vile');
accountingDepartment.addReport('Pare pare parice');
accountingDepartment.readReports();
console.log(accountingDepartment);


const employee1 = Department.createEmployee('Stipe');


// SINGLETON PATTERN, PRIVATE CONSTRUCTOR
class TestSingleton {
  private static instance: TestSingleton;

  private constructor(dummyValue1: string, dummyValue2: string) {}

  static getInstance() {
    if(this.instance) { // or TestSingleton.instance
      return this.instance;
    }
    this.instance = new TestSingleton('dummyVal1', 'dummyVal2');
  }
}