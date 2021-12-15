import React from "react";
import styled from "styled-components";
import { UseAuthContext } from "./UseAuthProvider";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useState } from "react";
import TrackPlaylistResult from "./TrackPlaylistResult";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "ea01f9e43e4746eca67543f410ac56d7",
});

const PlaylistDetails = () => {
  const { accessToken } = useContext(UseAuthContext);
  console.log(accessToken);
  const [playlist, setPlaylist] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [search, setSearch] = useState(null);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };

  const { playlistId } = useParams();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getPlaylist(`${playlistId}`).then(
      function (data) {
        console.log("Some information about this playlist", data.body);
        const { images, name, owner, tracks, uri } = data.body;
        const playlistInfo = { images, name, owner, tracks, uri };
        console.log(playlistInfo);
        setPlaylist(playlistInfo);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  console.log(playlist);

  return (
    <Main>
      {playlist && (
        <>
          <Wrapper>
            <Art>
              <Image
                src={playlist.images[0].url}
                style={{ height: "500px", width: "500px" }}
              />
              <Creator>
                <Title>{playlist.name}</Title>
                <Name>{playlist.owner.display_name}</Name>
              </Creator>
            </Art>

            <Tracklist>
              {playlist.tracks.items.map((item) => {
                return (
                  <TrackPlaylistResult
                    track={item.track}
                    chooseTrack={chooseTrack}
                  />
                );
              })}
            </Tracklist>
          </Wrapper>

          <Record>
            <Player
              accessToken={accessToken}
              trackUri={playingTrack && playingTrack.uri}
            />
          </Record>
        </>
      )}
    </Main>
  );
};

export default PlaylistDetails;

const Main = styled.div``;

const Wrapper = styled.div`
  display: flex;
  margin: 100px;
  padding: 50px;
`;

const Art = styled.div`
  border: red solid;
`;

const Image = styled.img``;

const Name = styled.div`
  color: white;
`;

const Tracklist = styled.div`
  border: green solid;
  margin: 100px;
  padding: 50px;
`;

const Creator = styled.div`
  border: blue solid;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: white;
`;

const Track = styled.div``;

const Record = styled.div``;
