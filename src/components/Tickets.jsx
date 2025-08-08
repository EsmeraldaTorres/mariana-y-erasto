import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGuest } from "../Context/GuestContext";
import "./invitacion.css";

const Tickets = () => {
  const { eventData } = useGuest();
  const { id, code } = useParams();
  const { guest, fetchDataByGuest } = useGuest();
  const [confirmedTickets, setConfirmedTickets] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    if (id) fetchDataByGuest(id, code);
  }, [id, code, fetchDataByGuest]);

  useEffect(() => {
    if (guest?.acompanist) {
      const confirmed = guest.acompanist.filter((a) => a?.asist === true);
      setConfirmedTickets(confirmed);
    }
  }, [guest]);

  return (
    <div className="p-4">
      <h1 className="text-center font-paris font-gold display-5 mt-4 pt-4">
        {eventData.groom} & {eventData.bride}
      </h1>
      <p className="text-center display-5">Nuestra Boda</p>

      <div className="justify-content-center mt-4" ref={printRef}>
        {guest ? (
          <div className="text-center">
            <h2 className="font-paris font-gold display-4">
              Tickets {guest.principalName}
            </h2>

            {confirmedTickets.map((acomp, index) => (
              <div
                key={index}
                className="w-100 d-flex justify-content-center flex-column"
              >
                <p className="mb-0 display-6 mt-4">{acomp.name}</p>
                <p className="mb-0 display-6 f-w-700">
                  {acomp.table
                    ? `Mesa: ${acomp.table}`
                    : "Pronto se asignará tu número de mesa"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay información disponible</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;
