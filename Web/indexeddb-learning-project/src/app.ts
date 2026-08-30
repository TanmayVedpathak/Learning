import { addTask, addTasks, clearTasks, completeAllTasks, countHighPriorityTasks, countTasks, databaseDetails, deleteCompletedTasks, deleteDatabase, deleteTask, getAllTasks, getTask, getTaskPage, importTasks, isDatabaseOpen, openDatabase, updateTask, type PageQuery } from "./database";
import { createSampleTasks, downloadTasks, readTasksFile } from "./task-files";
import type { Priority, Task } from "./types";
import { elements, getTaskFormValues, log, populateForm, renderTasks, resetForm, showToast, updateDatabaseStatus, updatePagination, updateQueryExplanation, updateRecordCount } from "./ui";

let currentPage = 1;
let totalRecords = 0;
let loadedTasks: Task[] = [];

const databaseEvents = {
  onOpening: () => log(`Opening ${databaseDetails.name}, version ${databaseDetails.version}...`),
  onUpgrade: () => log("upgrade needed: creating the object store and indexes"),
  onBlocked: (operation: "open" | "delete") => {
    const message = operation === "open" ? "Database upgrade is blocked. Close other tabs using this database." : "Database deletion is blocked by another open tab.";
    log(message, "error");
  },
  onOpen: () => {
    updateDatabaseStatus(true);
    log("Database opened successfully.", "success");
  },
  onVersionChange: () => {
    updateDatabaseStatus(false);
    log("Database closed because another tab requested a version change.");
  },
};

function getPageQuery(): PageQuery {
  const priority = elements.priorityFilter.value;
  const completed = elements.completedFilter.value;

  return {
    page: currentPage,
    pageSize: Number(elements.pageSizeInput.value),
    direction: elements.sortDirection.value as IDBCursorDirection,
    priority: priority === "all" ? undefined : (priority as Priority),
    completed: completed === "all" ? undefined : completed === "true",
  };
}

function explainQuery(query: PageQuery): string {
  if (query.priority) {
    return `Using the priority index with IDBKeyRange.only("${query.priority}").`;
  }
  if (query.completed !== undefined) {
    return `Using the completed index with IDBKeyRange.only(${String(query.completed)}).`;
  }
  return `Reading records from the createdAt index in ${query.direction} direction.`;
}

function getVisibleTasks(): Task[] {
  const query = elements.searchInput.value.trim().toLocaleLowerCase();
  if (!query) return loadedTasks;
  return loadedTasks.filter((task) => task.title.toLocaleLowerCase().includes(query));
}

function renderVisibleTasks(): void {
  renderTasks(getVisibleTasks());
}

async function refreshView(): Promise<void> {
  if (!isDatabaseOpen()) return;

  totalRecords = await countTasks();
  const pageSize = Number(elements.pageSizeInput.value);
  const maxPage = Math.max(1, Math.ceil(totalRecords / pageSize));
  currentPage = Math.min(currentPage, maxPage);

  const query = getPageQuery();
  loadedTasks = await getTaskPage(query);
  updateQueryExplanation(explainQuery(query));
  renderVisibleTasks();
  updatePagination(currentPage, totalRecords, loadedTasks.length);
  updateRecordCount(totalRecords);
}

async function openAndRefresh(): Promise<void> {
  await openDatabase(databaseEvents);
  await refreshView();
}

async function startEditing(id: number): Promise<void> {
  const task = await getTask(id);
  if (!task) return;
  populateForm(task);
  log(`Loaded task ${id} using objectStore.get().`);
}

function handleError(error: unknown): void {
  const message = error instanceof Error ? error.message : "An unknown error occurred.";
  log(message, "error");
  showToast(message);
}

function registerTaskForm(): void {
  elements.taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await openDatabase(databaseEvents);
      const id = Number(elements.taskIdInput.value);
      const now = Date.now();
      const formValues = getTaskFormValues();

      if (id) {
        const existing = await getTask(id);
        if (!existing) throw new Error("The task being edited no longer exists.");
        await updateTask({ ...existing, ...formValues, updatedAt: now });
        log(`Updated task ${id} using objectStore.put().`, "success");
      } else {
        const newId = await addTask({ ...formValues, createdAt: now, updatedAt: now });
        log(`Added task with key ${newId}.`, "success");
      }

      resetForm();
      currentPage = 1;
      await refreshView();
      showToast(id ? "Task updated" : "Task created");
    } catch (error) {
      handleError(error);
    }
  });
}

function registerTaskActions(): void {
  elements.taskList.addEventListener("click", async (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    try {
      if (action === "edit") await startEditing(id);
      if (action === "delete") {
        await deleteTask(id);
        log(`Deleted task ${id}.`, "success");
        await refreshView();
      }
      if (action === "toggle") {
        const task = await getTask(id);
        if (!task) return;
        await updateTask({ ...task, completed: !task.completed, updatedAt: Date.now() });
        log(`Updated task ${id} using objectStore.put().`, "success");
        await refreshView();
      }
    } catch (error) {
      handleError(error);
    }
  });
}

function registerToolbarActions(): void {
  elements.openDatabaseButton.addEventListener("click", () => openAndRefresh().catch(handleError));
  elements.refreshButton.addEventListener("click", () => refreshView().catch(handleError));

  elements.seedButton.addEventListener("click", () => {
    openDatabase(databaseEvents)
      .then(async () => {
        const samples = createSampleTasks();
        await addTasks(samples);
        log(`Added ${samples.length} records in one readwrite transaction.`, "success");
        showToast("Sample records added");
        currentPage = 1;
        await refreshView();
      })
      .catch(handleError);
  });

  elements.completeAllButton.addEventListener("click", () => {
    completeAllTasks()
      .then(async () => {
        log("Updated all records through a readwrite cursor transaction.", "success");
        await refreshView();
      })
      .catch(handleError);
  });

  elements.deleteCompletedButton.addEventListener("click", () => {
    deleteCompletedTasks()
      .then(async (deleted) => {
        log(`Deleted ${deleted} completed records through the completed index.`, "success");
        await refreshView();
      })
      .catch(handleError);
  });

  elements.countPriorityButton.addEventListener("click", () => {
    countHighPriorityTasks()
      .then((count) => {
        log(`The priority index counted ${count} high-priority records.`, "success");
        showToast(`${count} high-priority tasks`);
      })
      .catch(handleError);
  });

  elements.exportButton.addEventListener("click", () => {
    getAllTasks()
      .then((tasks) => {
        downloadTasks(tasks);
        log(`Exported ${tasks.length} records with objectStore.getAll().`, "success");
      })
      .catch(handleError);
  });

  elements.clearButton.addEventListener("click", () => {
    clearTasks()
      .then(async () => {
        currentPage = 1;
        log("Cleared all records while keeping the database and object store.", "success");
        await refreshView();
      })
      .catch(handleError);
  });

  elements.deleteDatabaseButton.addEventListener("click", () => {
    updateDatabaseStatus(false);
    deleteDatabase(databaseEvents)
      .then(() => {
        loadedTasks = [];
        totalRecords = 0;
        currentPage = 1;
        renderVisibleTasks();
        updatePagination(currentPage, totalRecords, loadedTasks.length);
        updateRecordCount(totalRecords);
        log("Deleted the complete database, including its object store and indexes.", "success");
        showToast("Database deleted");
      })
      .catch(handleError);
  });

  elements.clearLogButton.addEventListener("click", () => elements.activityLog.replaceChildren());
}

function registerViewControls(): void {
  elements.cancelEditButton.addEventListener("click", resetForm);
  elements.searchInput.addEventListener("input", renderVisibleTasks);

  for (const element of [elements.priorityFilter, elements.completedFilter, elements.sortDirection, elements.pageSizeInput]) {
    element.addEventListener("change", () => {
      currentPage = 1;
      refreshView().catch(handleError);
    });
  }

  elements.previousPageButton.addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1);
    refreshView().catch(handleError);
  });

  elements.nextPageButton.addEventListener("click", () => {
    currentPage += 1;
    refreshView().catch(handleError);
  });

  elements.importInput.addEventListener("change", () => {
    const file = elements.importInput.files?.[0];
    if (!file) return;

    openDatabase(databaseEvents)
      .then(() => readTasksFile(file))
      .then(async (tasks) => {
        await importTasks(tasks);
        log(`Imported ${tasks.length} records in one transaction.`, "success");
        await refreshView();
      })
      .catch(handleError)
      .finally(() => {
        elements.importInput.value = "";
      });
  });
}

export function initializeApp(): void {
  registerTaskForm();
  registerTaskActions();
  registerToolbarActions();
  registerViewControls();

  if (!("indexedDB" in window)) {
    handleError(new Error("This browser does not support IndexedDB."));
    return;
  }

  openAndRefresh().catch(handleError);
}
