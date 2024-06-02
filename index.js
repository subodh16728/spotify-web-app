require("dotenv").config();
const express = require("express");
const querystring = require("querystring")      // let's us parse and stringify the query strings
const app = express();
const axios = require("axios");
const cors = require("cors")
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(cors());

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const stateKey = "spotify_auth_state";

// code in url
app.get("/login", (req, res) => {
    console.log("in the /login request")
    const state = generateRandomString(16)
    res.cookie(stateKey, state);
    const scope = ["user-read-private", "user-read-email", "user-top-read"].join(" ")

    const queryString = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: scope,
        state: state,
    })

    res.redirect(`https://accounts.spotify.com/authorize?${queryString}`)
})

app.get("/callback", (req, res) => {
    console.log("in the /callback")
    const code = req.query.code;
    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        }),
        headers: {
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            "Content-Type": "application/x-www-form-urlencoded",        // refers to data sending in the url in key value pairs
        }
    })
        .then((response) => {
            if (response.status === 200) {
                const { access_token, refresh_token, expires_in } = response.data;
                const queryParams = querystring.stringify({
                    refresh_token: refresh_token,
                    access_token: access_token,
                    expires_in: expires_in,
                })
                res.redirect(`http://localhost:5173?${queryParams}`)
            } else {
                res.redirect("/", querystring.stringify({ error: "Invalid token" }))
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

// refresh_token endpoint
app.get("/refresh_token", (req, res) => {

    //get the refresh_token and send a request to obtain a new access_token
    const { refresh_token } = req.query;
    console.log("In the /refresh_token")
    console.log("Refresh_token: ", refresh_token);
    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        }),
        headers: {
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
        .then((response) => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})