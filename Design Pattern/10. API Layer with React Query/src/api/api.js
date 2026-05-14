const DEFAULT_BASE_URL = import.meta.env.VITE_MODE === "development" ? "http://localhost:8080" : "/";

export const didAbort = (error) => error?.name === "AbortError";

export const isApiError = (error) => error instanceof Error;

const request = async (url, options = {}) => {
  const { baseURL = DEFAULT_BASE_URL, headers = {}, abort, signal: externalSignal, ...restOptions } = options;

  const controller = externalSignal ? null : new AbortController();

  const signal = externalSignal || controller.signal;

  if (typeof abort === "function" && controller) {
    abort(() => controller.abort());
  }

  try {
    const response = await fetch(`${baseURL}${url}`, {
      headers: {
        ...(restOptions.body && {
          "Content-Type": "application/json",
        }),
        ...headers,
      },

      signal,
      ...restOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    console.log("api error", error);

    if (didAbort(error)) {
      error.aborted = true;
    }

    throw error;
  }
};

const withLogger = async (promise) =>
  promise.catch((error) => {
    if (!import.meta.env.REACT_APP_DEBUG_API) throw error;

    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }

    console.log(error.config);

    throw error;
  });

const api = {
  get: (url, config = {}) =>
    withLogger(
      request(url, {
        method: "GET",
        ...config,
      }),
    ),

  delete: (url, config = {}) =>
    withLogger(
      request(url, {
        method: "DELETE",
        ...config,
      }),
    ),

  post: (url, body, config = {}) =>
    withLogger(
      request(url, {
        method: "POST",
        body: JSON.stringify(body),
        ...config,
      }),
    ),

  patch: (url, body, config = {}) =>
    withLogger(
      request(url, {
        method: "PATCH",
        body: JSON.stringify(body),
        ...config,
      }),
    ),

  put: (url, body, config = {}) =>
    withLogger(
      request(url, {
        method: "PUT",
        body: JSON.stringify(body),
        ...config,
      }),
    ),
};

export default api;
