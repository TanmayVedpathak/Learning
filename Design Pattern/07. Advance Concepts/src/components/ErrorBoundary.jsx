import React from "react";

class ErrorClassComponent extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const Child = () => {
  throw new Error("something went wrong");
  return (
    <>
      <h1>Child Component</h1>
    </>
  );
};

const ErrorBoundary = () => {
  return (
    <div>
      <h1>Parent Component</h1>
      <ErrorClassComponent fallback={<h1>Error at Child</h1>}>
        <Child />
      </ErrorClassComponent>
    </div>
  );
};

export default ErrorBoundary;
