import React from "react";
import sobreArriba from "../../assets/img/sobrearriba.png";
import sobreAbajo from "../../assets/img/sobreabajo.png";
import logo from "../../assets/img/logo.png";

const Sobre = ({ abrir, openInvitation, hide, openModal }) => {
  return (
    <>
      <div
        className={`bg-dark-black d-flex justify-content-center align-items-center  ${
          !openInvitation && "test-className"
        } ${openModal && "overflow-hide"}`}
        id="parent-div"
      >
        <div id="hoja-principal" className={`sobre ${!hide && "hide"}`}>
          <img
            loading="lazy"
            id="sobre-arriba"
            src={sobreArriba}
            className={`animate__animated p-0 m-0 z-index-3 ${
              openInvitation && "animate__fadeOutUp"
            }`}
            alt="sobre-arriba"
          />
          <img
            id="sobre-abajo"
            loading="lazy"
            className={`p-0 m-0 z-index-2 animate__animated ${
              openInvitation && "animate__slideOutDown"
            }`}
            src={sobreAbajo}
            alt="sobre-abajo"
          />
          <button id="btn-open" className="btn-open" onClick={abrir}>
            <img
              id="logo"
              loading="lazy"
              src={logo}
              className={`animate__animated animate__pulse  text-center ${
                !openInvitation && "animate__infinite"
              } ${!hide && "hide"}`}
              alt="logo"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sobre;
