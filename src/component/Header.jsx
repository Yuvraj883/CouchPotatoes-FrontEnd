import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Menu items array
  const menu = [
    { name: "Home", link: "/" },
    { name: "Top Rated", link: "/top-rated" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "https://yuvis-portfolio.vercel.app/" },
  ];

  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to manage user login status and name
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Function to check and decode the auth token
    const checkAuthToken = () => {
      const authToken = localStorage.getItem("authToken"); // Retrieve the token
      if (authToken) {
        try {
          const user = JSON.parse(atob(authToken.split(".")[1])); // Decode JWT payload
          setUserName(user.name); // Set user's name
        } catch (error) {
          console.error("Error parsing auth token:", error);
        }
      } else {
        setUserName(null); // Clear the userName if no token exists
      }
    };

    // Initial check
    checkAuthToken();

    // Add event listener to listen for changes in localStorage
    window.addEventListener("storage", checkAuthToken);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setUserName(null); // Clear user info
    navigate("/login");
  };

  return (
    <header
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-3 md:px-8 flex items-center justify-between shadow-lg"
    >
      {/* Logo Section */}
      <div className="text-lg flex flex-row items-center h-12 font-bold">
        <a href="/" className="hover:text-gray-300">
          <span className="text-4xl">🛋️</span> CouchPotatoes
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4">
        {menu.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="hover:text-gray-300 transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* User or Login/Sign-Up Section */}
      <div className="flex items-center gap-4">
        {userName ? (
          <div className="flex items-center gap-2">
            {/* Profile Icon */}
            <div
              className="w-10 h-10 rounded-full bg-white text-gray-800 font-bold flex items-center justify-center cursor-pointer"
              title={userName}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-sm bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-white hover:text-gray-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center md:hidden">
          {menu.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="py-2 px-4 w-full text-center hover:bg-gray-700 transition-colors"
            >
              {item.name}
            </a>
          ))}
          {userName ? (
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-2 bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
