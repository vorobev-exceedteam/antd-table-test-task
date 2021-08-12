import { useCallback, useContext } from 'react';
import MethodsContext from '../context/MethodsContext';

const useMethods = (scope) => {
  const [methods] = useContext(MethodsContext);

  if (!scope) {
    throw new Error('useMethods: scope is required');
  }

  const getMethod = useCallback(
    (name) => {
      const foundMethod = methods[scope][name];
      if (foundMethod) {
        return foundMethod;
      }
      throw new Error(
        `useMethods: Method ${name} in scope ${scope} is not exists`
      );
    },
    [scope, methods]
  );

  const callMethod = useCallback(
    (name, ...args) => {
      const foundMethod = methods[scope][name];
      if (foundMethod) {
        return foundMethod(...args);
      }
      throw new Error(
        `useMethods: Method ${name} in scope ${scope} is not exists`
      );
    },
    [scope, methods]
  );

  return [getMethod, callMethod];
};

export default useMethods;
