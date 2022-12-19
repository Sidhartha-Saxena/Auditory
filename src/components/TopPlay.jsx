import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-row items-center w-full hover:bg-rose-700 py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="text-white text-base font-bold mr-3">{i + 1}.</h3>
    <div className=" flex flex-row justify-between items-center">
      <img
        src={song?.images?.coverart || song.hub.image}
        alt={song?.title}
        className="rounded-xl w-14"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center mx-3">
      <Link to={`/songs/${song?.key}`}>
        <p className="text-white font-bold text-xl">{song?.title}</p>
      </Link>
      {song?.artists && <Link to={`/artists/${song?.artists[0].adamid}`}>
        <p className="text-gray-300 text-base mt-1">{song?.subtitle}</p>
      </Link>}
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);
export default function TopPlay() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  // console.log(data);

  const topPlays = data?.slice(0,10);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  console.log(topPlays)
  return (
    <div
      
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 lg:max-w-[400px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-cyan-400 text-base cursor-pointer hover:text-rose-700">
              See More
            </p>
          </Link>
        </div>
        <div className=" mt-4 flex flex-col gap-1">
          {topPlays?.slice(0, 5)?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
        <div className="w-full flex flex-col mt-2">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-cyan-400 text-base cursor-pointer hover:text-rose-700">
                See More
              </p>
            </Link>
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-2"
          >
            {topPlays?.map((artist) => (
              <SwiperSlide
                key={artist?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                { <Link to={artist?.artists && `/artists/${artist?.artists[0]?.adamid}`}>
                  <img
                    src={artist?.images?.background || artist?.hub?.image}
                    alt="Name"
                    className="rounded-full w-full object-cover object-center"
                  />
                </Link>}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
