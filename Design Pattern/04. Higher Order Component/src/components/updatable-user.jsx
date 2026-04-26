import { useEffect, useState } from "react";

export const updatableUser = (Component, userId) => {
  return (props) => {
    const [initialUser, setInitialUser] = useState(null);
    const [user, setUser] = useState(null);

    const onChangeUser = (update) => {
      setUser((prev) => ({ ...prev, ...update }));
    };

    const onPostUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setInitialUser(data);
        setUser(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    const onResetUser = () => setUser(initialUser);

    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(`/api/users/${userId}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          setInitialUser(data);
          setUser(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      })();
    }, []);

    return <Component {...props} user={user} onChangeUser={onChangeUser} onPostUser={onPostUser} onResetUser={onResetUser} />;
  };
};
