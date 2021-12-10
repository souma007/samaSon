import React from "react";
import styled from "styled-components";
import Background from "./Background";

const TrackResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <Main onClick={handlePlay}>
      <Cover src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <InfoTrack>
        <Title>{track.title}</Title>
        <Name>{track.artist}</Name>
      </InfoTrack>
    </Main>
  );
};

export default TrackResult;

const Main = styled.div`
  background-color: black;
  color: white;
`;

const Cover = styled.img``;

const InfoTrack = styled.div``;

const Title = styled.div``;

const Name = styled.div``;
