import { BookInfo } from "./components/book-info";
import { UserInfo } from "./components/user-info";
import CurrentUser from "./components/current-user";
import DataSource from "./components/data-source";
import ResourceLoader from "./components/resource-loader";
import UserLoader from "./components/user-loader";

function App() {
  return (
    <>
      <h1>Start Here!</h1>
      <hr />
      <CurrentUser>
        <UserInfo />
      </CurrentUser>

      <hr />
      <UserLoader userId={"3"}>
        <UserInfo />
      </UserLoader>

      <hr />
      <ResourceLoader resourceURL={"/api/users/2"} resourceName={"user"}>
        <UserInfo />
      </ResourceLoader>

      <hr />
      <ResourceLoader resourceURL={"/api/books/2"} resourceName={"book"}>
        <BookInfo />
      </ResourceLoader>

      <hr />
      <DataSource
        getData={async () => {
          const response = await fetch("/api/books/2");
          const data = await response.json();
          return data;
        }}
        render={(resource) => <BookInfo book={resource} />}
      />
    </>
  );
}

export default App;
