import React from "react";
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

export default function TopCharts() {

  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching ) {
    return <Loader />;
  }
  if (error ) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-white text-3xl mt-4 mb-10">Top Artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track, i) => (
            <ArtistCard key={track?.key} track={track}/>
        ))}
      </div>
    </div>
  );
}

