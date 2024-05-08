import { useEffect, useState } from "react";
import { access_token, logout } from "./spotify";
import { RouterProvider, useLocation } from "react-router-dom";
import { GlobalStyles } from "./styles";
import { Login } from "./pages";
import styled from "styled-components";
import { router } from "./Routes";

// Removing manual scroll to top
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function App() {
  const [token, setToken] = useState<string | boolean>();

  useEffect(() => {
    if (access_token !== null) {
      setToken(access_token);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      {token ? (
        <>
          <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
          {/* Adding routes */}
          <RouterProvider router={router} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
