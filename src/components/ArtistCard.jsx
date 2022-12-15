import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function ArtistCard({track}) {
  const navigate=useNavigate();
  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-opacity-80 backdrop-blur-3xl animate-slideup rounded-3xl cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img alt="Artist Image" src={track?.images?.background} className="w-full h-56 rounded-full drop-shadow-[0_0_5px_rgba(255,255,255,0.25)]" />
      <p className="mt-4 font-semibold text-lg text-white text-center truncate">
        {track?.subtitle}
      </p>
    </div>
  )
}
