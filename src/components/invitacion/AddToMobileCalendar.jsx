import React from "react";

const AddToMobileCalendar = () => {
  const event = {
    title: "Boda Arturo & Noemi",
    location: "Salón Hyde",
    description: `Código de Vestimenta: Formal, Ubicación en maps: https://maps.app.goo.gl/V7iCPBBP1oK879KX6`,
    startDate: "20241122T770000Z", // Formato: YYYYMMDDTHHmmssZ
    endDate: "20241123T101000Z", // Formato: YYYYMMDDTHHmmssZ
  };

  const handleAddToMobileCalendar = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${event.startDate.replace(/[-:]/g, "").split(".")[0]}
DTEND:${event.endDate.replace(/[-:]/g, "").split(".")[0]}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "evento_boda.ics"; // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar la URL del objeto después de su uso
    URL.revokeObjectURL(url);
  };
  return (
    <button
      className="btn-agendar text-dark"
      onClick={handleAddToMobileCalendar}
    >
      Agendar en Calendario del celular
    </button>
  );
};

export default AddToMobileCalendar;
