import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h2>{error.status}</h2>
        <p>{error.statusText || error.data}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, color: "red" }}>
      <h2>Something went wrong</h2>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
};

export default ErrorBoundary;
