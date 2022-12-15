import { Error, Loader, SongCard, TopPlay } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Discover() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { genreListId } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const divWidth = useRef();
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  const [width, setWidth] = useState(window.innerWidth);
  const handle = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);

  if (isFetching) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div
      className="h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex lg:flex-row flex-col"
      ref={divWidth}
    >
      <div className="flex-1 h-fit mb-8">
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">
              Discover
            </h2>
            <select
              onChange={(e) => dispatch(selectGenreListId(e.target.value))}
              value={genreListId || "pop"}
              className="bg-stone-900 p-2 outline-none text-rose-500 text-sm rounded-lg sm:mt-0 mt-5"
            >
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8 md:flex xs:hidden sm:hidden">
            {data?.map((song, i) => {
              return (
                <SongCard
                  key={song?.key}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  song={song}
                  i={i}
                />
              );
            })}
          </div>

          <div
            className={`xs:w-[320px] sm:w-[600px] xl:hidden lg:hidden md:hidden`}
          >
            <Swiper
              slidesPerView={width < 640 ? 1 : 2}
              loop={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {data?.map((song, i) => (
                <SwiperSlide
                  key={song?.key}
                  className=" flex items-center justify-center"
                >
                  <SongCard
                    key={song?.key}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    song={song}
                    i={i}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="xl:sticky relative top-0 h-fit">
        <TopPlay />
      </div>
    </div>
  );
}
