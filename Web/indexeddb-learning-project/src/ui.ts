import type { LogType, Priority, Task } from "./types";

const getElement = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element #${id} was not found.`);
  return element as T;
};

export const elements = {
  taskForm: getElement<HTMLFormElement>("task-form"),
  taskIdInput: getElement<HTMLInputElement>("task-id"),
  titleInput: getElement<HTMLInputElement>("title"),
  descriptionInput: getElement<HTMLTextAreaElement>("description"),
  priorityInput: getElement<HTMLSelectElement>("priority"),
  completedInput: getElement<HTMLInputElement>("completed"),
  searchInput: getElement<HTMLInputElement>("search-input"),
  priorityFilter: getElement<HTMLSelectElement>("priority-filter"),
  completedFilter: getElement<HTMLSelectElement>("completed-filter"),
  sortDirection: getElement<HTMLSelectElement>("sort-direction"),
  pageSizeInput: getElement<HTMLSelectElement>("page-size"),
  taskList: getElement<HTMLDivElement>("task-list"),
  emptyState: getElement<HTMLParagraphElement>("empty-state"),
  activityLog: getElement<HTMLDivElement>("activity-log"),
  databaseStatus: getElement<HTMLSpanElement>("database-status"),
  recordCount: getElement<HTMLElement>("record-count"),
  pageIndicator: getElement<HTMLElement>("page-indicator"),
  queryExplanation: getElement<HTMLParagraphElement>("query-explanation"),
  formMode: getElement<HTMLElement>("form-mode"),
  cancelEditButton: getElement<HTMLButtonElement>("cancel-edit-button"),
  previousPageButton: getElement<HTMLButtonElement>("previous-page-button"),
  nextPageButton: getElement<HTMLButtonElement>("next-page-button"),
  importInput: getElement<HTMLInputElement>("import-input"),
  toast: getElement<HTMLDivElement>("toast"),
  openDatabaseButton: getElement<HTMLButtonElement>("open-db-button"),
  refreshButton: getElement<HTMLButtonElement>("refresh-button"),
  seedButton: getElement<HTMLButtonElement>("seed-button"),
  completeAllButton: getElement<HTMLButtonElement>("complete-all-button"),
  deleteCompletedButton: getElement<HTMLButtonElement>("delete-completed-button"),
  countPriorityButton: getElement<HTMLButtonElement>("count-priority-button"),
  exportButton: getElement<HTMLButtonElement>("export-button"),
  clearButton: getElement<HTMLButtonElement>("clear-button"),
  deleteDatabaseButton: getElement<HTMLButtonElement>("delete-db-button"),
  clearLogButton: getElement<HTMLButtonElement>("clear-log-button"),
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function log(message: string, type: LogType = "info"): void {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  const typeClass = type === "success" ? "log-success" : type === "error" ? "log-error" : "";
  entry.innerHTML = `<span class="log-time">${new Date().toLocaleTimeString()}</span> <span class="${typeClass}">${escapeHtml(message)}</span>`;
  elements.activityLog.prepend(entry);
}

export function showToast(message: string): void {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.setTimeout(() => elements.toast.classList.remove("show"), 2400);
}

export function updateDatabaseStatus(isOpen: boolean): void {
  elements.databaseStatus.textContent = isOpen ? "Open" : "Closed";
  elements.databaseStatus.className = `status ${isOpen ? "status-online" : "status-offline"}`;
}

export function renderTasks(tasks: Task[]): void {
  elements.taskList.replaceChildren();
  elements.emptyState.hidden = tasks.length > 0;

  for (const task of tasks) {
    const item = document.createElement("article");
    item.className = "task-item";
    item.innerHTML = `
      <div>
        <h3 class="${task.completed ? "completed-title" : ""}">${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.description || "No description")}</p>
        <div class="task-meta">
          <span class="badge priority-${task.priority}">${task.priority} priority</span>
          <span class="badge">${task.completed ? "completed" : "pending"}</span>
          <span class="badge">ID: ${String(task.id)}</span>
          <span class="badge">${new Date(task.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="button secondary" data-action="toggle" data-id="${String(task.id)}">
          ${task.completed ? "Mark pending" : "Complete"}
        </button>
        <button class="button secondary" data-action="edit" data-id="${String(task.id)}">Edit</button>
        <button class="button danger-outline" data-action="delete" data-id="${String(task.id)}">Delete</button>
      </div>
    `;
    elements.taskList.append(item);
  }
}

export function updatePagination(currentPage: number, totalRecords: number, loadedCount: number): void {
  const pageSize = Number(elements.pageSizeInput.value);
  const maxPage = Math.max(1, Math.ceil(totalRecords / pageSize));
  elements.pageIndicator.textContent = `Page ${currentPage} of ${maxPage}`;
  elements.previousPageButton.disabled = currentPage <= 1;
  elements.nextPageButton.disabled = currentPage >= maxPage || loadedCount === 0;
}

export function updateRecordCount(totalRecords: number): void {
  elements.recordCount.textContent = `${totalRecords} ${totalRecords === 1 ? "record" : "records"}`;
}

export function updateQueryExplanation(explanation: string): void {
  elements.queryExplanation.innerHTML = escapeHtml(explanation)
    .replace("createdAt", "<code>createdAt</code>")
    .replace("priority", "<code>priority</code>")
    .replace("completed", "<code>completed</code>")
    .replace("IDBKeyRange.only", "<code>IDBKeyRange.only</code>");
}

export function resetForm(): void {
  elements.taskForm.reset();
  elements.taskIdInput.value = "";
  elements.priorityInput.value = "medium";
  elements.formMode.textContent = "Create mode";
  elements.cancelEditButton.hidden = true;
}

export function populateForm(task: Task): void {
  elements.taskIdInput.value = String(task.id);
  elements.titleInput.value = task.title;
  elements.descriptionInput.value = task.description;
  elements.priorityInput.value = task.priority;
  elements.completedInput.checked = task.completed;
  elements.formMode.textContent = `Editing ID ${String(task.id)}`;
  elements.cancelEditButton.hidden = false;
  elements.titleInput.focus();
  window.scrollTo({ top: elements.taskForm.offsetTop - 30, behavior: "smooth" });
}

export function getTaskFormValues(): Pick<Task, "title" | "description" | "priority" | "completed"> {
  return {
    title: elements.titleInput.value.trim(),
    description: elements.descriptionInput.value.trim(),
    priority: elements.priorityInput.value as Priority,
    completed: elements.completedInput.checked,
  };
}
