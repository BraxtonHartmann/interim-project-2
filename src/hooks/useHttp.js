import { useState, useCallback } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: options.headers || {},
        body: options.body
          ? JSON.stringify(options.body)
          : undefined,
      });

      if (!response.ok) {
        throw new Error("Request failed. Please try again.");
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, sendRequest };
}

export default useHttp;