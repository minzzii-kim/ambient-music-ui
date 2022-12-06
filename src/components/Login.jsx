import React from "react";
import styled from "styled-components";
import config from "../utils/Constants";

export default function Login() {
  const handleClick = async () => {
    const client_id = config.CLIENT_ID;
    const redirect_uri = config.REDIRECT_URI;
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <Container>
      <img
        src="https://i.ibb.co/K29CfXj/Ambient-Music-1.png"
        alt="Ambient-Music"
      />
      <button onClick={handleClick}>
        <span style={{color: 'black'}}><b>Being Ambient</b></span>
      </button>
      <span>김도연 김민지 김진필 김수현<br/>
        김현지 남호승 허운해</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-image: url('https://www.10wallpaper.com/wallpaper/1366x768/1701/Sky_space_milky_stars-Space_High_Quality_Wallpaper_1366x768.jpg');
  background-size: cover;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: white;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }  
  span {
    color: white
  }
`;
