import { createBrowserRouter } from "react-router-dom";
import { Playlists, Playlist, Profile, TopArtists, TopTracks } from "./pages";
import Home from "./Home";
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
    path: "home",
    element: <Home />,
  },
  {
    path: "/playlists/:id",
    element: <Playlist />,
  },
]);
