import React from "react";
import sobreArriba from "../../assets/img/sobrearriba.png";
import sobreAbajo from "../../assets/img/sobreabajo.png";
import logo from "../../assets/img/logo.png";
import classNames from "classnames";
import { useGuest } from "../../Context/GuestContext";

const Sobre = ({ abrir, openInvitation, hide, openModal }) => {
  return (
    <div
      id="parent-div"
      className={classNames(
        "bg-sobre d-flex justify-content-center align-items-center",
        {
          "overflow-hidden": openModal,
        }
      )}
    >
      <div id="hoja-principal" className={classNames("sobre", { hide: !hide })}>
        <img
          id="sobre-arriba"
          loading="lazy"
          src={sobreArriba}
          className={classNames("animate__animated p-0 m-0 sobre-arriba", {
            animate__fadeOutUp: openInvitation,
          })}
          alt="sobre-arriba"
        />

        <img
          id="sobre-abajo"
          loading="lazy"
          src={sobreAbajo}
          className={classNames("p-0 m-0 sobre-abajo animate__animated", {
            animate__slideOutDown: openInvitation,
          })}
          alt="sobre-abajo"
        />

        <button id="btn-open" className="btn-open" onClick={abrir}>
          <img
            id="logo"
            loading="lazy"
            src={logo}
            alt="logo"
            className={classNames(
              "animate__animated animate__pulse text-center",
              {
                animate__infinite: !openInvitation,
                hide: !hide,
              }
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default Sobre;
