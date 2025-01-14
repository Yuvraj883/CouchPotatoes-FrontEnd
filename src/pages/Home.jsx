import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';
import MovieCard from '../component/MovieCard';
import GenreList from '../component/Genres';

export default function Home() {
  const url = 'http://localhost:8000/movie';
  const [movies, setMovies] = useState([]); 

  // Fetch movies function
  async function fetchMovies(url) {
    const res = await fetch(url); 
    const listOfMovies = await res.json(); // Await the parsing of JSON
    setMovies(listOfMovies);
  }

  useEffect(() => {
    fetchMovies(url); // Pass the URL correctly
  }, [movies]); // Empty dependency array to run once on component mount

  return (
    <>
      <Header />
      <HeroSection />
      <GenreList/>
      <div className="flex flex-row justify-center items-center flex-wrap gap-2">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} /> // Pass movie as a prop
        ))}
      </div>
    </>
  );
}
