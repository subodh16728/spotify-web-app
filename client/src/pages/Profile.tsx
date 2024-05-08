import { useEffect, useState } from "react";
import { Artists, Playlist, ProfileData } from "../model";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import { asyncHandler } from "../utils";
import { StyledHeader } from "../styles";
import { SectionWrapper, ArtistsGrid, TrackList } from "../components";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>();
  const [playlists, setPlaylists] = useState<Playlist>();
  const [topArtists, setTopArtists] = useState<Artists>();
  const [topTracks, setTopTracks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const useProfile = await getCurrentUserProfile();
      setProfile(useProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);

      console.log(userTopTracks.data);
    };

    asyncHandler(fetchData)();
    asyncHandler(getCurrentUserPlaylists)();
    asyncHandler(getTopTracks)();
  }, []);

  return (
    <>
      <div className="card">
        {profile && (
          <>
            <StyledHeader type="user">
              <div className="header__inner">
                {profile.images.length && profile.images[0].url && (
                  <img
                    className="header__img"
                    src={profile.images[0].url}
                    alt="Avatar"
                  />
                )}
                <div>
                  <div className="header__overline">Profile</div>
                  <h1 className="header__name">{profile.display_name}</h1>
                  <p className="header__meta">
                    {playlists && (
                      <span>
                        {playlists.total} Playlist
                        {playlists.total !== 1 ? "s" : ""}
                      </span>
                    )}
                    <span>
                      {profile.followers.total} Follower
                      {profile.followers.total !== 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              </div>
            </StyledHeader>
            {topArtists && topTracks && (
              <main>
                <SectionWrapper
                  title="Top artists this month"
                  seeAllLink="/top-artists"
                >
                  <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper
                  title="Top tracks this month"
                  seeAllLink="/top-tracks"
                >
                  <TrackList tracks={topTracks.items.slice(0, 10)} />
                </SectionWrapper>
              </main>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
