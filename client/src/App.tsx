import { useEffect, useState } from "react";
import { access_token, logout, getCurrentUserProfile } from "./spotify";
import { asyncHandler } from "./utils";
import "./App.css";
import { ProfileData } from "./model";

function App() {
  const [token, setToken] = useState<string | boolean>();
  const [profile, setProfile] = useState<ProfileData>();

  useEffect(() => {
    if (access_token !== null) {
      setToken(access_token);
    }

    // fetch the user data profile
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };

    asyncHandler(fetchData)();
  }, []);

  return (
    <>
      <h1>Spotify Connected Web Application</h1>
      <div className="card">
        {profile && (
          <>
            <h1>Name: {profile.display_name}</h1>
            <p>Email: {profile.email}</p>
            <p>Followers: {profile.followers.total}</p>
          </>
        )}
        {token ? (
          <>
            <h2>Logged In!</h2>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button>
            <a href="http://localhost:8888/login">Login to Spotify</a>
          </button>
        )}
      </div>
    </>
  );
}

export default App;
