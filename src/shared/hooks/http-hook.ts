import { useCallback, useRef, useState } from "react";
import type { IResponse, ISendRequest } from "../../interface";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      request: ISendRequest,
      body?: BodyInit
    ): Promise<IResponse | undefined> => {
      try {
        setIsLoading(true);

        const httpAbortController = new AbortController();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => !reqCtrl.signal.aborted
        );

        activeHttpRequests.current.push(httpAbortController);

        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body,
          signal: httpAbortController.signal,
        });

        const responseData: IResponse = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   return () => {
  //     activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
};
