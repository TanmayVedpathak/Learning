import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pageList from "./pages";
import "./App.css";

const Loader = () => <div style={{ padding: 20 }}>Loading...</div>;

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {pageList.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
