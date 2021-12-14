import React from "react";
import styled from "styled-components";
import { UseAuthContext } from "./UseAuthProvider";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "ea01f9e43e4746eca67543f410ac56d7",
});

const PlaylistDetails = () => {
  const { accessToken } = useContext(UseAuthContext);
  console.log(accessToken);

  const { playlistId } = useParams();

  // useEffect(() => {
  //   if (!accessToken) return;
  //   spotifyApi.getMe().then(
  //     function (data) {
  //       console.log(data);
  //       console.log("Some information about the authenticated user", data.body);
  //       const user_Id = data.body.id;
  //       setUserId(userId);
  //     },
  //     function (err) {
  //       console.log("Something went wrong!", err);
  //     }
  //   );
  // }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getPlaylist(`${playlistId}`).then(
      function (data) {
        console.log("Some information about this playlist", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  return <Main></Main>;
};

export default PlaylistDetails;

const Main = styled.div``;
