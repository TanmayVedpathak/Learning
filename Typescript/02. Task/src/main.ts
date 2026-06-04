// const btn = document.querySelector(".test-btn");

// btn?.addEventListener("click", () => {
//   console.log("something");
// });

// const btn = document.querySelector(".test-btn")!;

// btn.addEventListener("click", (event) => {
//   event.preventDefault();
//   console.log("something");
// });

// const btn = document.querySelector<HTMLButtonElement>(".test-btn")!;

// btn.disabled = true;

const btn = document.querySelector(".test-btn")! as HTMLButtonElement;

btn.disabled = true;

const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

// task type
type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = loadTasks();

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");

  return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (taskListElement) {
    taskListElement.innerHTML = "";
  }

  tasks.forEach((task) => renderTask(task));
}

function addTask(task: Task): void {
  tasks.push(task);
}

function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  taskElement.style.textDecoration = task.isCompleted ? "line-through" : "";

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}

tasks.forEach((task) => renderTask(task));

taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    // add task to list
    addTask(task);
    // render task
    renderTask(task);
    // update local storage
    updateStorage();

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
});
