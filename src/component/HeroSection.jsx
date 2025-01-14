import heroImage from '../assets/hero.jpg'; // Adjust path based on your file structure

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-6">
            Discover Your Next <br />
            <span className="text-yellow-500">Favorite Movie!</span>
          </h1>
          <p className="text-lg mb-8">
            Explore top-rated, trending, and upcoming movies, all in one place. 
            Find your favorites or discover something new!
          </p>
          <div>
            <a
              href="/movies"
              className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
            >
              Browse Movies
            </a>
            <a
              href="/about"
              className="ml-4 px-8 py-3 border border-white text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-8 md:mt-0">
          <img
            src={heroImage}
            alt="movies"
            className="rounded-lg shadow-lg h-[400px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
