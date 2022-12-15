import React, {useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const navigate=useNavigate();
  const [searchSong,setSearchSong]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate(`/search/${searchSong}`)
  }
  return (
    <form
      autoComplete="off"
      className="p-2 text-cyan-400 focus-within:text-white"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4 text-cyan-400" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchSong}
          onChange={(e)=>{setSearchSong(e.target.value)}}
          className='flex-1 bg-transparent border-none placeholder-gray-400 outline-none text-base text-white p-4'
        />
      </div>
    </form>
  );
}
