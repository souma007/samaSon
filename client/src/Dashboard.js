import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  console.log(accessToken);

  return;
};

export default Dashboard;
