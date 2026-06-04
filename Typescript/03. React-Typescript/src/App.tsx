import { ReturnComponent1, ReturnComponent2 } from "./components/01-return";
import PropsComponent from "./components/02-props";
import StateComponent from "./components/03-state";
import EventComponent from "./components/04-events";
import ChallengeComponent from "./components/05-challenge";
import { ParentComponent, ContextComponent } from "./components/06-context";
import ReducerComponent from "./components/07-reducers";
import FetchDataComponent from "./components/08-fetch-data";
import RTKComponent from "./components/09-rtk";
import TaskComponent from "./components/10-tasks";

import "./App.css";

function App() {
  return (
    <>
      <main>
        <h1>React & Typescript</h1>

        <div className="wrapper">
          <h2>Return Type </h2>
          <ReturnComponent1 />
          <ReturnComponent2 />
        </div>

        <div className="wrapper">
          <h2>Props</h2>
          <PropsComponent name="Jane" age={25} />
          <PropsComponent name="John" age={30}>
            <p>This is a child node.</p>
          </PropsComponent>
        </div>

        <div className="wrapper">
          <h2>State</h2>
          <StateComponent />
        </div>

        <div className="wrapper">
          <h2>Events</h2>
          <EventComponent />
        </div>

        <div className="wrapper">
          <h2>Challenge</h2>
          <ChallengeComponent type="basic" name="Jane" />
          <ChallengeComponent type="advanced" name="John" email="john@example.com" />
        </div>

        <div className="wrapper">
          <h2>Context</h2>
          <ParentComponent />
          <ContextComponent />
        </div>

        <div className="wrapper">
          <h2>Reducers</h2>
          <ReducerComponent />
        </div>

        <div className="wrapper">
          <h2>Fetch Data</h2>
          <FetchDataComponent />
        </div>

        <div className="wrapper">
          <h2>RTK</h2>
          <RTKComponent />
        </div>

        <div className="wrapper">
          <h2>Tasks</h2>
          <TaskComponent />
        </div>
      </main>
    </>
  );
}

export default App;
