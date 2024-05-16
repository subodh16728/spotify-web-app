import { useState, useEffect } from "react";
import { getCurrentUserPlaylists } from "../spotify";
import { asyncHandler } from "../utils";
import { PlaylistsGrid, SectionWrapper } from "../components";
import axios from "axios";
import { UserTopData, UserTopDataDetails } from "../model";

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState<UserTopData>();
  const [playlists, setPlaylists] = useState<UserTopDataDetails[]>([]);

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
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {playlists && <PlaylistsGrid playlists={playlists} />}
      </SectionWrapper>
    </main>
  );
};

export default Playlists;
