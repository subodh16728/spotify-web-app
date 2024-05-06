import { createBrowserRouter } from "react-router-dom";
import { logout } from "./spotify";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <h2>Logged In!</h2>
        <button onClick={logout}>Logout</button>
      </>
    ),
  },
  {
    path: "/top-artists",
    element: (
      <>
        <h1>Top artists</h1>
      </>
    ),
  },
  {
    path: "/top-tracks",
    element: (
      <>
        <h1>Top tracks</h1>
      </>
    ),
  },
  {
    path: "/playlists",
    element: (
      <>
        <h1>Playlists</h1>
      </>
    ),
  },
  {
    path: "/playlists/:id",
    element: (
      <>
        <h1>Playlist</h1>
      </>
    ),
  },
]);
