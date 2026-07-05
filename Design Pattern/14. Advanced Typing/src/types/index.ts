export type ObjectType = {
  key1: 1;
  key2: 2;
};

export type result = keyof ObjectType;

const test: result = "key1";
console.log(test);

export type Obj = {
  0: "I am 0";
  1: "I am 1";
  p0: "c";
  p1: "d";
};

export type test0 = Obj[0] | Obj["p0"];

export type res = Obj[keyof Obj];

export type set1 = "a" | "b" | "c";
export type set2 = "b" | "c" | "d";

export type UnionType = set1 | set2;
export type IntersectionType = set1 & set2;

export type CanAcceptProps<ComponentProps, Prop> = Prop extends keyof ComponentProps ? true : false;

export type ButtonProps = {
  size: "small" | "medium" | "large";
  color: "red" | "blue" | "green";
};

export type CanButtonAcceptColor = CanAcceptProps<ButtonProps, "color">;
export type CanButtonAcceptIcon = CanAcceptProps<ButtonProps, "icon">;

export type Obj1 = {
  [K in "a" | "b" | "c"]: number;
};

export type mask = {
  [K in keyof Obj1]: boolean;
};

export type Book = {
  author: string;
  title: string;
  price: number;
};

export type ActionTypes = `update-${keyof Book}`;

export type Actions<T, K extends keyof T & string> = {
  type: `update-${K}`;
  payload: T[K];
};

export type UpdateTitleAction = Actions<Book, "title">;
