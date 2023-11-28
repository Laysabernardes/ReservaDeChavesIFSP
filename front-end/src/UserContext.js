import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Informações do usuário
  const [chavesData, setChavesData] = useState(null); // Informações das chaves

  return (
    <UserContext.Provider value={{ userData, setUserData, chavesData, setChavesData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
