import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import iconLazo from "../assets/img/lazo.png";
import iconTestigo from "../assets/img/testigo.png";
import iconCoin from "../assets/img/coin.png";
import anillos from "../assets/img/anillos.png";
import hotelOne from "../assets/img/hotel1.png";
import hotelTwo from "../assets/img/hotel2.png";
import hotelThree from "../assets/img/hotel3.png";
import hotel4 from "../assets/img/hotel4.png";
import hotel5 from "../assets/img/hotel5.png";
import hotel6 from "../assets/img/hotel6.png";
import hotel7 from "../assets/img/hotel7.png";

import iconFiesta from "../assets/img/fiesta.png";
import iconComida from "../assets/img/comida.png";
import iconCivil from "../assets/img/civil.png";
import iconRecepcion from "../assets/img/Recepcion (1).png";
import dressCode from "../assets/img/etiqueta rigurosa.png";
import iglesiaUbicacion from "../assets/img/llanito.png";

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
    url: "https://mariana-y-erasto-nuestra-boda.netlify.app/",
    bride: "Erasto",
    groom: "Mariana",
    weekendDay: "Sábado",
    day: "28",
    month: "Febrero",
    year: "2026",
    countDown: "Feb 28, 2026 17:00",
    limitConfirmation: "2 de Febrero",
    lastName: " Andueza Collins",
    fatherShe: "Rogelio Macías Ruiz",
    motherShe: "Andrea Lerma Gonzalez",
    fatherHe: "Antonio Juárez Mota",
    motherHe: "Leticia Ortiz Villareal",
    padrinos: [
      {
        icon: iconTestigo,
        title: "Testigos de ella",
        names: ["Israel Espinoza Ortiz", "Brenda Nalleli Martinez Estevez"],
      },

      {
        icon: iconTestigo,
        title: "Testigos de él",
        names: ["Erick Daniel Anzures Gonzalez", "Alejandra Ramírez Moreno"],
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
        name: "Hotel El Pedregal",
        time: "A 2 min de la fiesta",
        address: "Av. Miguel Hidalgo, 91240 Xico, Ver.",
        img: hotelOne,
        link: "https://maps.app.goo.gl/4DTWhP6esuALN55e9",
      },
      {
        name: "Jardín de los Anturios",
        time: "A 10 min de la fiesta",
        address:
          "Guadalupe Victoria, Camino de Terrazeria S/N, entre el Panteon de Xico y, El Haya, 91240 Xico, Ver.",
        img: hotelTwo,
        link: "https://maps.app.goo.gl/wBtTrNBGZQTcYWhM9",
      },
      {
        name: "Hotel Hacienda San Bartolo",
        time: "A 5 min de la fiesta",
        address:
          "Calzada de Texolo, rancho san Bartolo Rancho san Bartolo, 91240 Xico, Ver.",
        img: hotelThree,
        link: "https://maps.app.goo.gl/n18re5QN4pNvPLFT6",
      },
      {
        name: "Hotel HG",
        time: "A 1 min de la fiesta",
        address: "Melchor Ocampo 9, Xico, 91240 Xico, Ver.",
        img: hotel4,
        link: "https://maps.app.goo.gl/pE3k8TsFpva6Z8pG9",
      },
      {
        name: "Posada La Querencia",
        time: "A 8 min de la fiesta",
        address: "Camino a la, A Texolo Km. 1, 91240 Xico, Ver.",
        img: hotel5,
        link: "https://maps.app.goo.gl/Hk4FkUgeekiv19797",
      },
      {
        name: "Hotel Posada Coatepec",
        time: "A 21 min de la fiesta",
        address: "Hidalgo 9, Centro, 91500 Coatepec, Ver.",
        img: hotel6,
        link: "https://maps.app.goo.gl/rtRNFFAn5w2Ruzo19",
      },
      {
        name: "Hotel Posada San Jeronimo",
        time: "A 20 min de la fiesta",
        address: "16 de Septiembre 26, Centro, 91500 Coatepec, Ver.",
        img: hotel7,
        link: "https://maps.app.goo.gl/QbjYZfu2S9LebXfc7",
      },
    ],
    events: [
      {
        title: "Ceremonia civil",
        time: "5:00pm",
        icon: iconCivil,
      },
      {
        title: "Recepción",
        time: "6:00pm",
        icon: iconRecepcion,
      },
      {
        title: "Cena",
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
        title: "Ceremonia & Recepción",
        time: "19:00hrs",
        image: iglesiaUbicacion,
        alt: "iglesia",
        name: "Salón Llanito 33",
        address: "Zaragoza 98, Col.Centro Xico, Veracruz-Llave, Mexico",
        mapLink: "https://maps.app.goo.gl/id5RNFCL6dwysMhw6",
        delay: 500,
      },
    ],
    transferDetails: {
      number: "4027 6653 0576 7718",
      name: "Arturo Jiménez Díaz",
      bank: "BBVA",
    },
    code: "MXsadfa",
    dressCode: {
      img: dressCode,
      name: "Formal",
    },
    event: {
      title: "Boda Mariana y Erasto",
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
