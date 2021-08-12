import { useCallback, useEffect, useMemo, useState } from 'react';

const createInitState = (initDataState) => ({
  data: initDataState || null,
  error: null,
  fetch: true,
});

const useMultipleFetch = (fetchFunctions = [], initDataStates = []) => {
  const [isLoading, setLoading] = useState(true);
  const [innerState, setInnerState] = useState(
    fetchFunctions.map((fetch, index) => createInitState(initDataStates[index]))
  );

  useEffect(async () => {
    if (innerState.length && fetchFunctions.length) {
      const fetchIndexes = [];
      const promises = fetchFunctions.reduce((promises, fetch, index) => {
        if (innerState[index].fetch) {
          fetchIndexes.push(index);
          return [...promises, fetch()];
        }
        return promises;
      }, []);
      if (promises.length) {
        const settledPromises = await Promise.allSettled(promises);
        const newState = [...innerState];
        settledPromises.forEach((settledPromise, index) => {
          const fetchState = newState[fetchIndexes[index]];
          fetchState.fetch = false;
          if (settledPromise.status === 'rejected') {
            fetchState.data = initDataStates[fetchIndexes[index]] || null;
            fetchState.error = settledPromise.error;
          } else {
            fetchState.data = settledPromise.value;
            fetchState.error = null;
          }
        });
        setInnerState(newState);
      }
      setLoading(false);
    }
  }, [innerState]);

  const createRefetch = (index) => () => {
    const newState = [...innerState];
    newState[index].fetch = true;
    setInnerState(newState);
    setLoading(true);
  };

  const refetchAll = useCallback(() => {
    const newState = innerState.map((state) => ({ ...state, fetch: true }));
    setInnerState(newState);
    setLoading(true);
  }, [innerState]);

  const data = useMemo(
    () =>
      innerState.map(({ data, error }, index) => ({
        data,
        error,
        refetch: createRefetch(index),
      })),
    [innerState]
  );

  return [isLoading, refetchAll, ...data];
};

export default useMultipleFetch;
