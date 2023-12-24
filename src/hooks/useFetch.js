import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = response.json();

  if (!response.ok) {
    throw new Error(
      error.message || "Something went wrong, failed to send request"
    );
  }

  return resData;
}

const useFetch = function useFetch(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(
          error.message || "Something went wrong, failed to send request"
        );
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method || !config)) {
      sendRequest();
    }
  }, [sendRequest, config, url]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
