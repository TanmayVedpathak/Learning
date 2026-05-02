import { useEffect, useState } from "react";

export const useUser = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [userId]);

  return user;
};
