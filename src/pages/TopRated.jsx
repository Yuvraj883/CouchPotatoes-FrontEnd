import React, { useEffect, useState } from 'react';
// import Header from '../components/Header'; // Your header component
import MovieCard from '../component/MovieCard'; // Your MovieCard component
import Pagination from '../component/Pagination'; // Pagination component

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    // Fetch top-rated movies from your backend API
    const fetchTopRatedMovies = async () => {
      try {
        const res = await fetch(`http://localhost:8000/movie/top-rated`);
        const data = await res.json();
        setMovies(data); // Assuming your API returns movies
        // setTotalMovies(data.totalMovies); // Assuming your API returns the total number of movies
      } catch (err) {
        console.log('Error fetching top-rated movies:', err);
      }
    };

    fetchTopRatedMovies();
  }, [page]);

  return (
    <div className="top-rated-movies-page bg-gray-900 text-white min-h-screen">
      
      <div className="container mx-auto mt-12 p-4">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Top Rated Movies
        </h1>

        {/* Movie list container */}
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center flex-wrap">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        {/* <div className="pagination mt-8 flex justify-center">
          <Pagination
            currentPage={page}
            totalItems={totalMovies}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div> */}
      </div>
    </div>
  );
};

export default TopRatedMovies;
