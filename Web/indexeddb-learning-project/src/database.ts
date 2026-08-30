import type { Priority, Task } from "./types";

const DB_NAME = "indexeddb-learning-db";
const DB_VERSION = 1;
const STORE_NAME = "tasks";

let database: IDBDatabase | null = null;

type DatabaseEvents = {
  onOpening?: () => void;
  onUpgrade?: () => void;
  onBlocked?: (operation: "open" | "delete") => void;
  onOpen?: () => void;
  onVersionChange?: () => void;
};

export type PageQuery = {
  page: number;
  pageSize: number;
  direction: IDBCursorDirection;
  priority?: Priority;
  completed?: boolean;
};

const requestToPromise = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });

const transactionToPromise = (transaction: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    transaction.addEventListener("complete", () => resolve());
    transaction.addEventListener("abort", () => reject(transaction.error));
    transaction.addEventListener("error", () => reject(transaction.error));
  });

function requireDatabase(): IDBDatabase {
  if (!database) throw new Error("Open the database first.");
  return database;
}

export function isDatabaseOpen(): boolean {
  return database !== null;
}

export async function openDatabase(events: DatabaseEvents = {}): Promise<IDBDatabase> {
  if (database) return database;

  events.onOpening?.();
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.addEventListener("upgradeneeded", () => {
    events.onUpgrade?.();
    const db = request.result;

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("title", "title", { unique: false });
      store.createIndex("priority", "priority", { unique: false });
      store.createIndex("completed", "completed", { unique: false });
      store.createIndex("createdAt", "createdAt", { unique: false });
    }
  });

  request.addEventListener("blocked", () => events.onBlocked?.("open"));

  database = await requestToPromise(request);
  database.addEventListener("versionchange", () => {
    database?.close();
    database = null;
    events.onVersionChange?.();
  });

  events.onOpen?.();
  return database;
}

export async function addTask(task: Task): Promise<number> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  const completed = transactionToPromise(transaction);
  const id = await requestToPromise(transaction.objectStore(STORE_NAME).add(task));
  await completed;
  return Number(id);
}

export async function updateTask(task: Task): Promise<void> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  transaction.objectStore(STORE_NAME).put(task);
  await transactionToPromise(transaction);
}

export function getTask(id: number): Promise<Task | undefined> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readonly");
  return requestToPromise(transaction.objectStore(STORE_NAME).get(id));
}

export async function deleteTask(id: number): Promise<void> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  transaction.objectStore(STORE_NAME).delete(id);
  await transactionToPromise(transaction);
}

export function countTasks(): Promise<number> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readonly");
  return requestToPromise(transaction.objectStore(STORE_NAME).count());
}

export function getTaskPage(query: PageQuery): Promise<Task[]> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const offset = (query.page - 1) * query.pageSize;

  let source: IDBObjectStore | IDBIndex = store.index("createdAt");
  let range: IDBKeyRange | undefined;

  if (query.priority) {
    source = store.index("priority");
    range = IDBKeyRange.only(query.priority);
  } else if (query.completed !== undefined) {
    source = store.index("completed");
    range = IDBKeyRange.only(query.completed);
  }

  return new Promise((resolve, reject) => {
    const results: Task[] = [];
    let skipped = false;
    const request = source.openCursor(range, query.direction);

    request.addEventListener("success", () => {
      const cursor = request.result;
      if (!cursor || results.length >= query.pageSize) {
        resolve(results);
        return;
      }

      if (offset > 0 && !skipped) {
        skipped = true;
        cursor.advance(offset);
        return;
      }

      results.push(cursor.value as Task);
      cursor.continue();
    });

    request.addEventListener("error", () => reject(request.error));
  });
}

export async function addTasks(tasks: Task[]): Promise<void> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  for (const task of tasks) store.add(task);
  await transactionToPromise(transaction);
}

export async function importTasks(tasks: Task[]): Promise<void> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  for (const task of tasks) {
    const { id: _ignoredId, ...taskWithoutId } = task;
    store.add(taskWithoutId);
  }

  await transactionToPromise(transaction);
}

export async function completeAllTasks(): Promise<void> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  const request = transaction.objectStore(STORE_NAME).openCursor();

  await new Promise<void>((resolve, reject) => {
    request.addEventListener("success", () => {
      const cursor = request.result;
      if (!cursor) {
        resolve();
        return;
      }

      const task = cursor.value as Task;
      cursor.update({ ...task, completed: true, updatedAt: Date.now() });
      cursor.continue();
    });
    request.addEventListener("error", () => reject(request.error));
  });

  await transactionToPromise(transaction);
}

export async function deleteCompletedTasks(): Promise<number> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.index("completed").openKeyCursor(IDBKeyRange.only(true));
  let deleted = 0;

  await new Promise<void>((resolve, reject) => {
    request.addEventListener("success", () => {
      const cursor = request.result;
      if (!cursor) {
        resolve();
        return;
      }

      store.delete(cursor.primaryKey);
      deleted += 1;
      cursor.continue();
    });
    request.addEventListener("error", () => reject(request.error));
  });

  await transactionToPromise(transaction);
  return deleted;
}

export function countHighPriorityTasks(): Promise<number> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readonly");
  return requestToPromise(
    transaction.objectStore(STORE_NAME).index("priority").count(IDBKeyRange.only("high")),
  );
}

export function getAllTasks(): Promise<Task[]> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readonly");
  return requestToPromise(transaction.objectStore(STORE_NAME).getAll());
}

export async function clearTasks(): Promise<void> {
  const transaction = requireDatabase().transaction(STORE_NAME, "readwrite");
  transaction.objectStore(STORE_NAME).clear();
  await transactionToPromise(transaction);
}

export async function deleteDatabase(events: DatabaseEvents = {}): Promise<void> {
  database?.close();
  database = null;

  const request = indexedDB.deleteDatabase(DB_NAME);
  request.addEventListener("blocked", () => events.onBlocked?.("delete"));
  await requestToPromise(request);
}

export const databaseDetails = {
  name: DB_NAME,
  version: DB_VERSION,
};
