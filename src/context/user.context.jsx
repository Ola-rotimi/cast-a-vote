/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  // Create user context
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  // User provider
  const [currentUser, setCurrentUser] = useState(null); // Current user

  useEffect(() => {
    // Get user from local storage
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  //update user context and storage
  const updateUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
