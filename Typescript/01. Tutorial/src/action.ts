import type { Student } from "./type";

export function sayHello(name: string): void {
  console.log(`Hello ${name}!`);
}

export let person = "susan";

const newStudent: Student = {
  name: "peter",
  age: 24,
};

export default newStudent;
