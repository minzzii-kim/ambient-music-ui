import React, {useEffect} from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";
import {useStateProvider} from "../utils/StateProvider";
import axios from "axios";
import {reducerCases} from "../utils/Constants";

export default function Sidebar() {
  const [{ defaultPlaylists }, setDefaultPlaylists] = useStateProvider();
  useEffect(() => {
    const getDefaultPlaylist = async () => {
      const response = await axios.get(
        "http://localhost:8080/playlistAll",
        {headers: {"Content-Type": "application/json",},}
      );
      const items = response.data.data;
      const defaultPlaylists = items.map(({ id, name, image }) => {
        return { id, name, image };
      });
      setDefaultPlaylists({ type: reducerCases.SET_DEFAULT_PLAYLIST, defaultPlaylists });
    };
    getDefaultPlaylist();
  }, [defaultPlaylists, setDefaultPlaylists]);
  // useEffect(() => {
  //   const getDefaultPlaylist = async () => {
  //     const response = await axios.get(
  //       "http://localhost:8080/playlistAll",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("response.data.data", response.data.data)
  //     const items = response.data.data;
  //     console.log("items", items)
  //     const defaultPlaylists = items.map(({ id, name, image }) => {
  //       return { id, name, image };
  //     });
  //     dispatch({ type: reducerCases.SET_DEFAULT_PLAYLIST, defaultPlaylists });
  //   };
  //   getDefaultPlaylist();
  // }, [defaultPlaylists, dispatch]);
  console.log("defaultPlaylists", defaultPlaylists)
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          {
            defaultPlaylists && defaultPlaylists.map(
              ({ id, name, image }) => {
                return (<li >{name}</li>);
              })
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
