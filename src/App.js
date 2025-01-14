import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Your homepage component
import MovieDetails from './pages/MovieDetails'; // Your movie details component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
