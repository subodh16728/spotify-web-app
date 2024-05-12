import { useState, useEffect } from "react";
import { getCurrentUserPlaylists } from "../spotify";
import { asyncHandler } from "../utils";
import { PlaylistsGrid, SectionWrapper } from "../components";
import axios from "axios";

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null); // stores returned JSON data from api response
  const [playlists, setPlaylists] = useState([]); //stores an array of playlists data

  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylistsData(userPlaylists.data);
    };

    asyncHandler(fetchData)();
  }, []);

  useEffect(() => {
    if (!playlistsData) {
      return;
    }
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    setPlaylists((prevPlaylists) => prevPlaylists.concat(playlistsData.items));

    // Fetch next set of playlists
    asyncHandler(fetchMoreData)();
  }, [playlistsData]);

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb="true">
        {playlists && <PlaylistsGrid playlists={playlists} />}
      </SectionWrapper>
    </main>
  );
};

export default Playlists;
