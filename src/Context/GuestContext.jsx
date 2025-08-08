import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import iconLazo from "../assets/img/lazo.png";
import iconCoin from "../assets/img/coin.png";
import anillos from "../assets/img/anillos.png";
import hotelOne from "../assets/img/gamma-xalapa-hotel.png";
import hotelTwo from "../assets/img/holiday-inn-hotel.png";
import hotelThree from "../assets/img/gran-hotel-xalpa-hotel.png";
import iconFiesta from "../assets/img/fiesta.png";
import iconComida from "../assets/img/comida.png";
import iconIglesia from "../assets/img/iglesia.png";
import iconRecepcion from "../assets/img/Recepcion (1).png";

const GuestContext = createContext();

export const useGuest = () => useContext(GuestContext);

export const GuestProvider = ({ children }) => {
  const [guest, setGuest] = useState(null);
  const [reservationDone, setReservationDone] = useState(false);

  const fetchDataByGuest = async (id, code) => {
    try {
      let arrayPeople = [];
      const querySnapshot = await getDocs(collection(db, "people"));
      querySnapshot.forEach((doc) => {
        arrayPeople.push(JSON.parse(JSON.stringify(doc.data(), null, 2)));
      });
      const person = arrayPeople?.filter((person) => person.id === id);
      const uniquecode = person[0]?.code;

      const notConfirmation = person[0]?.acompanist?.filter(
        (acomp) => acomp.asist === null
      );
      if (notConfirmation && notConfirmation.length != 0) {
        setReservationDone(false);
      } else setReservationDone(true);

      if (uniquecode === code) {
        setGuest(person[0]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    try {
      const guestDoc = db.collection("people").doc(id);
      await guestDoc.update({
        messageGuest: message,
      });
      alert("Mensaje enviado con éxito!");
    } catch (error) {
      console.error("Error al enviar el mensaje: ", error);
      alert("Error al enviar el mensaje");
    }
  };
  const eventData = {
    url: "https://gaby-y-angel-nuestra-boda.netlify.app/",
    bride: "Noemi",
    groom: "Arturo",
    weekendDay: "viernes",
    day: "22",
    month: "Diciembre",
    year: "2025",
    countDown: "Jul 05, 2026 00:00",
    limitConfirmation: "12 de Noviembre",
    lastName: " Andueza Collins",
    fatherShe: "Rogelio Macías Ruiz",
    motherShe: "Andrea Lerma Gonzalez",
    fatherHe: "Antonio Juárez Mota",
    motherHe: "Leticia Ortiz Villareal",
    padrinos: [
      {
        icon: anillos,
        title: "Anillos",
        names: ["Roberto Rodriguez Saenz", "Veronica Martínez Torres"],
      },
      {
        icon: iconCoin,
        title: "Arras",
        names: ["José Díaz Hernández", "Ilse Macías Hernández"],
      },
      {
        icon: iconLazo,
        title: "Lazo",
        names: ["Rogelio Martínez Loredo", "Ana Salazar Montes"],
      },
    ],
    itineraryItems: [
      {
        title: "Ceremonia religiosa",
        time: "5:00pm",
        // icon: iconIglesia,
      },
      {
        title: "Recepción",
        time: "6:00pm",
        // icon: iconRecepcion,
      },
      {
        title: "Fiesta",
        time: "7:00pm",
        // icon: iconComida,
      },
      {
        title: "Fiesta",
        time: "9:00pm",
        // icon: iconFiesta,
      },
    ],
    hotels: [
      {
        name: "Gran Hotel Xalapa",
        time: "A 40 min de la fiesta",
        address:
          "Guadalupe Victoria 163, Zona Centro, Centro, 91000 Xalapa-Enríquez, Ver.",
        img: hotelOne,
        link: "https://maps.app.goo.gl/3yXfaZVray72iGWv5",
      },
      {
        name: "Holiday Inn Express Xalapa",
        time: "A 40 min de la fiesta",
        address:
          "Ignacio Zaragoza 8, Zona Centro, Centro, 91000 Xalapa-Enríquez, Ver.",
        img: hotelTwo,
        link: "https://maps.app.goo.gl/wBtTrNBGZQTcYWhM9",
      },
      {
        name: "Gamma Xalapa Nubara",
        time: "A 32 min de la fiesta",
        address:
          "Av. Adolfo Ruiz Cortines 912 Col, U.H. del Bosque, 91017 Xalapa-Enríquez, Ver.",
        img: hotelThree,
        link: "https://maps.app.goo.gl/weUd2wWCdZnn8dG78",
      },
    ],
    events: [
      {
        title: "Ceremonia religiosa",
        time: "5:00pm",
        icon: iconIglesia,
      },
      {
        title: "Recepción",
        time: "6:00pm",
        icon: iconRecepcion,
      },
      {
        title: "Fiesta",
        time: "7:00pm",
        icon: iconComida,
      },
      {
        title: "Fiesta",
        time: "9:00pm",
        icon: iconFiesta,
      },
    ],
    locations: [
      {
        title: "Ceremonia",
        time: "19:00hrs",
        image: iglesiaUbicacion,
        alt: "iglesia",
        name: 'Parroquia "San Isidro Labrador"',
        address: "Teresa Vera 102, Centro, 86300 Comalcalco, Tab.",
        mapLink:
          "https://www.google.com/maps?q=parroquia+san+isidro+labrador+comalcalco&rlz=1C5CHFA_enMX973MX974&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjNkcnum-j5AhXpC0QIHT8FAkYQ_AUoAXoECAIQAw",
        delay: 500,
      },
      {
        title: "Recepción",
        time: "20:00hrs",
        image: salonUbicacion,
        alt: "salon",
        name: 'Salón de Eventos "Cristina"',
        address: "Recinto 102, Centro, 86300 Comalcalco, Tab.",
        mapLink:
          "https://www.google.com/maps/place/Sal%C3%B3n+Jard%C3%ADn+Mar%C3%ADa+Cristina/@19.289967,-99.9551998,11z/data=!4m9!1m2!2m1!1ssalon+cristina!3m5!1s0x85cd89ca4f9cc363:0xd908e41b7f9f839b!8m2!3d19.289967!4d-99.6750484!15sCg5zYWxvbiBjcmlzdGluYVoQIg5zYWxvbiBjcmlzdGluYZIBFmZ1bmN0aW9uX3Jvb21fZmFjaWxpdHmaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUk5kM1pFWVVkbkVBReABAA",
        delay: 700,
      },
    ],
    transferDetails: {
      number: "4027 6653 0576 7718",
      name: "Arturo Jiménez Díaz",
      bank: "BBVA",
    },
    code: "MXsadfa",
    dressCode: {
      // img: dressCode,
      name: "formal",
    },
    event: {
      title: "Boda Arturo & Noemi",
      location: "Salón Hyde",
      description: `Código de Vestimenta: Formal, Ubicación en maps: https://maps.app.goo.gl/V7iCPBBP1oK879KX6`,
      startDate: "20241122T190000Z", // formato UTC
      endDate: "20241123T101000Z",
    },
  };

  return (
    <GuestContext.Provider
      value={{
        guest,
        eventData,
        setGuest,
        fetchDataByGuest,
        reservationDone,
        setReservationDone,
        handleSubmitMessage,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
