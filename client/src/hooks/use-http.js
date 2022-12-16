import { useState } from "react";

export const useHttp = (setData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async (configObj) => {
    setIsLoading(true);
    try {
      const response = await fetch(configObj.url, {
        method: configObj.method ? configObj.method : "GET",
        withCredentials: true,
        crossorigin: true,
        mode: "cors",
        headers: configObj.headers ? configObj.headers : {},
        body: configObj.body ? JSON.stringify(configObj.body) : null,
      });
      if (!response.ok) throw new Error("request failed");
      const data = await response.json();
      setData && setData(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message || "something went wrong");
      setIsLoading(false);
    }
  };
  return { isLoading, error, getData };
};
