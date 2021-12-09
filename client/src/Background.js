import React from "react";
import galaxy from "./background/musicgalaxy.jpeg";
import styled from "styled-components";

const Background = () => {
  return (
    <>
      <Wrapper src={galaxy} alt="background" />
    </>
  );
};

export default Background;

const Wrapper = styled.img`
  height: 100vh;
  width: 100vw;
`;
