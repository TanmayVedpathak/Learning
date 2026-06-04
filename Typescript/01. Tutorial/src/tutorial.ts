import newStudent, { sayHello } from "./action";
import type { Book, Car, DogOwner, Employee, Manager, Person, Product, Staff, Status, StringOrNumber, Student, Theme, User, UserType, ValueType } from "./type";

let greeting: string = "Hello";
greeting = greeting.toUpperCase();

let age: number = 25;
age = age + 5;

let isAdult: boolean;

if (age > 18) {
  isAdult = true;
} else {
  isAdult = false;
}

// greeting = 10;
// age = "john";
// isAdult = "yes";

console.log("greeting", greeting);
console.log("age", age);
console.log("isAdult", isAdult);

// ! union operator

let tax: number | string;
tax = 10;
tax = "$10";

let status: "pending" | "success" | "error" = "pending";

// status = "random";

let books = ["disappear", "folks", "original"];
let foundBook: string | undefined;

for (let book of books) {
  if (book == "folk") {
    foundBook = book;
    break;
  }
}

foundBook = foundBook?.toUpperCase(); // : Optional Chaining operator(?.) gets added automatically by ts

console.log("tax", tax);
console.log("status", status);
console.log("foundBook", foundBook);

// ! any

let notSure: any;
notSure = 30;
notSure = "random";
notSure = false;

console.log("notSure", notSure);

// ! array

let prices: number[] = [76, 45, 15, 26];
let fruits: string[] = ["apple", "mango", "banana"];
let randomArray: (string | number)[] = ["apple", "mango", 782];

console.log(prices, fruits, randomArray);

// ! object
let car: { brand: string; year: number } = {
  brand: "toyota",
  year: 2026,
};

car.brand = "honda";
car.year = 2025;

// car.brand=2020;
// car.year="2020";
// car.color="red";

let book = { title: "textbook", price: 20 };
let pen = { title: "nataraj", price: 10 };
let bag = { title: "school" };

let stationary: { readonly title: string; price?: number }[] = [book, pen, bag];

// stationary[0].title = "notebook"
// stationary[0].price += 5;

console.log(car, stationary);

// ! functions

let names: string[] = ["Mathilda", "Kathryn", "Lewis"];

function isNameInList(name: string): boolean {
  return names.includes(name);
}

console.log(`Lewis is${!isNameInList("Lewis") ? " not" : ""} in the list`);
console.log(`Cora is${!isNameInList("Cora") ? " not" : ""} in the list`);

function calculatePrice(price: number, discount?: number): number {
  return price - (price * (discount || 0)) / 100;
}

console.log("Discount price: ", calculatePrice(120, 30));
console.log("Discount price: ", calculatePrice(450));

function sum(message: string, ...numbers: number[]): string {
  return message + numbers.reduce((total, num) => total + num, 0);
}

console.log(sum("The total is: ", 1, 2, 3, 4));

// ! Type Alias

let john: User = {
  id: 1,
  name: "john",
  isActive: true,
};

let susan: User = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}

createUser(susan);
createUser(john);

let value: StringOrNumber;
value = "hello";
value = 123;

let theme: Theme;
theme = "light";
theme = "dark";

function setTheme(t: Theme) {
  theme = t;
}

setTheme("dark");

console.log("value", value);
console.log("theme", theme);

let employee1: Employee = {
  id: 1,
  name: "Tanmay",
  department: "Engineering",
};

let employee2: Employee = {
  id: 2,
  name: "Priya",
  department: "Design",
};

let employee3: Employee = {
  id: 3,
  name: "Rahul",
  department: "Marketing",
};

let manager1: Manager = {
  id: 100,
  name: "Amit",
  department: "Engineering",
  employees: [
    {
      id: 1,
      name: "Tanmay",
      department: "Engineering",
    },
    {
      id: 4,
      name: "Sneha",
      department: "Engineering",
    },
  ],
};

let staffMembers: Staff[] = [manager1, employee1, employee2, employee3];

staffMembers.forEach((member) => {
  if ("employees" in member) {
    console.log(member.name + " is a manager of " + member.employees.length + " employees");
  } else {
    console.log(member.name + " is from " + member.department + " department");
  }
});

let propName = "age";

type Animal = {
  [propName]: number;
};

let tiger: Animal = { [propName]: 5 };

console.log("tiger", tiger);

// ! Interface

let deepWork: Book = {
  isbn: 9781455586691,
  title: "Deep Work",
  author: "Cal Newport",
  genre: "Self-help",
  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    return `${this.title} ${message}`;
  },
  printSomething: (someValue) => {
    // "this" gotcha
    console.log(deepWork.author);
    return someValue;
  },
};

let result = deepWork.printTitle("is an awesome book");
console.log(result);

deepWork.printAuthor();

console.log(deepWork.printSomething(34));

let person: Person = {
  name: "John",
  age: 30,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

interface Worker extends Person {
  employeeId: number;
}

let employee: Worker = {
  name: "jane",
  age: 28,
  employeeId: 123,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Employee ID: ${this.employeeId}`;
  },
};

// Interface multiple inheritance
interface Lead extends Person, DogOwner {
  managePeople(): void;
}

let manager: Lead = {
  name: "Bob",
  age: 35,
  dogName: "Rex",
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  getDogDetails() {
    return `Dog Name: ${this.dogName}`;
  },
  managePeople() {
    console.log("Managing people...");
  },
};

console.log("person", person);
console.log("employee", employee);
console.log("manager", manager);

// ! Tuples

let human: [string, number] = ["john", 25];
console.log(human[0]);
console.log(human[1]);

let Della: [string, number?] = ["Della"];
console.log("Della", Della);

function getPerson(): [string, number] {
  return ["john", 25];
}

let randomPerson = getPerson();
console.log(randomPerson[0]);
console.log(randomPerson[1]);

// let susan: [string, number] = ['susan', 25];
// susan[0] = 'bob';
// susan.push('some random value');

let Timothy: readonly [string, number] = ["Timothy", 25];
// susan[0] = 'bob';
// susan.push('some random value');
console.log(Timothy);

// ! Enums

enum ServerResponseStatus {
  Success = 200,
  Error = "Error",
}

interface ServerResponse {
  result: ServerResponseStatus;
  data: string[];
}

function getServerResponse(): ServerResponse {
  return {
    result: ServerResponseStatus.Success,
    data: ["first item", "second item"],
  };
}

const response: ServerResponse = getServerResponse();
console.log(response);

Object.values(ServerResponseStatus).forEach((value) => {
  console.log(value);
});

// ! Type Assertion

let someValue: any = "This is a string";

let strLength: number = (someValue as string).length;

console.log("strLength", strLength);

type Bird = {
  name: string;
};

let birdString = '{"name": "Eagle"}';
let dogString = '{"breed": "Poodle"}';

let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

let bird = birdObject as Bird;
let dog = dogObject as Bird;

console.log(bird.name);
console.log(dog.name);
const statusValue = "pending";

const user: UserType = { name: "john", status: statusValue as Status };

console.log("user", user);

// ! unknown

let unknownValue: unknown;

unknownValue = "Hello World";
unknownValue = [1, 2, 3];
unknownValue = 42.3344556;

// unknownValue.toFixed();

if (typeof unknownValue === "number") {
  console.log(unknownValue.toFixed(2));
}

function runSomeCode() {
  const random = Math.random();
  if (random < 0.5) {
    throw new Error("Something went wrong");
  } else {
    throw "some error";
  }
}

try {
  runSomeCode();
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
    console.log("there was an error....");
  }
}

// ! never

// let someValue: never = 0;

function checkTheme(theme: Theme) {
  if (theme === "light") {
    console.log("light theme");
    return;
  }
  if (theme === "dark") {
    console.log("dark theme");
    return;
  }
  theme;
}

checkTheme("dark");

enum Color {
  Red,
  Blue,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return "Red";
    case Color.Blue:
      return "Blue";
    default:
      // at build time
      let unexpectedColor: never = color;
      // at runtime
      throw new Error(`Unexpected color value: ${unexpectedColor}`);
  }
}

console.log(getColorName(Color.Red));
console.log(getColorName(Color.Blue));
// console.log(getColorName(Color.Green));

sayHello("TypeScript");
console.log(newStudent);

const anotherStudent: Student = {
  name: "bob",
  age: 23,
};

console.log(anotherStudent);

// ! Type Guarding

let variable: ValueType;
const random = Math.random();
variable = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;

function checkValue(value: ValueType) {
  if (typeof value === "string") {
    console.log(value.toLowerCase());
    return;
  }
  if (typeof value === "number") {
    console.log(value.toFixed(2));
    return;
  }
  console.log(`boolean: ${value}`);
}

checkValue(variable);

// ! Generics

// let array1: string[] = ['Apple', 'Banana', 'Mango'];
// let array2: number[] = [1, 2, 3];
// let array3: boolean[] = [true, false, true];

let array1: Array<string> = ["Apple", "Banana", "Mango"];
let array2: Array<number> = [1, 2, 3];
let array3: Array<boolean> = [true, false, true];

console.log(array1, array2, array3);

// function createString(arg: string): string {
//   return arg;
// }

// function createNumber(arg: number): number {
//   return arg;
// }

function genericFunction<T>(arg: T): T {
  return arg;
}

const someStringValue = genericFunction<string>("Hello World");
const someNumberValue = genericFunction<number>(2);

console.log("someStringValue", someStringValue);
console.log("someNumberValue", someNumberValue);

interface GenericInterface<T> {
  value: T;
  getValue: () => T;
}

const genericString: GenericInterface<string> = {
  value: "Hello World",
  getValue() {
    return this.value;
  },
};

console.log("genericString", genericString);

async function someFunc(): Promise<string> {
  return "Hello World";
}

const res = someFunc();

console.log(res);

function generateStringArray(length: number, value: string): string[] {
  let result: string[] = [];
  result = Array(length).fill(value);
  return result;
}

console.log(generateStringArray(3, "hello"));

function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  result = Array(length).fill(value);
  return result;
}

let arrayStrings = createArray<string>(3, "hello");
let arrayNumbers = createArray<number>(4, 100);

console.log(arrayStrings);
console.log(arrayNumbers);

function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

let pairResult = pair<number, string>(123, "Hello");
console.log("pairResult", pairResult);

function processValue<T extends number | string>(value: T): T {
  console.log(value);
  return value;
}

processValue("hello");
processValue(12);
// processValue(true);

const vehicle: Car = {
  brand: "ford",
  model: "mustang",
};

const product: Product = {
  name: "shoes",
  price: 1.99,
};

const student: Student = {
  name: "peter",
  age: 20,
};

console.log("vehicle", vehicle);

// function printName<T extends Student>(input: T): void {
//   console.log(input.name);
// }

// function printName<T extends Student | Product>(input: T): void {
//   console.log(input.name);
// }

function printName<T extends { name: string }>(input: T): void {
  console.log(input.name);
}

printName(student);
printName(product);
// printName(vehicle);

interface StoreData<T = any> {
  data: T[];
}

const storeNumbers: StoreData<number> = {
  data: [1, 2, 3, 4],
};

const randomStuff: StoreData = {
  data: ["random", 1],
};

console.log(storeNumbers, randomStuff);

import { z } from "zod";
const url = "https://www.course-api.com/react-tours-project";

const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  info: z.string(),
  image: z.string(),
  price: z.string(),
  // something: z.string(),
});

type Tour = z.infer<typeof tourSchema>;

async function fetchData(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData: Tour[] = await response.json();
    const result = tourSchema.array().safeParse(rawData);
    if (!result.success) {
      throw new Error(`Invalid data: ${result.error}`);
    }
    return result.data;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "there was an error...";
    console.log(errMsg);

    // throw error;
    return [];
  }
}

const tours = await fetchData(url);
tours.map((tour) => {
  console.log(tour.name);
});
