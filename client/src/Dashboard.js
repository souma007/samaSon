import { useState, useEffect } from "react";
import React from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Background from "./Background";
import styled from "styled-components";
import black from "./background/black.jpeg";
import TrackResult from "./TrackResult";
import Player from "./Player";
import Playlist from "./Playlist";

const spotifyApi = new SpotifyWebApi({
  clientId: "ea01f9e43e4746eca67543f410ac56d7",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  console.log(accessToken);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [userId, setUserId] = useState(undefined);
  const [playlists, setPlaylists] = useState([]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then(
      function (data) {
        console.log(data);
        console.log("Some information about the authenticated user", data.body);
        const user_Id = data.body.id;
        setUserId(userId);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    // if (!userId) return;
    console.log(userId);
    spotifyApi.getUserPlaylists(userId).then(
      function (data) {
        console.log("My playlists", data.body);
        const playlists = data.body.items.map((playlist) => {
          const smallestPlaylistImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            playlist.images[0]
          );

          return {
            id: playlist.id,
            owner: playlist.owner.display_name,
            title: playlist.name,
            uri: playlist.uri,
            popularity: playlist.popularity,
            playlistUrl: smallestPlaylistImage.url,
          };
        });

        setPlaylists(playlists);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return; // To stop the research after we type
      console.log(res);

      const track = res.body.tracks.items.map((track) => {
        // To get the smallest image from all the pictures
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );

        return {
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          popularity: track.popularity,
          albumUrl: smallestAlbumImage.url,
        };
      });
      setSearchResults(track);
      console.log(searchResults);
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Main>
      <Wrapper>
        <SearchBar>
          <Search
            type="text"
            placeholder="Songs/Artists"
            value={search}
            onChange={(event) => handleChange(event)}
          ></Search>
          <ul>
            {/* {value.length > 2 && /// Jsx and operator conditions */}
            {searchResults.map((song) => {
              return (
                <Suggestion
                  key={song.id}
                  // onClick={}
                >
                  <TrackResult track={song} chooseTrack={chooseTrack} />
                </Suggestion>
              );
            })}
          </ul>
        </SearchBar>
        <PlaylistsListing>
          {playlists.map((playlist) => {
            return <Playlist playlist={playlist} />;
          })}
        </PlaylistsListing>
      </Wrapper>
      <Record>
        <Player
          accessToken={accessToken}
          trackUri={playingTrack && playingTrack.uri}
        />
      </Record>
    </Main>
  );
};

export default Dashboard;

const Main = styled.div`
  background-image: url(${black});
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Search = styled.input`
  margin: 0px 32px;
  width: 200px;
  height: 32px;
`;

const Suggestion = styled.li`
  background-color: black;
  padding: 10px;
  width: 200px;
  margin: 0px 32px;
`;

const Record = styled.div``;

const SearchBar = styled.div``;

const PlaylistsListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px;
  border: solid white;
`;

const Wrapper = styled.div`
  display: flex;
`;
