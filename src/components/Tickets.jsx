import React, { useEffect, useRef, useState } from "react";
import { useGuest } from "../Context/GuestContext";
import "./invitacion.css";
import jsPDF from "jspdf";
import { useParams, Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import decoration from "../assets/img/Untitled design (3).png";

const Tickets = () => {
  const { guest, fetchDataByGuest } = useGuest();
  const [ticketsConfirmados, setTicketsConfirmados] = useState();
  const [message, setMessage] = useState("");
  const printRef = useRef();
  let { id, code } = useParams();

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF("p", "pt", "letter");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    // Tamaño de la imagen en el PDF
    const imgWidth = width * 0.3;
    const imgHeight = height * 0.3;
    const margin = 20; // Margen entre elementos
    const headerHeight = 100; // Altura reservada para el encabezado

    // Variables de posición
    let currentY = headerHeight;

    // Filtrar acompañantes según la condición
    const filteredAcompanist = guest.acompanist.filter(
      (acomp) => acomp?.asist === true
    );
    setTicketsConfirmados(filteredAcompanist);

    for (const [index, acomp] of filteredAcompanist.entries()) {
      if (currentY + imgHeight + margin > height) {
        pdf.addPage();
        currentY = headerHeight; // Restablecer la posición Y al comienzo de una nueva página
      }

      if (index === 0) {
        // Agregar el texto del h1 solo en la primera página
        pdf.setFontSize(28);
        pdf.text("Tickets", width / 2, 30, { align: "center" });

        // Agregar el texto del h2 solo en la primera página
        pdf.setFontSize(22);
        pdf.text(guest.principalName, width / 2, 60, { align: "center" });
      }

      // Agregar el texto del p
      pdf.setFontSize(16);
      pdf.text(acomp.name, width / 2, currentY, { align: "center" });

      const img = new Image();
      img.src = acomp.qrImage;

      // Esperar a que la imagen se cargue
      await new Promise((resolve) => {
        img.onload = () => {
          const x = (width - imgWidth) / 2; // Centrar horizontalmente
          const y = currentY + margin; // Espacio después del texto
          pdf.addImage(img, "PNG", x, y, imgWidth, imgHeight);
          currentY = y + imgHeight + margin; // Actualizar la posición Y
          resolve();
        };
      });
    }

    pdf.save("download.pdf");
  };

  useEffect(() => {
    if (id) {
      fetchDataByGuest(id, code);
    }
  }, [id]);

  useEffect(() => {

    if (guest) {
      const filteredAcompanist = guest?.acompanist.filter(
        (acomp) => acomp?.asist === true
      );
      setTicketsConfirmados(filteredAcompanist);
    }
  }, [guest]);

  return (
    <div className="p-4">
      <h1 className="text-center font-paris font-gold display-5 mt-4 pt-4">
        {"Arturo & Noemi"}
      </h1>
      <p className="text-center display-5">Nuestra Boda</p>

      <div className="justify-content-center mt-4" ref={printRef}>
        {guest ? (
          <div className="text-center">
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
