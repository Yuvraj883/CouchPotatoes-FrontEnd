import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';
import MovieCard from '../component/MovieCard';
import GenreList from '../component/Genres';
import Pagination from '../component/Pagination'; // Import Pagination component
import SearchBar from '../component/Search';

export default function Home() {
  const url = 'http://localhost:8000/movie';
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [pageSize, setPageSize] = useState(9); // State for page size (number of movies per page)

  // Fetch movies function with pagination
  async function fetchMovies(url, genres = [], page = 1, pageSize = 9) {
    let queryParams = `?page=${page}&pageSize=${pageSize}`;
    
    if (genres.length) {
      queryParams += `&genres=${genres.join(',')}`;
    }

    const res = await fetch(url + queryParams); // Pass genres and pagination as query parameters
    const data = await res.json(); // Await the parsing of JSON

    setMovies(data.movies); // Set movies to the state
    setTotalPages(data.totalPages); // Set total pages to state
  }

  // Effect hook to fetch movies whenever selected genres or currentPage changes
  useEffect(() => {
    fetchMovies(url, selectedGenres, currentPage, pageSize); // Pass selected genres and pagination params
  }, [selectedGenres, currentPage, pageSize]); // Trigger when selectedGenres or currentPage changes

  // Function to handle genre selection
  const handleGenreSelect = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre); // Deselect if already selected
      } else {
        return [...prevGenres, genre]; // Add the genre if not already selected
      }
    });
  };

  return (
    <>
      
      <HeroSection />
      <GenreList
        onGenreSelect={handleGenreSelect}
        selectedGenres={selectedGenres} // Pass selected genres to GenreList
      />
      <SearchBar/>
      <div className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-2">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} /> // Pass movie as a prop
        ))}
      </div>
      
      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Update the current page when user clicks a new page
      />
    </>
  );
}
