import React, { useEffect, useState } from "react";


const GenreList = () => {
  const apiUrl = 'http://localhost:8000/movie/genres';
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(apiUrl);
        const res = await response.json();
        setGenres(res || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch genres.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading genres...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-2 mb-2">
      
      <ul className=" flex flex-row bg-gray-100 overflow-x-auto whitespace-nowrap py-2 rounded-md mb-4">
        {genres.map((genre, index) => (
          <li key={index} className="text-gray-700 bg-white px-2 py-1 h-8 rounded-l-full rounded-r-full mx-2 cursor-pointer hover:bg-blue-500">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
