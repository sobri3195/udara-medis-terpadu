import { useState, useCallback } from 'react';

interface AsyncState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

interface UseAsyncReturn<T, Args extends any[]> extends AsyncState<T> {
  execute: (...args: Args) => Promise<T | null>;
  reset: () => void;
}

export function useAsync<T, Args extends any[] = []>(
  asyncFunction: (...args: Args) => Promise<T>
): UseAsyncReturn<T, Args> {
  const [state, setState] = useState<AsyncState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState({ loading: true, error: null, data: null });
      try {
        const response = await asyncFunction(...args);
        setState({ loading: false, error: null, data: response });
        return response;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error occurred');
        setState({ loading: false, error: err, data: null });
        return null;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ loading: false, error: null, data: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export default useAsync;
