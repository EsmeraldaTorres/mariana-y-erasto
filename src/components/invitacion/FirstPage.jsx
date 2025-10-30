import React from "react";
import ReactAudioPlayer from "react-audio-player";
import audioFile from "../../assets/audio/alex-warren-ordinary.mp3";
import { PlayCircle, PauseCircle, Coin } from "react-bootstrap-icons";
import { useGuest } from "../../Context/GuestContext";

const FirstPage = ({ isPlaying, togglePlayPause, audioRef, hide }) => {
  const { eventData } = useGuest();

  return (
    <>
      <section
        id="inicio"
        className="home d-flex justify-content-center align-items-center"
      >
        <div className="d-flex justify-content-center">
          <div
            className={`display-4 f-4 pt-30vh text-center font-paris text-white text-shadow2 pl-4 pr-4 mt-4  ${
              hide ? "hide" : "animate__animated animate__zoomIn"
            } `}
          >
            <p
              className={`font-paris text-white display-4 mb-0 ${
                !hide && " animate__animated animate__zoomIn"
              }`}
            >
              {eventData.groom}
            </p>
            <p
              className={`text-white font-paris display-4 mb-0 ${
                !hide && " animate__animated animate__zoomIn"
              }`}
            >
              {"&"}
            </p>
            {eventData.bride}
          </div>
        </div>
        <div className="text-help">
          Desliza hacia arriba <i class="bi bi-arrow-up"></i>
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
        <div>
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
