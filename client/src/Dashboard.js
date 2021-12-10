import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Background from "./Background";
import styled from "styled-components";
import black from "./background/black.jpeg";

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  console.log(accessToken);
  console.log("doul");

  return <Main>{/* <Background /> */}</Main>;
};

export default Dashboard;

const Main = styled.div`
  background-image: url(${black});
  width: 100%;
  height: 100vh;
`;
