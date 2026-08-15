const startBtn = document.getElementById("startBtn");
const testBtn = document.getElementById("testBtn");
const stopBtn = document.getElementById("stopBtn");

const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const uiMessageEl = document.getElementById("uiMessage");

let worker = null;

startBtn.addEventListener("click", () => {
  if (worker) {
    console.log("Worker already running");
    return;
  }

  worker = new Worker("./js/worker.js");

  statusEl.textContent = "Status: Processing...";
  resultEl.textContent = "";

  worker.postMessage({
    type: "START",
    payload: {
      limit: 5_000_000_000,
    },
  });

  worker.onmessage = (event) => {
    const { type, payload } = event.data;

    if (type === "PROGRESS") {
      statusEl.textContent = `Status: ${payload.percent}% completed`;
    }

    if (type === "DONE") {
      statusEl.textContent = "Status: Finished";

      resultEl.textContent = `
        Sum: ${payload.sum}
        | Time: ${payload.time} ms
      `;

      worker.terminate();
      worker = null;
    }
  };

  worker.onerror = (error) => {
    console.error("Worker error:", error);

    statusEl.textContent = "Status: Worker failed";

    worker.terminate();
    worker = null;
  };
});

testBtn.addEventListener("click", () => {
  uiMessageEl.textContent = `UI is still responsive: ${new Date().toLocaleTimeString()}`;
});

stopBtn.addEventListener("click", () => {
  if (!worker) {
    return;
  }

  worker.terminate();
  worker = null;

  statusEl.textContent = "Status: Worker stopped";
});
