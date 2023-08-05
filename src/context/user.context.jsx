/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserContext = createContext({
  // Create user context
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  // User provider
  const [currentUser, setCurrentUser] = useState(null); // Current user

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
