import { useState } from "react";
import ChartsExample from "../../components/ChartsExample";
import FavMovies from "../../components/FavMovies";
import FavMusic from "../../components/FavMusic";
import "./FinalProject.css";
import EmbedYoutube from "../../components/EmbedYoutube";
// you can test how to use Gemini API here
import GeminiApp from "../../gemini/GeminiApp";

export default function FinalProject() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMovies, setSearchMovies] = useState("");

  return (
    <div className="story-script-regular flex flex-col items-center min-h-screen bg-gradient-to-b from-[#1a1a1d] to-[#2d2d31] text-gray-200 font-sans p-6">
      {/* Search box with modern styling */}
      <div className="w-full flex justify-center bg-[#28a79a] py-4 shadow-xl rounded-b-3xl">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies, music, or paste youtube url..."
          className="p-3 border-2 border-transparent rounded-full w-full max-w-2xl focus:outline-none focus:ring-4 focus:ring-[#28a79a] transition-all duration-300 placeholder-gray-400 text-white-800 shadow-inner bg-[#3c3c41]"
        />
      </div>

      {/* Main content grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 min-h-[calc(100vh-120px)]">
        {/* Left column for main content */}
        {searchTerm === "" ? (
          <div className="md:col-span-2 flex flex-col space-y-6">
            {/* INR Chart card */}
            <div className="bg-[#2d2d31] p-6 rounded-3xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.01]">
              <h2 className="text-2xl font-extrabold text-[#28a79a] mb-4">
                Current INR Chart 📈
              </h2>
              {/* Placeholder for INR chart */}
              <div className="h-64 rounded-2xl flex items-center justify-center text-gray-400 font-medium text-lg">
                <ChartsExample />
              </div>
            </div>

            {/* Favourite Movies section */}
            <div className="bg-[#2d2d31] p-6 rounded-3xl shadow-2xl flex-grow">
              <div className="mb-4 flex flex-row space-y-2 md:space-y-0 md:space-x-4 items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[#28a79a] mb-4">
                  My Favourite Movies 🍿
                </h2>
                {/* search movies */}
                <input
                  type="text"
                  placeholder="Search movies..."
                  onChange={(e) => setSearchMovies(e.target.value)}
                  className="w-80 p-3 rounded-full bg-[#3c3c41] text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#28a79a] transition-all duration-300 shadow-inner"
                />
              </div>
              <FavMovies searchMovies={searchMovies} />
            </div>
          </div>
        ) : searchTerm.split("/").includes("www.youtube.com") ? (
          <EmbedYoutube searchTerm={searchTerm} />
        ) : (
          //   display what user is typing inside a card
          <div className="md:col-span-2 bg-[#2d2d31] p-6 rounded-3xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center">
            <h2 className="text-2xl font-extrabold text-[#28a79a]">
              {" "}
              Typing: {searchTerm}
            </h2>
          </div>
        )}

        {/* Right column */}
        <div className="md:col-span-1 flex flex-col space-y-6">
          {/* Weather card */}
          <div className="bg-[#2d2d31] p-6 rounded-3xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.01] flex-1">
            <h2 className="text-2xl font-extrabold text-[#28a79a] mb-4">
              Weather 🌤️
            </h2>
            <div className="flex flex-col items-center justify-center bg-[#3c3c41] rounded-2xl p-4">
              <span className="text-5xl text-[#28a79a] mb-2">☀️</span>
              <p className="text-gray-200 text-3xl font-bold">25°C</p>
              <p className="text-gray-400 text-lg mt-1">Sunny, Chennai</p>
            </div>
          </div>

          {/* Favourite Music section */}
          <div className="bg-[#2d2d31] p-6 rounded-3xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.01] flex-1">
            <h2 className="text-2xl font-extrabold text-[#28a79a] mb-4">
              My Favourite Music 🎶
            </h2>
            <FavMusic />
          </div>
        </div>
      </div>

      {/* add one plus icon inside a circle */}
      <div className="fixed bottom-8 right-8 bg-[#28a79a] text-white p-4 rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-110 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
  );
}
