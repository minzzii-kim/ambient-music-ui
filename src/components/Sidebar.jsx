import React, {useEffect} from "react";
import styled from "styled-components";
import Playlists from "./Playlists";
import {useStateProvider} from "../utils/StateProvider";
import axios from "axios";
import {reducerCases} from "../utils/Constants";

export default function Sidebar() {
  const [{ defaultPlaylists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getDefaultPlaylist = async () => {
      const response = await axios.get(
        "http://localhost:8080/playlistAll",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        const defaultPlaylists = response.data.data;
      dispatch({ type: reducerCases.SET_DEFAULT_PLAYLIST, defaultPlaylists });
    };
    getDefaultPlaylist();
  }, [dispatch]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://i.ibb.co/K29CfXj/Ambient-Music-1.png"
            alt="ambient_music"
          />
        </div>
        <ul>
          {
                defaultPlaylists && defaultPlaylists.map(
                    ( ply ) => {
                      return (
                          <li
                            key={ ply["playlist_id"] }
                            onClick={ () => {changeCurrentPlaylist(ply["playlist_id"])}}>>
                          <span style={{color: 'white'}}>{ply["playlist_name"]}</span>
                          </li>);
                    }
              )
          }
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div` 
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;
