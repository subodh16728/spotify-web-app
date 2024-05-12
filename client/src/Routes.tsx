import { createBrowserRouter } from "react-router-dom";
import { Playlists, Profile, TopArtists, TopTracks } from "./pages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  {
    path: "/top-artists",
    element: <TopArtists />,
  },
  {
    path: "/top-tracks",
    element: <TopTracks />,
  },
  {
    path: "/playlists",
    element: <Playlists />,
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
