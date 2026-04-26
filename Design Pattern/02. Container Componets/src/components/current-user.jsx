import React, { useEffect, useState } from "react";

const CurrentUser = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/current-user");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

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

export default CurrentUser;
