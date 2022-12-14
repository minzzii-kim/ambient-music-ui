import React, { useState } from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
  BsLightbulb,
  BsLightbulbOff,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import config, { reducerCases } from "../utils/Constants";
export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const [light1, setLightState1] = useState("on");
  const [light2, setLightState2] = useState("off");
  const selectLight1 = async () => {
    light1 === "on" ? setLightState1("off") : setLightState1("on");
    console.log("light1 : ", light1);
  };
  const selectLight2 = async () => {
    light2 == "on" ? setLightState2("off") : setLightState2("on");
    console.log("light2 : ", light2);
    if (light2 === "off") {
      await axios.put(`${config.ENDPOINT_URI}/lights/2`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await axios.put(`${config.ENDPOINT_URI}/lights/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    console.log("change state : ", state);
    if (state === "pause") {
      await axios.put(`${config.ENDPOINT_URI}/pause/1`);
    }
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response1.data !== "") {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
    }
  };
  return (
    <Container>
      <div className="light1">
        {light1 === "on" ? (
          <BsLightbulb onClick={selectLight1} />
        ) : (
          <BsLightbulbOff onClick={selectLight1} />
        )}
      </div>
      <div className="light2">
        {light2 === "on" ? (
          <BsLightbulb onClick={selectLight2} />
        ) : (
          <BsLightbulbOff onClick={selectLight2} />
        )}
      </div>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
