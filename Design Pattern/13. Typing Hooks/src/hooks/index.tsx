import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Data, State } from "../types";

export const useUrl = (defaultUrl: string): readonly [string, Dispatch<SetStateAction<string>>] => {
  const [url, setUrl] = useState<string>(defaultUrl);

  return [url, setUrl] as const;
};

export const useUser = (src: string) => {
  const [state, setState] = useState<State>({ status: "fetching" });

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setState({ status: "fetching" });

        const response = await fetch(src, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const user = await response.json();

        console.log(user);

        setState({
          status: "success",
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const safeError = error instanceof Error ? error : new Error(String(error));

        console.error(safeError);

        setState({
          status: "error",
          error: safeError,
        });
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [src]);

  return state;
};

export const useFetchUser = <T,>(url: string): Data<T> => {
  const [data, setData] = useState<Data<T>>(["fetching", undefined]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(["success", data]))
      .catch((error) => setData(["error", error]));
  }, [url]);

  return data;
};
