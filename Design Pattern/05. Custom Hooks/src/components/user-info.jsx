import { useCallback } from "react";

import { useCurrentUser } from "./current-user-hook";
import { useUser } from "./user.hook";
import { useResource } from "./resource.hook";
import { useDataResource } from "./data-resource.hook";

export const UserInfo = ({ userId }) => {
  const fetchData = useCallback(async () => {
    const response = await fetch("/api/users/2");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }, []);

  // const user = useCurrentUser();
  // const user = useUser(userId);
  // const user = useResource("/api/users/2");
  const user = useDataResource(fetchData);

  const { name, age, country, books } = user || {};

  return user ? (
    <>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
