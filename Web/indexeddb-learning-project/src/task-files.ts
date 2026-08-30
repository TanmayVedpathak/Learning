import type { Task } from "./types";

function isTaskArray(value: unknown): value is Task[] {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!item || typeof item !== "object") return false;
      const task = item as Partial<Task>;
      return (
        typeof task.title === "string" &&
        typeof task.description === "string" &&
        ["low", "medium", "high"].includes(task.priority ?? "") &&
        typeof task.completed === "boolean" &&
        typeof task.createdAt === "number" &&
        typeof task.updatedAt === "number"
      );
    })
  );
}

export async function readTasksFile(file: File): Promise<Task[]> {
  const parsed: unknown = JSON.parse(await file.text());
  if (!isTaskArray(parsed)) {
    throw new Error("The selected JSON file does not contain valid task records.");
  }
  return parsed;
}

export function downloadTasks(tasks: Task[]): void {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `indexeddb-tasks-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function createSampleTasks(): Task[] {
  const now = Date.now();
  return [
    { title: "Understand IDBOpenDBRequest", description: "Observe success, error, blocked, and upgradeneeded events.", priority: "high", completed: false, createdAt: now - 50000, updatedAt: now - 50000 },
    { title: "Create an object store", description: "Use a keyPath and autoIncrement primary key.", priority: "high", completed: true, createdAt: now - 40000, updatedAt: now - 40000 },
    { title: "Practice indexes", description: "Filter tasks by priority or completion status.", priority: "medium", completed: false, createdAt: now - 30000, updatedAt: now - 30000 },
    { title: "Use a cursor", description: "Move through records and implement pagination.", priority: "medium", completed: false, createdAt: now - 20000, updatedAt: now - 20000 },
    { title: "Export data", description: "Create and download a JSON backup.", priority: "low", completed: false, createdAt: now - 10000, updatedAt: now - 10000 },
  ];
}
