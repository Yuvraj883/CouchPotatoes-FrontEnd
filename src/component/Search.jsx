import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const res = await fetch(`http://localhost:8000/movie/search?q=${query}`);
        const data = await res.json();
        
        console.log(data);

        if (data && Array.isArray(data.result)) {
            console.log(data);
          onSearch(data.result); // Pass the fetched movies to the parent component
        } else {
          onSearch([]); // Send an empty array if no results are found
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        onSearch([]); // Clear movies if there's an error
      }
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
    </div>
  );
}

export default SearchBar;
