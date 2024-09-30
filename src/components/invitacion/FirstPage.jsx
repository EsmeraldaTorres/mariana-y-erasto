import React from "react";
import ReactAudioPlayer from "react-audio-player";
import audioFile from "../../assets/audio/musica-lewis-coffee-at-midnight.mp3";
import { PlayCircle, PauseCircle, Coin } from "react-bootstrap-icons";
import nameImg from "../../assets/img/arturo-y-noemi.png";

const FirstPage = ({ isPlaying, togglePlayPause, audioRef }) => {
  return (
    <>
      <section className="home d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center">
          <img
            loading="lazy"
            className="name"
            src={nameImg}
            alt="name"
            id="name"
          />
        </div>
        <div className="text-white text-center player-btn" id="play">
          {isPlaying ? (
            <PauseCircle
              className={` play-btn player-icon `}
              onClick={togglePlayPause}
            />
          ) : (
            <PlayCircle
              className={`play-btn player-icon `}
              onClick={togglePlayPause}
            />
          )}

          <p>audio</p>
        </div>
        <div className="player-audio">
          <ReactAudioPlayer
            ref={audioRef}
            id="audio"
            controls={false}
            loop={true}
            src={audioFile}
          />
        </div>
      </section>
    </>
  );
};

export default FirstPage;
