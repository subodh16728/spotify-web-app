import { useEffect, useState } from "react";
import { access_token, logout } from "./spotify";
import "./App.css";

function App() {
  const [token, setToken] = useState<string | boolean>();
  useEffect(() => {
    if (access_token !== null) {
      setToken(access_token);
    }
  }, []);

  return (
    <>
      <h1>Spotify Connected Web Application</h1>
      <div className="card">
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
