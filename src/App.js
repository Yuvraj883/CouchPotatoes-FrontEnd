import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Your homepage component
import MovieDetails from './pages/MovieDetails'; // Your movie details component
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Dynamic route */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
