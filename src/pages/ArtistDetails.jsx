import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DetailsHeader,
  Error,
  Loader,
  RelatedSongs,
  TopPlay,
} from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { useEffect } from "react";

export default function ArtistDetails() {
  const { id: artistId } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtist,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const divWidth = useRef();
  useEffect(() => {
    if (!isFetchingArtist && !error) {
      divWidth.current.scrollIntoView();
    }
  });

  if (isFetchingArtist) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
      <div className="flex-1 h-fit ">
        <div className="flex flex-col " ref={divWidth}>
          <h2 className="font-bold text-white text-3xl">
            Artist:
          </h2>

          <DetailsHeader
            artistData={artistData?.data[0]}
            artistId={artistId}
            bgColor={
              artistData?.data[0]?.attributes?.artwork?.bgColor || "44403c"
            }
          />
          <div className="mb-10">
            <h2 className="font-bold text-white text-3xl"></h2>
          </div>
          <RelatedSongs
            data={Object.values(artistData?.data[0]?.views["top-songs"].data)}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
      </div>
      <div className="xl:sticky relative top-0 h-fit xl:block md:hidden sm:hidden xs:hidden">
        <TopPlay />
      </div>
    </div>
  );
}
