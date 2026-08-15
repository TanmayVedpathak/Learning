self.onmessage = (event) => {
  const { type, payload } = event.data;

  if (type !== "START") {
    return;
  }

  const limit = payload.limit;

  let sum = 0;

  const startTime = performance.now();

  const progressInterval = Math.floor(limit / 100);

  for (let i = 0; i <= limit; i++) {
    sum += i;

    if (i % progressInterval === 0) {
      const percent = Math.floor((i / limit) * 100);

      self.postMessage({
        type: "PROGRESS",
        payload: {
          percent,
        },
      });
    }
  }

  const endTime = performance.now();

  self.postMessage({
    type: "DONE",
    payload: {
      sum,
      time: Math.round(endTime - startTime),
    },
  });
};
