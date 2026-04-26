import React, { useEffect, useState } from "react";

const UserLoader = ({ userId, children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error(response.error);
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [userId]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { user });
        }

        return child;
      })}
    </>
  );
};

export default UserLoader;
