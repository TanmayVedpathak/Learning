import { useId } from "react";
import { updatableUser } from "./updatable-user";
import { updatableResource } from "./updatable-resource";

export const UserInfoForm = updatableResource(
  ({ user, onChangeUser, onPostUser, onResetUser }) => {
    const id = useId();
    const { name, age } = user || {};

    return user ? (
      <>
        <label htmlFor={`name-${id}`}>
          Name:
          <input id={`name-${id}`} type="text" value={name} onChange={(e) => onChangeUser({ name: e.target.value })} />
        </label>
        <label htmlFor={`age-${id}`}>
          Age:
          <input id={`age-${id}`} type="text " value={age} onChange={(e) => onChangeUser({ age: e.target.value })} />
        </label>
        <button onClick={onPostUser}>Save</button>
        <button onClick={onResetUser}>Reset</button>
      </>
    ) : (
      <>
        <h3>Loading...</h3>
      </>
    );
  },
  "/api/users/2",
  "user",
);
