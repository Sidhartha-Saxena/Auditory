import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard,SongBar } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

export default function TopCharts() {

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  if (isFetching ) {
    return <Loader />;
  }
  if (error ) {
    return <Error />;
  }
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-white text-3xl mt-4 mb-10">Top Charts</h2>
      <div className="sm:hidden md:hidden xs:hidden lg:flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((song, i) => (
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
      <div className="lg:hidden xl:hidden 2xl:hidden flex flex-wrap sm:justify-start justify-center gap-8 ">
      {data?.map((song, i) => (
          <SongBar
            key={`${song.key}`}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            className='lg:hidden xl:hidden 2xl:hidden'
          />
        ))}
      </div>
    </div>
  );
}

