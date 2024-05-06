import { useEffect, useState } from "react";
import { access_token, getCurrentUserProfile } from "./spotify";
import { asyncHandler } from "./utils";
import { ProfileData } from "./model";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./Routes";
import styled from "styled-components";
import { GlobalStyles } from "./styles";

// Removing manual scroll to top
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

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
      <GlobalStyles />
      {token ? (
        <>
          <div className="card">
            {profile && (
              <>
                <h1>Name: {profile.display_name}</h1>
                <p>Email: {profile.email}</p>
                <p>Followers: {profile.followers.total}</p>
              </>
            )}
          </div>

          {/* Adding routes */}
          <RouterProvider router={router} />
        </>
      ) : (
        <StyledLoginButton href="http://localhost:8888/login">
          Login to Spotify
        </StyledLoginButton>
      )}
    </>
  );
}

export default App;
