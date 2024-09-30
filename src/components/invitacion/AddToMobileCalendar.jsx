import React from "react";

const AddToMobileCalendar = () => {
  const event = {
    title: "Boda Arturo & Noemi",
    location: "Salón Hyde",
    description: `Código de Vestimenta: Formal, Ubicación en maps: https://maps.app.goo.gl/V7iCPBBP1oK879KX6`,
    startDate: "20241122T190000Z", // Formato: YYYYMMDDTHHmmssZ
    endDate: "20241123T101000Z", // Formato: YYYYMMDDTHHmmssZ
  };

  const handleAddToMobileCalendar = () => {
    const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${encodeURIComponent(
      event.title
    )}\nDESCRIPTION:${encodeURIComponent(
      event.description
    )}\nLOCATION:${encodeURIComponent(event.location)}\nDTSTART:${
      event.startDate.replace(/[-:]/g, "").split(".")[0]
    }Z\nDTEND:${
      event.endDate.replace(/[-:]/g, "").split(".")[0]
    }Z\nEND:VEVENT\nEND:VCALENDAR`;
    window.open(calendarUrl, "_blank");
  };

  return (
    <button
      className="btn-agendar text-dark"
      onClick={handleAddToMobileCalendar}
    >
      Agregar a Calendario del celular
    </button>
  );
};

export default AddToMobileCalendar;
