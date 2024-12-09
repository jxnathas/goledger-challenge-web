"use client";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useMusic } from "@/app/context/MusicContext";

export const Header = ({ setSearchResults }) => {
  const { searchAssets } = useMusic();
  const [query, setQuery] = useState("");

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {
      const results = await searchAssets(event.target.value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="flex justify-between items-center py-3 px-3 mb-3 bg-white">
      {/* Logo */}
      <div className="flex items-center flex-1 space-x-4">
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-white text-teal-400 rounded-full px-6 py-2">
            GoMusic
          </span>
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-3xl" />
          <div className="absolute left-12 top-1/2 transform -translate-y-1/2 h-6 w-px bg-gray-300"></div>
          <input
            type="text"
            placeholder="What's popping?"
            className="bg-neutral-100 py-2 pl-14 pr-4 rounded-full w-full h-12 text-lg focus:outline-none focus:ring-2 focus:ring-teal-800"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center flex-1 justify-end space-x-4">
        <button className="text-turquoise py-2 px-6 rounded-full font-bold hover:scale-105">
          Sign up
        </button>
        <button className="bg-teal-700 text-white py-3 px-6 rounded-full font-bold hover:scale-105">
          Log in
        </button>
      </div>
    </header>
  );
};