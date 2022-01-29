import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Playlist = ({ playlist }) => {
  const playlistId = playlist.id;

  const history = useHistory();

  const handleNameClick = () => {
    history.push(`/playlists/${playlistId}`);
  };

  return (
    <Main onClick={handleNameClick}>
      <Cover
        src={playlist.playlistUrl}
        style={{ height: "200px", width: "200px" }}
      />
      <InfoPlaylist>
        <Title>{playlist.title}</Title>
        <Name>{playlist.owner}</Name>
      </InfoPlaylist>
    </Main>
  );
};

export default Playlist;

const Main = styled.div`
  color: white;
  margin: 10px;
  box-shadow: 0px 0px 10px grey;
`;

const Cover = styled.img`
  box-shadow: 0px 0px 10px grey;
  border: black solid;
`;

const InfoPlaylist = styled.div``;

const Title = styled.div``;

const Name = styled.div``;
