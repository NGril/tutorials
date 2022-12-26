// ADVANCED TYPES

// 1. INTERSECTION TYPES
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // intersection type, combination of properties

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};

// same could've been done with interfaces
interface AdminInterface {
    name: string;
    privileges: string[];
};

interface EmployeeInterface {
    name: string;
    startDate: Date;
};

interface ElevatedEmployeeInterface extends Employee, Admin { }

const e2: ElevatedEmployeeInterface = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};

// could be done with other types as well
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // actually of type number