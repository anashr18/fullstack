console.log("HEllo from ts")

let name: number = 10
// name.toUpperCase()
console.log(name);
let newName = name * 10
console.log(newName)

// let tax: number | string = 10
// tax = "10%";

// let status: 'pending' | 'approved' | 'rejected' = 'pending';
// status = 'approved';


let books = ['1984', 'Brave New World', 'Fahrenheit 451', 'Animal Farm', 'Lord of the Flies']

let foundBook: string | undefined
for (let book of books) {
    if ('1984' === foundBook) {
        console.log("Book found: " + book);
    }
}
console.log(foundBook?.length)

let prices: (number | string)[] = [10, 20, 30, 'expensive'];
prices.push('rr');


let car1 = { brand: 'Toyota', model: 'Camry', year: 2021 }
let car2 = { brand: 'Audi', model: 'CLX', year: 2022 }
let car3 = { brand: 'Kambo', model: 'GTX', year: 2024, cost: 100 }

let cars: { brand: string; model: string; readonly year: number; cost?: number }[] = [car1, car2, car3]
console.log(cars);
// will give an error readonly propeprty
// cars[0].year = 2021;

let names: string[] = ['Alice', 'Bob', 'Charlie'];

function checkNames(name: string): boolean {
    return names.includes(name) ? true : false
}
console.log(checkNames('fdf'))

function sumIt(message: string, ...numbers: number[]): void {
    console.log(message, numbers.reduce((acc, curr) => acc + curr, 0));
}
sumIt("Total sum:", 1, 2, 3, 4, 5,);

function processInput(data: string | number): void {
    if (typeof data === 'string') {
        console.log(data.toUpperCase());
    } else {
        console.log(data * 2);
    }
}
processInput(10);

function processData(data: string | number, reverse: boolean = false): void {
    if (typeof data === 'string') {
        console.log(reverse ? data.split('').reverse().join('').toUpperCase() : data.toUpperCase());
    } else {
        console.log(reverse ? Number(data.toString().split('').reverse().join('')) : data);
    }
}

processData('hello guy ', true);
processData('hello Yiig', true);
processData('1234567', true);

type Employee = {
    id: number;
    name: string;
    department: string;
    [key: string]: number | string;
}
type Manager = {
    id: number;
    name: string;
    employees: Employee[];
}
type staff = Employee | Manager;

function isManager(staff: staff): staff is Manager {
    return 'employees' in staff
}
function printStaffDetails(staff: staff) {
    console.log(staff.name);
    if (isManager(staff)) {
        console.log("Manager");
        (staff.employees).forEach((employee: Employee) => console.log(employee.name));
    } else {
        console.log("Employee");
    }
}
const ee: staff[] = [
    { id: 1, name: 'John Doe', department: 'WWWWEngineering' },
    { id: 2, name: 'Mohn Doe', department: 'QQQEngineering' },
    { id: 3, name: 'Kohn Doe', department: 'Tamn', 'salary': 123344 },
    { id: 4, name: 'Jane Doe', employees: [{ id: 1, name: 'Alice', department: 'HR' }, { id: 2, name: 'Bob', department: 'Finance' }] }
];

ee.forEach((staff: staff) => printStaffDetails(staff))
// printStaffDetails(ee)

enum UserRole {
    Admin = 'Admin',
    Manager = 'Manager',
    Employee = 'Employee'
}

type User = {
    id: number;
    name: string;
    role: UserRole;
    contact: { email: string; phone?: string; };
}

function createUser(user: User): User {
    return user;
}

const user: User = createUser({
    id: 1,
    name: 'John Doe',
    role: UserRole.Admin,
    contact: { email: 'john.doe@example.com' }
}
)

console.log(createUser(user))