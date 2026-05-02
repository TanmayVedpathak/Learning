import { useEffect } from "react";
import { useState } from "react";

export const useCurrentUser = () => {
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

  return user;
};
