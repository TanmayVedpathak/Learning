import { NavLink, Outlet, useNavigation } from "react-router-dom";
import pageList from "../../constants";
import Loader from "../Loader";

const MainLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <>
      <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <h1>React App</h1>

        <nav style={{ display: "flex", gap: "12px" }}>
          {pageList.map((page) => (
            <NavLink key={page.title} to={page.path}>
              {page.title}
            </NavLink>
          ))}
        </nav>
      </header>

      <main style={{ padding: "16px" }}>{isLoading ? <Loader /> : <Outlet />}</main>
    </>
  );
};

export default MainLayout;
