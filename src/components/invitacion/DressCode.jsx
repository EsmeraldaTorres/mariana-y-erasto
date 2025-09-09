import React from "react";
import dressCode from "../../assets/img/etiqueta rigurosa.png";
import lineDecoration from "../../assets/img/lineaalreves.png";
import { useGuest } from "../../Context/GuestContext";

const DressCode = () => {
  const { eventData } = useGuest();

  return (
    <>
      <section
        id="vestimenta"
        className="text-center h-100 p-4 padding-4 bg-vestimenta"
      >
        <p
          className="display-4 font-gold font-paris mt-4 mb-4 title2"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          Código de Vestimenta
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <img
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="w-75 img-vestimenta dress-code-img"
            src={eventData?.dressCode?.img}
            alt="dress-code"
          />
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <img className="decoration mt-4 " src={lineDecoration} alt="linea" />
        </div>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="font-paris display-4 p-4 "
        >
          {eventData?.dressCode?.name}
        </p>
      </section>
    </>
  );
};

export default DressCode;
