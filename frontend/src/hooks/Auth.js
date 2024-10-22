// Auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Note: Remove the curly braces

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const currentUser = jwtDecode(JSON.parse(loggedInUser).token);
      setUser(currentUser);
    }
    setLoading(false); 
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
