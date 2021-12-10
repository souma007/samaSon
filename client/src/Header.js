import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=ea01f9e43e4746eca67543f410ac56d7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-read-private%20playlist-modify-public%20user-read-playback-position%20user-follow-modify%20user-follow-read%20user-read-currently-playing";
const Header = ({ code }) => {
  return (
    <Head>
      <Title>Samason</Title>
      <h1>
        {code ? (
          <CurrentUser to="/dashboard">Dashboard</CurrentUser>
        ) : (
          <Container>
            <a className="loginBtn" href={AUTH_URL}>
              Login With Spotify
            </a>
          </Container>
        )}
      </h1>
      <Search type="text" placeholder="Songs/Artists"></Search>
      <h1>
        <Home to="/"> Music Galaxy </Home>
      </h1>
    </Head>
  );
};

export default Header;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: black;
  color: white;
  margin: 0px;
`;

const Home = styled.div`
  color: white;
`;

const CurrentUser = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Container = styled.div`
  a {
    text-decoration: none;
    color: white;
  }
`;

const Title = styled.h1`
  color: white;
`;

const Search = styled.input``;
