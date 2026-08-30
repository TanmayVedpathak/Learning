export type Priority = "low" | "medium" | "high";

export type Task = {
  id?: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type LogType = "success" | "error" | "info";
