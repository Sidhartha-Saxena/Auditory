import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  DetailsHeader,
  Error,
  Loader,
  RelatedSongs,
  TopPlay,
} from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { FiFrown } from "react-icons/fi";

export default function SongDetails() {
  const { songid } = useParams();
  // console.log(songid);
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);
  const {
    data,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery(songid);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  // const songData=null
  if (isFetchingSongDetails || isFetchingSongRelated) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
      <div className="flex-1 h-fit ">
        <div className="flex flex-col">
          <DetailsHeader
            songData={songData}
            bgColor={songData?.images?.joecolor?.slice(2, 8) || "44403c"}
          />
          <div className="mb-10 mt-5">
            <h2 className="font-bold text-white text-3xl">Lyrics</h2>
            <div className="mt-5 w-full">
              {songData?.sections[1].type === "LYRICS" ? (
                songData?.sections[1]?.text.map((line, i) => (
                  <p
                    key={`lyrics-${line}-${i}`}
                    className="text-gray-200 text-base my-1"
                  >
                    {line}
                  </p>
                ))
              ) : (
                <div className="flex flex-col items-center justify-between">
                  
                  <FiFrown size={50} className="text-gray-200" />
                  <p className="text-gray-200 text-base my-1">
                    Sorry, No lyrics found!
                  </p>
                </div>
              )}
            </div>
          </div>
          <RelatedSongs
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>
      </div>
      <div className="xl:sticky relative top-0 h-fit lg:block md:hidden sm:hidden xs:hidden">
        <TopPlay />
      </div>
    </div>
  );
}
