const path = require("path");
// Require express
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
var request = require("request"); // "Request" library
const querystring = require("querystring");
const cors = require("cors");

require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET } = process.env;

var client_secret = CLIENT_SECRET;
var client_id = CLIENT_ID;

const PORT = 7777;

var redirect_uri = "http://localhost:7777/callback";

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
  .use(cors())
  .use(express.json())

  .get("/login", function (req, res) {
    var state = generateRandomString(16);
    console.log(state);
    var scope = "user-read-private user-read-email";

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  })

  .get("/callback", function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;

    var credentials = {
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uri,
    };

    const spotifyApi = new SpotifyWebApi(credentials);

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        // console.log(data);
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(() => {
        res.sendStatus(400);
      });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });

// /* Load the HTTP library */
// var http = require("http");

// /* Create an HTTP server to handle responses */

// http
//   .createServer(function (request, response) {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.write("Hello World");
//     response.end();
//   })
//   .listen(8888);

// var authOptions = {
//   url: "https://accounts.spotify.com/api/token",
//   form: {
//     code: code,
//     redirect_uri: redirect_uri,
//     grant_type: "authorization_code",
//   },
//   headers: {
//     Authorization:
//       "Basic " +
//       new Buffer(client_id + ":" + client_secret).toString("base64"),
//   },
//   json: true,
// };

// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var access_token = body.access_token,
//       refresh_token = body.refresh_token;

//     var options = {
//       url: "https://api.spotify.com/v1/me",
//       headers: { Authorization: "Bearer " + access_token },
//       json: true,
//     };

//     // use the access token to access the Spotify Web API
//     request.get(options, function (error, response, body) {
//       console.log(body);
//     });

//     // we can also pass the token to the browser to make requests from there
//     res.redirect(
//       "/#" +
//         querystring.stringify({
//           access_token: access_token,
//           refresh_token: refresh_token,
//         })
//     );
//   } else {
//     res.redirect(
//       "/#" +
//         querystring.stringify({
//           error: "invalid_token",
//         })
//     );
//   }
// });

// if (state === null) {
//   //     res.redirect(
//       "/#" +
//         querystring.stringify({
//           error: "state_mismatch",
//         })
//     );
//   } else {
//     var authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//       },
//       headers: {
//         Authorization:
//           "Basic " +
//           new Buffer(client_id + ":" + client_secret).toString("base64"),
//       },
//       json: true,
//     };
//   }
// })
// .get("/callback", function (req, res) {
//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   var code = req.query.code || null;
//   var state = req.query.state || null;

//   if (state === null) {
//     res.redirect(
//       "/#" +
//         querystring.stringify({
//           error: "state_mismatch",
//         })
//     );
//   } else {
//     var authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//       },
//       headers: {
//         Authorization:
//           "Basic " +
//           new Buffer(client_id + ":" + client_secret).toString("base64"),
//       },
//       json: true,
//     };

//     request.post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         (access_token = body.access_token),
//           (refresh_token = body.refresh_token);

//         var options = {
//           url: "https://api.spotify.com/v1/me",
//           headers: { Authorization: "Bearer " + access_token },
//           json: true,
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function (error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect(
//           "/#" +
//             querystring.stringify({
//               access_token: access_token,
//               refresh_token: refresh_token,
//             })
//         );
//       } else {
//         res.redirect(
//           "/#" +
//             querystring.stringify({
//               error: "invalid_token",
//             })
//         );
//       }
//     });
//   }
// })
// .get("")
