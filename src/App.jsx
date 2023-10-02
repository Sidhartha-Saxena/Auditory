import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className=" flex flex-col bg-[#000]">
        <Searchbar />

        <div className="px-3 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse lg:w-[calc(100vw-240px)]">
          <div className="flex-1 h-fit ">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-b from-transparent to-rose-900 backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
