import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function DetailsHeader({ artistId, artistData, songData ,bgColor}) {
  const image = artistId
    ? artistData?.attributes?.artwork?.url
    : songData?.images?.coverart;

  return (
    <div className="w-full flex flex-col relative">
      <div className="w-full h-full">
        <Gradient gradientColor={bgColor} artwork={image}/>
        <img src={image} alt="Profile" className="max-w-fit max-h-fit z-50" />

        <div className="ml-5 absolute bottom-10">
          <h2 className="font-bold text-white text-6xl">
            {artistId ? artistData?.attributes?.name : songData?.title}
          </h2>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-white text-3xl mt-2">{songData?.subtitle}</p>
            </Link>
          )}
          <p className="text-2xl text-white mt-2">
            {artistId
              ? artistData?.attributes?.genreNames[0]
              : songData?.genres?.primary}
          </p>
        </div>
      </div>
    </div>
  );
}
const Gradient=styled.div`
top:0;
bottom:0;
left:0;
right:0;
position:absolute;
background-image: ${(props)=>`linear-gradient(to top, #${props.gradientColor}, transparent),
url(${props.artwork})`};
background-size: cover;
background-position: center;
background-repeat: no-repeat;
backdrop-filter: blur(10px);
`