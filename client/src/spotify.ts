import axios from "axios";
import { Localstorage_keys } from "./model";
// Localstorage keys
const LOCALSTORAGE_KEYS: Localstorage_keys = {
    accessToken: "spotify_access_token",
    refreshToken: "spotify_refresh_token",
    expireTime: "spotify_token_expire_time",
    timeStamp: "spotify_token_timestamp"        // time we are storing using Date.now()
}

// Retrieve the localstorage values
const LOCALSTORAGE_VALUES = {
    accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timeStamp: localStorage.getItem(LOCALSTORAGE_KEYS.timeStamp),
}

export const logout = (): void => {
    // Clear all localStorage items
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location.href = window.location.origin;
};

const hasTokenExpired = (): boolean => {
    const { accessToken, timeStamp, expireTime } = LOCALSTORAGE_VALUES;

    // stops from going into infinite loop
    // this additional check was required as timeStamp was not set hence the return was always true due to which the code was going into infinite loop.
    if (!accessToken || !timeStamp) {
        return false;
    }

    // checking if token is expired?
    const millisecondsElapsed = Date.now() - Number(timeStamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
}

const refreshToken = async (): Promise<void> => {
    try {
        // addtional check to make sure refresh_token exists before accessing the new access_token
        if (!LOCALSTORAGE_VALUES.refreshToken ||
            LOCALSTORAGE_VALUES.refreshToken === 'undefined'
        ) {
            console.error('No refresh token available');
            logout();
        }
        // Use `/refresh_token` endpoint from our Node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);

        // Reload the page for localStorage updates to be reflected
        alert("Hi")
        // window.location.reload();

    } catch (e) {
        console.error(e);
    }
};

const getAccessToken = (): string | boolean => {
    // store the access_token, refresh_token, expireTime and timestamp when user visits for the first time. 
    const searchQuery = window.location.search;             // target everything in url after "?"
    const urlParams = new URLSearchParams(searchQuery);     // helps in retrieval of each query
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in")
    };
    const hasError = urlParams.get("error");

    // if there is token in query params, that means user is logging in for the first time.
    if (queryParams[LOCALSTORAGE_KEYS.accessToken] && !LOCALSTORAGE_VALUES.accessToken) {
        for (const property in queryParams) {
            localStorage.setItem(property, queryParams[property]!)
        }

        // set the timestamp
        localStorage.setItem(LOCALSTORAGE_KEYS.timeStamp, Date.now().toString())
        return queryParams[LOCALSTORAGE_KEYS.accessToken]!;
    }

    // If there is a token in localstorage, use that token. 

    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== "undefined") {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // Refresh the token 
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === "undefined") {
        // logout();
        refreshToken();
    }

    return false;
}

export const access_token = getAccessToken();

// setting the axios defaults
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;
axios.defaults.headers["Content-type"] = `application/json`;

export const getCurrentUserProfile = () => { return axios.get('/me') };

export const getCurrentUserPlaylists = (limit = 20) => { return axios.get(`/me/playlists?limit=${limit}`) }

// giving a default time_range so that it is not null
export const getTopArtists = (time_range = "short_term") => { return axios.get(`/me/top/artists?time_range=${time_range}`) }

export const getTopTracks = (time_range = "short_term") => { return axios.get(`/me/top/tracks?time_range=${time_range}`) }

export const getPlaylistById = (playlist_id: string) => { return axios.get(`/playlists/${playlist_id}`) }

export const getAudioFeaturesForTracks = (ids) => { return axios.get(`/audio-features?ids=${ids}`) }