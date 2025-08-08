import React from "react";
import { useGuest } from "../../Context/GuestContext";

const AddToCalendar = ({ type }) => {
  const { eventData } = useGuest();

  const handleClick = () => {
    if (type === "google") {
      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventData.event.title
      )}&dates=${eventData.event.startDate}/${
        eventData.event.endDate
      }&details=${encodeURIComponent(
        eventData.event.description
      )}&location=${encodeURIComponent(eventData.event.location)}`;
      window.open(googleCalendarUrl, "_blank");
    } else if (type === "mobile") {
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventData.event.title}
DESCRIPTION:${eventData.event.description}
LOCATION:${eventData.event.location}
DTSTART:${eventData.event.startDate}
DTEND:${eventData.event.endDate}
END:VEVENT
END:VCALENDAR`;

      // Crear blob
      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      // Crear enlace temporal
      const link = document.createElement("a");
      link.href = url;
      link.download = `${eventData.groom}-y-${eventData.bride}-boda.ics`; // Nombre del archivo
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button className="btn-agendar text-dark" onClick={handleClick}>
      {type === "google" ? "En Google Calendar" : "En Calendario de mi celular"}
    </button>
  );
};

export default AddToCalendar;
