// import { useState } from "react";
// import { PrimaryButton, SecondaryButton } from "./components/Buttons";
// import { GlobalStyles, darkTheme, primaryTheme } from "./style";
// import { ThemeProvider } from "styled-components";

// import { RegisterModal } from "./components/RegisterModal";

import SubscribeForm from "./components/1-layers-pattern/SubscribeForm";
import InfoForm from "./components/2-split-pattern/InfoForm";
import InfoFormWithColumns from "./components/3-column-pattern/InfoFormWithColumns";
import Cards from "./components/4-grid-pattern/Cards";
import Menu from "./components/5-inline-bundle-pattern/Menu";
import Menu2 from "./components/6-inline-pattern/Menu2";
import PlanList from "./components/7-pad-pattern/PlanList";
import Profile from "./components/8-center-pattern/Profile";
import NewProductsList from "./components/9-media-wrapper-pattern/NewProductsList";
import HeroPage from "./components/10-cover-pattern/HeroPage";
import MainPage from "./components/11-final-project/MainPage";
import Modal from "./components/12-modal-project/Modal";

import "./App.css";

function App() {
  // const [useDarkTheme, setDarkTheme] = useState(false);

  return (
    <>
      {/* <button
        style={{
          margin: "0 18px 26px",
          padding: "10px",
          background: "none",
          cursor: "pointer",
          border: "3px solid #FFFF",
        }}
        onClick={() => setDarkTheme(false)}
      >
        Light
      </button>
      <button
        style={{
          margin: "0 18px 26px",
          padding: "10px",
          background: "none",
          cursor: "pointer",
          border: "3px solid #FFFF",
        }}
        onClick={() => setDarkTheme(true)}
      >
        Dark
      </button>
      <ThemeProvider theme={useDarkTheme ? darkTheme : primaryTheme}>
        <div
          style={{
            background: useDarkTheme ? primaryTheme.primaryColor : darkTheme.primaryColor,
            position: "absolute",
            left: "0",
            width: "100vw",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <PrimaryButton>Click me!</PrimaryButton>
          <SecondaryButton>Click me too!</SecondaryButton>
          <GlobalStyles />
        </div>
        <RegisterModal />
      </ThemeProvider> */}

      <SubscribeForm />
      <InfoForm />
      <InfoFormWithColumns />
      <Cards />
      <Menu />
      <Menu2 />
      <PlanList />
      <Profile />
      <NewProductsList />
      <HeroPage />
      <MainPage />

      <Modal />
    </>
  );
}

export default App;
