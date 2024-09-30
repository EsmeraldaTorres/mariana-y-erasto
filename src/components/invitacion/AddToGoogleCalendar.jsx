import React from "react";

const AddToGoogleCalendar = () => {
  const event = {
    title: "Boda Arturo & Noemi",
    location: "Salón Hyde",
    description: `Código de Vestimenta: Formal, Ubicación en maps: https://maps.app.goo.gl/V7iCPBBP1oK879KX6`,
    startDate: "20241122T770000Z", // Formato: YYYYMMDDTHHmmssZ
    endDate: "20241123T101000Z", // Formato: YYYYMMDDTHHmmssZ
  };

  const handleAddToCalendar = () => {
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <button className="btn-agendar text-dark" onClick={handleAddToCalendar}>
      Agregar a Google Calendar
    </button>
  );
};

export default AddToGoogleCalendar;
