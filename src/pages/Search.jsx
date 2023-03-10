import React,{useRef ,useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";


export default function Search() {
  const {searchTerm}=useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs=data?.tracks?.hits?.map((song)=>song.track);
  const divWidth = useRef();
  useEffect(() => {
    if(!isFetching && !error) {divWidth.current.scrollIntoView();}
  });

  if (isFetching ) {
    return <Loader />;
  }
  if (error ) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-white text-3xl mt-4 mb-10" ref={divWidth}><span className="text-gray-500 text-xl">Showing Results for</span>   {searchTerm.toUpperCase()}</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

