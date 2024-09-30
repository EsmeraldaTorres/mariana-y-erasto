import React from "react";
import decoration from "../../assets/img/Untitled design (3).png";
import lineaAlReves from "../../assets/img/lineaalreves.png";
import fotoCuadro from "../../assets/img/pexels-barbara-ribeiro-8506039.jpg";

const PhotoSection = () => {
  return (
    <>
      <section className="window-back">
        <div
          className="window d-flex justify-content-center align-items-center"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <p className="p-4 rounded bg-white text-center w-90 display-5 font-paris font-weight-light">
            ¡Dios ha sido fiel hasta el día de hoy!
          </p>
        </div>
      </section>
      <section className="nuestro-inicio p-4">
        <p className="text-center text-white pt-4 display-6">Así empezamos</p>
        <div className="d-flex justify-content-center align-items-center">
          <div className="w-100 d-flex justify-content-center">
            <img loading="lazy" src={fotoCuadro} alt="foto" />
          </div>
        </div>
        <div className="d-flex pt-4 justify-content-center align-items-center">
          <p className="text text-white text-center display-6">
            Y estamos listos para el siguiente paso...
          </p>
        </div>
      </section>
    </>
  );
};

export default PhotoSection;
