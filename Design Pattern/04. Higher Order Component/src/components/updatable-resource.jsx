import { useEffect, useState } from "react";

const toCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const updatableResource = (Component, resourceUrl, resourceName) => {
  return (props) => {
    const [initialResource, setInitialResource] = useState(null);
    const [resource, setResource] = useState(null);

    const onChangeResource = (update) => {
      setResource((prev) => ({ ...prev, ...update }));
    };

    const onPostResource = async () => {
      try {
        const response = await fetch(resourceUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [resourceName]: resource }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setInitialResource(data);
        setResource(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    const onResetResource = () => setResource(initialResource);

    const resourceProps = {
      [resourceName]: resource,
      [`onChange${toCapital(resourceName)}`]: onChangeResource,
      [`onPost${toCapital(resourceName)}`]: onPostResource,
      [`onReset${toCapital(resourceName)}`]: onResetResource,
    };

    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(resourceUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          setInitialResource(data);
          setResource(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      })();
    }, []);

    return <Component {...props} {...resourceProps} />;
  };
};
