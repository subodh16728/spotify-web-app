import { useEffect, useState } from "react";
import { getPlaylistById } from "../spotify";
import { useParams } from "react-router-dom";
import { asyncHandler } from "../utils";
import { StyledHeader } from "../styles";
import { PlaylistData, UserTopData, UserTopDataDetails } from "../model";
import axios from "axios";
import { SectionWrapper, TrackList } from "../components";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistData>();
  const [tracksData, setTracksData] = useState<UserTopData>();
  const [tracks, setTracks] = useState<UserTopDataDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(`${id}`);
      setPlaylist(data);
      setTracksData(data.tracks);
    };

    asyncHandler(fetchData)();
  }, []);

  useEffect(() => {
    if (!tracksData) {
      return;
    }

    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };

    setTracks((prevTracks) => {
      return prevTracks.concat(tracksData.items);
    });

    asyncHandler(fetchMoreData)();
  }, [tracksData]);

  return (
    <>
      {playlist && (
        <>
          <StyledHeader>
            <div className="header__inner">
              {playlist.images.length && playlist.images[0].url && (
                <img
                  className="header__img"
                  src={playlist.images[0].url}
                  alt="Playlist Artwork"
                />
              )}
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlist.name}</h1>
                <p className="header__meta">
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total}{" "}
                      {`follower${playlist.followers.total !== 1 ? "s" : ""}`}
                    </span>
                  ) : null}
                  <span>
                    {playlist.tracks.total}{" "}
                    {`song${playlist.tracks.total !== 1 ? "s" : ""}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
          <main>
            <SectionWrapper title="Playlist" breadcrumb="true">
              {tracks && <TrackList tracks={tracks} flag={true} />}
            </SectionWrapper>
          </main>
        </>
      )}
    </>
  );
};

export default Playlist;
