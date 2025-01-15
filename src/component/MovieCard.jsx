import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const description = movie.plot || movie.fullplot || 'No description available';

  return (
    <div className="max-w-sm md:w-[32%] rounded overflow-hidden p-2 shadow-lg bg-gray-800 text-white">
      <Link
          to={`/movie/${movie._id}`}  // Using the movie's unique ID in the URL
          className="text-blue-500 hover:underline mt-2 block"
        >
      <img
        src={movie.poster || 'default-image-url.jpg'}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-1">{movie.title || 'No title available'}</h2>
        <p className="text-gray-400 text-base">{description.slice(0, 100)}...</p>
        <p className="text-yellow-400 text-sm font-semibold">
          Rating: {movie.imdb?.rating || 'N/A'}
        </p>
        {/* Link to the full details page */}
        <Link
          to={`/movie/${movie._id}`}  // Using the movie's unique ID in the URL
          className="text-blue-500 hover:underline mt-2 block"
        >
          View Full Details
        </Link>
      </div>
      </Link>
    </div>
  );
}

export default MovieCard;
