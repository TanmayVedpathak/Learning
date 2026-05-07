import ErrorBoundary from "./components/ErrorBoundary";
import KeyComponent from "./components/KeyComponent";
import Portals from "./components/Portals";
import UseLayoutComponent from "./components/UseLayoutComponent";
import UseIdComponent from "./components/UseIdComponent";
import UseDeferredValueComponent from "./components/UseDeferredValueComponent";
import UseTransitionComponent from "./components/UseTransitionComponent";
import AsyncRouting from "./components/AsyncRouting";

import "./App.css";

function App() {
  return (
    <>
      <AsyncRouting />
      <Portals />
      <ErrorBoundary />
      <KeyComponent />
      <UseLayoutComponent />
      <UseIdComponent />
      <UseDeferredValueComponent />
      <UseTransitionComponent />
    </>
  );
}

export default App;
