import { createBrowserRouter } from "react-router-dom";
import { Profile } from "./pages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
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
