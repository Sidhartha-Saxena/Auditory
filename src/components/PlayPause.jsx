import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

export default function PlayPause({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) {
 if(activeSong?.title===song.title && isPlaying){
  return <FaPauseCircle
  size={35}
  className='text-gray-300'
  onClick={handlePause}/>
 }
 else{
  return <FaPlayCircle
  size={35}
  className='text-gray-300'
  onClick={handlePlay}/>
 }
}
