import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useGuest } from "../Context/GuestContext";
import { useParams } from "react-router-dom";

const Tickets = () => {
  const { guest, fetchDataByGuest, eventData } = useGuest();
  const [ticketsConfirmados, setTicketsConfirmados] = useState();
  const [visits, setVisits] = useState(null); // 👈 estado local para las visitas
  const didIncrement = useRef(false); // 👈 evita dobles incrementos

  let { id, code } = useParams();

  useEffect(() => {
    if (id && code) {
      fetchDataByGuest(id, code);

      const updateCounter = async () => {
        if (didIncrement.current) return; // 👈 evita ejecutarse más de una vez
        didIncrement.current = true;

        try {
          const ref = doc(db, "people", id);

          // incrementar en +1
          await updateDoc(ref, {
            visits: increment(1),
          });

          // leer el valor actualizado
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setVisits(snap.data().visits);
          }
        } catch (error) {
          console.error("Error al actualizar contador:", error);
        }
      };

      if (eventData) {
        // Función para convertir "20250911T000000Z" a timestamp válido
        const parseUTCString = (utcString) => {
          if (!utcString) return NaN;

          // Extraemos año, mes, día, hora, minutos, segundos
          const match = utcString.match(
            /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
          );
          if (!match) return NaN;

          const [, year, month, day, hour, minute, second] = match;

          // Nota: mes en Date.UTC es 0-indexed
          return Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hour),
            parseInt(minute),
            parseInt(second)
          );
        };

        const countdownDate = parseUTCString(eventData.event.startDate);
        const now = Date.now(); // timestamp actual en ms

        if (now >= countdownDate && !didIncrement.current) {
          updateCounter();
        }
      }
    }
  }, [id, code, eventData]);

  useEffect(() => {
    if (guest) {
      const filteredAcompanist = guest?.acompanist.filter(
        (acomp) => acomp?.asist === true
      );
      setTicketsConfirmados(filteredAcompanist);
      if (guest.visits) setVisits(guest.visits);
    }
  }, [guest]);

  return (
    <div className="p-4">
      <h1 className="text-center font-paris font-gold display-5 mt-4 pt-4">
        {"Mariana & Erasto"}
      </h1>
      <p className="text-center display-5">Nuestra Boda</p>

      <div className="justify-content-center mt-4">
        {guest ? (
          <div className="text-center">
            {guest.visits ? (
              <h2>
                {visits === 1 ? (
                  <>
                    <i className="bi bi-check-circle-fill display-1 txt-confirmado"></i>
                    <p className="txt-confirmado"> Escaneado 1 vez </p>
                  </>
                ) : (
                  <>
                    <i className="bi bi-exclamation-square-fill txt-negado display-3 "></i>

                    <p className="txt-negado">Escaneado {visits} veces</p>
                  </>
                )}
              </h2>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-grow" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            )}
            <h2 className="font-paris font-gold display-4">
              Tickets {guest?.principalName}
            </h2>

            {guest?.acompanist?.map(
              (acomp, index) =>
                acomp?.asist === true && (
                  <div
                    key={index}
                    className="w-100 d-flex justify-content-center flex-column"
                  >
                    <p className="mb-0 display-6 mt-4">{acomp?.name}</p>
                    {acomp.table ? (
                      <p className="mb-0 display-6 f-w-700">
                        Mesa: {acomp?.table}
                      </p>
                    ) : (
                      <p className="mb-0 display-6">
                        Pronto se asignará tu número de mesa
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        ) : (
          <p>No hay información disponible</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;
