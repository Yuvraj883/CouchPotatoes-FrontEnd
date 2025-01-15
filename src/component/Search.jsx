import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`http://localhost:8000/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-bar-container p-4">
      <input
        type="text"
        className="border p-2 rounded-lg w-full"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
      >
        Search
      </button>

      <div className="results mt-4">
        {results.map((movie) => (
          <div key={movie._id} className="border p-4 rounded-lg mb-2 shadow">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p>{movie.fullplot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
