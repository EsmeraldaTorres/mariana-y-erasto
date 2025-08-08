import React from "react";
import line2 from "../../assets/img/line2.png";
import { useGuest } from "../../Context/GuestContext";

const brideParents = ["Rogelio Macías Ruiz", "Andrea Lerma Gonzalez"];
const groomParents = ["Antonio Juárez Mota", "Leticia Ortiz Villareal"];

const ParentsSection = () => {
  const { eventData } = useGuest();
  return (
    <section className="p-4">
      <p
        className="text-center title2 font-paris"
        data-aos="fade-right"
        data-aos-duration="2000"
      >
        Agradecemos a nuestros padres
      </p>

      <div className="d-flex justify-content-around align-items-center">
        <img loading="lazy" className="decoration" src={line2} alt="línea" />
      </div>

      <div className="d-flex justify-content-center">
        <div className="row">
          {/* Padres de la novia */}
          <div className="col-12 col-md-6 mt-4">
            {brideParents.map((name, index) => (
              <p
                key={index}
                className="text-center font-gold display-6"
                data-aos="flip-down"
                data-aos-duration="1500"
              >
                {name}
              </p>
            ))}
          </div>

          {/* Padres del novio */}
          <div className="col-12 col-md-6 mt-4">
            {groomParents.map((name, index) => (
              <p
                key={index}
                className="text-center display-6"
                data-aos="flip-down"
                data-aos-duration="1500"
                data-aos-delay="500"
              >
                {name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentsSection;
