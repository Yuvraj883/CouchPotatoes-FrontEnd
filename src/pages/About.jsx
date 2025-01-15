import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600">About Movie Review App</h1>
      <div className="mt-6 text-lg">
        <p>
          Welcome to the Movie Review App! This application allows movie enthusiasts to explore a wide range of films, discover new favorites, and dive into detailed movie information.
        </p>
        <p className="mt-4">
          Our app provides a user-friendly interface for browsing movies, filtering by genres, reading reviews, and staying up-to-date with top-rated films.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-600">Features</h2>
        <ul className="list-disc pl-6 mt-4">
          <li>Explore movies by genre</li>
          <li>View detailed information about each movie</li>
          <li>Get top-rated movie suggestions</li>
          <li>Easy-to-use interface with dynamic content</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-600">Technologies Used</h2>
        <ul className="list-disc pl-6 mt-4">
          <li>React for the frontend</li>
          <li>Node.js & Express for the backend</li>
          <li>MongoDB for the database</li>
          <li>Tailwind CSS for styling</li>
        </ul>
      </div>

      <div className="mt-6 text-lg">
        <p>
          Our goal is to make it easier for movie lovers to find great films and learn more about their favorite titles. We hope you enjoy using our app!
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold">Created by: Yuvraj Singh</p>
      </div>
    </div>
  );
};

export default AboutPage;
