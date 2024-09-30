import React from "react";
import line2 from "../../assets/img/line2.png";

const ParentsSection = () => {
  return (
    <>
      <section className="p-4">
        <p
          className="text-center title2 font-paris"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          Agradecemos a nuestros padres
        </p>
        <div className="d-flex justify-content-around align-items-center">
          <img loading="lazy" className="decoration" src={line2} alt="linea" />
        </div>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-12 col-md-6 mt-4">
              <p
                className="text-center font-gold display-6"
                data-aos="flip-down"
                data-aos-duration="1500"
              >
                Rogelio Macías Ruiz
              </p>
              <p
                className="text-center font-gold display-6"
                data-aos="flip-down"
                data-aos-duration="1500"
              >
                Andrea Lerma Gonzalez
              </p>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <p
                className="text-center display-6"
                data-aos="flip-down"
                data-aos-duration="1500"
                data-aos-delay="500"
              >
                Antonio Juárez Mota
              </p>
              <p
                className="text-center display-6"
                data-aos="flip-down"
                data-aos-duration="1500"
                data-aos-delay="500"
              >
                Leticia Ortiz Villareal
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParentsSection;
