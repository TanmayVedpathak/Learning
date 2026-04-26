import { checkProps } from "./components/check-props";
import { fetchUser } from "./components/fetch-user";
import { updatableResource } from "./components/updatable-resource";
import { updatableUser } from "./components/updatable-user";
import { UserInfoForm } from "./components/user-form";
import { UserInfo } from "./components/user-info";

const UserInfoWrapper = checkProps(UserInfo);
const FetchUserWrapper = fetchUser(UserInfo, 1);
const UpdatableUserWrapper = updatableUser(UserInfo, 2);

function App() {
  return (
    <>
      <UserInfoWrapper propA="test1" blabla={{ a: 1, age: 23 }} />
      <hr />
      <FetchUserWrapper />
      <hr />
      <UpdatableUserWrapper />
      <hr />
      <UserInfoForm />
      <hr />
    </>
  );
}

export default App;
