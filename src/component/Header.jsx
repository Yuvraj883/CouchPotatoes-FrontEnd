import React, { useState } from "react";

const Header = () => {
  // Menu items array
  const menu = [
    { name: "Home", link: "/" },
    { name: "Top Rated", link: "/top-rated" },
    // { name: "Genres", link: "/genres" },
    {name:"About", link:"/about"},
    {name:"Contact", link:'https://yuvis-portfolio.vercel.app/'}
  ];

  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white px-4 py-3 md:px-8 flex items-center justify-between">
      {/* Logo Section */}
      <div className="text-lg flex flex-row items-center h-12 font-bold">
        <a href="/" className="hover:text-gray-300">
        <span className="text-4xl">🛋️ </span> CouchPotatoes
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
        </div>
      )}
    </header>
  );
};

export default Header;
