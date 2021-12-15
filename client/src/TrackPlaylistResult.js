import React from "react";
import styled from "styled-components";
import Background from "./Background";

const TrackPlaylistResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  console.log(track.album.images[0].url);

  return (
    <Main onClick={handlePlay}>
      <Cover src={track.album.images[0].url} />
      <InfoTrack>
        <Title>{track.album.name}</Title>
        <Name>{track.artists[0].name}</Name>
      </InfoTrack>
    </Main>
  );
};

export default TrackPlaylistResult;

const Main = styled.div`
  background-color: black;
  margin: 25px;
  display: flex;
  box-shadow: 0px 0px 10px grey;
`;

const Cover = styled.img`
  width: 100px;
  height: 100px;
`;

const InfoTrack = styled.div`
  color: white;

  width: 300px;
  padding: 25px;
`;

const Title = styled.div`
  color: white;
`;

const Name = styled.div`
  color: white;
`;
