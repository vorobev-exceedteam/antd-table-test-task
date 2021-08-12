import React, { memo, useState } from 'react';
import MethodsContext from '../context/MethodsContext';

const MethodsProvider = ({ initMethods = {}, children }) => {
  const [methods, setMethods] = useState(initMethods);

  return (
    <MethodsContext.Provider value={[methods, setMethods]}>
      {children}
    </MethodsContext.Provider>
  );
};

export default memo(MethodsProvider);
