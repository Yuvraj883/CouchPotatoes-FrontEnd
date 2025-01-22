import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionally validate the token by decoding it or sending it to the server
      const isValid = validateToken(token); // Replace with your validation logic
      setIsAuthenticated(isValid);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const validateToken = (token) => {
    // Example: Perform basic validation or decode the token
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode the token
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
