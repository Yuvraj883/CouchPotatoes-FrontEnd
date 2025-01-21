import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenExpiry = JSON.parse(atob(token.split(".")[1])).exp * 1000; // Decode token expiry
        if (Date.now() < tokenExpiry) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token"); // Remove expired token
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error decoding token", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
