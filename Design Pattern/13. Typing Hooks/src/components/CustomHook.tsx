import { useFetchUser, useUrl } from "../hooks";

const CustomHook = () => {
  const [url, setUrl] = useUrl("google.com");
  //   const state = useUser("/api/books");

  //   //   if (state === "non-existing-state") {
  //   //   }

  //   if (state.status === "fetching") {
  //     return "fetching...";
  //   }

  //   if (state.status === "success") {
  //     return "fetched";
  //   }

  //   if (state.status === "error") {
  //     return "Error";
  //   }

  const [state, data] = useFetchUser("/api/books");

  //   if (state === "non-existing-state") {
  //   }

  if (state === "fetching") {
    return "fetching...";
  }

  if (state === "success") {
    console.log(data);
    return JSON.stringify(data);
  }

  if (state === "error") {
    console.log(data);
    return "Error";
  }

  return (
    <>
      {url.toLocaleUpperCase()} <br />
      <button onClick={() => setUrl((prev) => (prev === "google.com" ? "bing.com" : "google.com"))}>Change URL</button>
    </>
  );
};

export default CustomHook;
