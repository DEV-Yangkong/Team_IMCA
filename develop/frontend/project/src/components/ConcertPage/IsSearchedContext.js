import { createContext, useContext, useState } from 'react';

const IsSearchedContext = createContext();

export const IsSearchedProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);

  return (
    <IsSearchedContext.Provider value={{ isSearched, setIsSearched }}>
      {children}
    </IsSearchedContext.Provider>
  );
};

export const useIsSearched = () => {
  return useContext(IsSearchedContext);
};
