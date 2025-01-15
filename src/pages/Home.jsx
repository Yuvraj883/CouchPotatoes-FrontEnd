import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';
import MovieCard from '../component/MovieCard';
import GenreList from '../component/Genres';

export default function Home() {
  const url = 'http://localhost:8000/movie';
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres

  // Fetch movies function
  async function fetchMovies(url, genres = []) {
    let queryParams = '';
    if (genres.length) {
      queryParams = `?genres=${genres.join(',')}`;
    }

    const res = await fetch(url + queryParams); // Pass genres as query parameters
    const listOfMovies = await res.json(); // Await the parsing of JSON
    setMovies(listOfMovies);
  }

  // Effect hook to fetch movies whenever selected genres change
  useEffect(() => {
    fetchMovies(url, selectedGenres); // Pass selected genres to fetchMovies
  }, [selectedGenres]); // Fetch movies whenever selectedGenres changes

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
      <div className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-2">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} /> // Pass movie as a prop
        ))}
      </div>
    </>
  );
}
