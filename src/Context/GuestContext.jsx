import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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
  return (
    <GuestContext.Provider
      value={{
        guest,
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
