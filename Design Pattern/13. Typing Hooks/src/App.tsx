import CounterComponent from "./components/CounterComponent";
import BooksComponent from "./components/BooksComponent";
import RefComponent from "./components/RefComponent";
import CustomHook from "./components/CustomHook";
import ShoppingCard from "./components/shopping-card/ShoppingCard";

import "./App.css";

function App() {
  return (
    <>
      <main className="w-full max-w-2xl py-16 mx-auto">
        <h1>Typing Hooks</h1>

        <CounterComponent />

        <BooksComponent />

        <RefComponent />

        <CustomHook />

        <ShoppingCard />
      </main>
    </>
  );
}

export default App;
