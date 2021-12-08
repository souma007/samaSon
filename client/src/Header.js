import React from "react";
import styled from "styled-components";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=ea01f9e43e4746eca67543f410ac56d7&response_type=code&redirect_uri=http://localhost:3000He&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-read-private%20playlist-modify-public%20user-read-playback-position%20user-follow-modify%20user-follow-read%20user-read-currently-playing";
const Header = ({ code }) => {
  return (
    <Head>
      <h1>
        <Home to="/"> Music Galaxy </Home>
      </h1>
      <h2>
        {code ? (
          <CurrentUser to="/dashboard">Dashbord</CurrentUser>
        ) : (
          <Container>
            <a className="loginBtn" href={AUTH_URL}>
              Login With Spotify
            </a>
          </Container>
        )}
      </h2>
    </Head>
  );
};

export default Header;

const Head = styled.div``;

const Home = styled.div``;

const CurrentUser = styled.div``;

const Container = styled.button``;