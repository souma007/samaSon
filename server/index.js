const path = require("path");
// Require express
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
var request = require("request"); // "Request" library
const querystring = require("querystring");
const cors = require("cors");
const lyricsFinder = require("lyrics-finder");

require("dotenv").config();

express().use(cors());

const { CLIENT_ID, CLIENT_SECRET } = process.env;

var client_secret = CLIENT_SECRET;
var client_id = CLIENT_ID;

const PORT = 7777;

var redirect_uri = "http://localhost:3000";

const generateRandomString = (length) => {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

express()
  .use(express.json())

  .post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: redirect_uri,
      clientId: client_id,
      clientSecret: client_secret,
    });

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  })

  .get("/lyrics", async (req, res) => {
    const lyrics =
      (await lyricsFinder(req.query.artist, req.query.track)) ||
      "No Lyrics Found";
    res.json({ lyrics });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
