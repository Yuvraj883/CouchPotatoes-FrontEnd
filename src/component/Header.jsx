import React from 'react';

function Header() {
  const navMenu = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Movies',
      path: '/movies'
    },
    {
      name: 'Top Rated',
      path: '/top-rated'
    },
    {
      name: 'About Us',
      path: '/about'
    },
    {
      name: 'Contact',
      path: '/contact'
    }
  ];

  return (
    <nav className="flex flex-row justify-between items-center px-6 py-4 bg-gray-800 shadow-lg">
      <div>
        <span className="font-bold text-2xl text-yellow-500">
          <span className="text-3xl px-2">🍿</span> Movie Galaxy
        </span>
      </div>
      <div>
        <ul className="flex flex-row justify-center items-center space-x-6">
          {navMenu.map((menu, id) => (
            <a
              key={id}
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              href={menu.path}
            >
              <li>{menu.name}</li>
            </a>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
