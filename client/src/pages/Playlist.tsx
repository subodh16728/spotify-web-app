import { useCallback, useEffect, useState } from "react";
import { getPlaylistById, getAudioFeaturesForTracks } from "../spotify";
import { useParams } from "react-router-dom";
import { asyncHandler } from "../utils";
import { StyledHeader, StyledDropdown } from "../styles";
import {
  AudioFeatures,
  PlaylistData,
  UserTopData,
  UserTopDataDetails,
} from "../model";
import axios from "axios";
import { Loader, SectionWrapper, TrackList } from "../components";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistData>();
  const [tracksData, setTracksData] = useState<UserTopData>();
  const [tracks, setTracks] = useState<UserTopDataDetails[]>([]);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
  const sortOptions = ["danceability", "tempo", "energy"];

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

    // this data to be passed when no audio-feature is selected
    setTracks((prevTracks) => [...prevTracks, ...tracksData.items]);

    asyncHandler(fetchMoreData)();

    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map((item) => item.track.id);
      const { data } = await getAudioFeaturesForTracks(ids);
      setAudioFeatures((prevAudioFeatures) => [
        ...prevAudioFeatures,
        ...data["audio_features"],
      ]);
    };

    asyncHandler(fetchAudioFeatures)();
  }, [tracksData]);

  const handleAudioFeatures = useCallback(
    (feature) => {
      tracks.forEach((item, index) => {
        item["audio_features"] = audioFeatures[index];
      });

      const sortedTracks = tracks.toSorted((a, b) => {
        return b.audio_features[feature] - a.audio_features[feature];
      });

      setTracks(sortedTracks);
    },
    [audioFeatures]
  );

  console.log("Audio features: ", audioFeatures);

  return (
    <>
      {playlist ? (
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
            <SectionWrapper title="Playlist" breadcrumb={true}>
              <StyledDropdown active="true">
                <label className="sr-only" htmlFor="order-select">
                  Sort tracks
                </label>
                <select
                  name="track-order"
                  id="order-select"
                  onChange={(e) => {
                    const selectedOption = e.target.value;
                    if (selectedOption) {
                      handleAudioFeatures(selectedOption);
                    }
                  }}
                >
                  <option value="" selected disabled>
                    Sort tracks
                  </option>
                  {sortOptions.map((option, i) => (
                    <option value={option} key={i}>
                      {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                    </option>
                  ))}
                </select>
              </StyledDropdown>
              {tracks && <TrackList tracks={tracks} flag={true} />}
            </SectionWrapper>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Playlist;
