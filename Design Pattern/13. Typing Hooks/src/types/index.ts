export type BookType = {
  id: number;
  title: string;
  author?: string;
};

export type BookProps = {
  title: string;
  author?: string;
};

export type State = { status: "fetching" | "success" } | { status: "error"; error: Error };

export type Data<T> = ["fetching", undefined?] | ["success", T] | ["error", Error];

export type InitialState = {
  items: number;
  inputItems: string | number;
};

export type Action = {
  type: "increase" | "decrease" | "reset" | "updateItemsFromInput";
};

export type ActionWithPayload = {
  type: "updateInputItems";
  payload: number;
};
