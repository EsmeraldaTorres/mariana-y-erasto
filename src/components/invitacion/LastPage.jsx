import React from "react";
import { useGuest } from "../../Context/GuestContext";

const LastPage = () => {
  const { reservationDone, reservationDeny } = useGuest();
  return (
    <>
      <section
        className="last-window-back d-flex justify-content-between
         align-items-center flex-column"
      >
        <div className="font-paris display-2 text-white p-4 opacity-0">
          <p className="text-center">¡Te esperamos!</p>
        </div>
        <div className="font-paris display-2 text-white p-4">
          {reservationDone && reservationDeny ? (
            <></>
          ) : (
            <p
              className="text-center"
              data-aos="fade-down"
              data-aos-duration="2000"
            >
              ¡Te esperamos!
            </p>
          )}
        </div>
        <div className="last-container">
          <p className="text-center m-0 p-0">
            Invitación Hecha por Digital Invite
            <a
              target="_blank"
              href="https://wa.me/524426147355?text=Hola%20Esmeralda!%20Me%20interesa%20contratar%20tu%20servicio"
              className="marca"
            >
              {""} by Esmeralda<i className="bi bi-whatsapp"></i>
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default LastPage;
