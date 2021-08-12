import MethodsContext from '../context/MethodsContext';
import { useCallback, useContext, useEffect, useRef } from 'react';

const useMethodRegistration = (
  scope,
  methodsMap = {},
  clearOnUnmount = true
) => {
  const [methods, setMethods] = useContext(MethodsContext);
  const oldMethods = useRef({});

  if (!scope) {
    throw new Error('useMethodRegistration: scope is required');
  }

  const clearMethods = useCallback(() => {
    const newMethods = { ...methods };
    delete newMethods[scope];
    setMethods(newMethods);
  }, [methods, scope]);

  useEffect(() => {
    if (methodsMap !== oldMethods.current) {
      setMethods({ ...methods, [scope]: { ...methodsMap } });
      oldMethods.current = methodsMap;
      if (clearOnUnmount) {
        return () => clearMethods();
      }
    }
  }, [methodsMap]);

  return clearMethods;
};

export default useMethodRegistration;
