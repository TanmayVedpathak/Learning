import styled from "styled-components";

import TasksBoard from "./components/TasksBoard";
import ShoppingList from "./components/ShoppingList";

import "./App.css";

const StyledApp = styled.div`
  margin: 0 auto;
  max-width: 6xl;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 25px;
  padding-right: 25px;
`;

function App() {
  return (
    <>
      <StyledApp>
        <ShoppingList />
      </StyledApp>

      <TasksBoard />
    </>
  );
}

export default App;
