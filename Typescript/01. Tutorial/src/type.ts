export type User = { id: number; name: string; isActive: boolean };

export type StringOrNumber = string | number;

export type Theme = "light" | "dark";

export type Employee = {
  id: number;
  name: string;
  department: string;
};

export type Manager = Employee & {
  employees: Employee[];
};

export type Staff = Employee | Manager;

export interface Book {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
  printAuthor(): void;
  printTitle(message: string): string;
  printSomething: (someValue: number) => number;
}

export interface Person {
  name: string;
  getDetails(): string;
}

export interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

export interface Person {
  age: number;
}

export enum Status {
  Pending = "pending",
  Declined = "declined",
}

export type UserType = {
  name: string;
  status: Status;
};

export type ValueType = string | number | boolean;

export type Car = {
  brand: string;
  model: string;
};

export type Product = {
  name: string;
  price: number;
};

export type Student = {
  name: string;
  age: number;
};
