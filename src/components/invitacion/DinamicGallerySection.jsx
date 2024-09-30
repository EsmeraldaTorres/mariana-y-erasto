import React from "react";
import lineDecoration from "../../assets/img/line2.png"
const DinamicGallerySection = () => {
  return (
    <>
      <section className="window-back2">
        <div
          className="dinamic-galery text-white text-shadow text-center title2 d-flex justify-content-center align-items-center font-paris"
          data-aos="fade-right"
          data-aos-duration="2500"
        >
          <p className="x-4"> Únete a nuestra galería dinámica</p>
        </div>
      </section>
      <section className="p-4 bg-dinamic-galery">
        <div className="principal-text">
          <h3
            className="text-center font-paris letter-s-1px"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            {" "}
            ¡Todas las fotos que tomen ustedes, nuestro invitados, las tendremos
            en una misma galería!
          </h3>
          <div className="d-flex justify-content-around align-items-center">
            <img
              className="decoration  "
              src={lineDecoration}
              alt="linea"
            />
          </div>
          <div className="p-3">
            <ol className="    text-left">
              <li
                className="pb-2"
                data-aos="fade-down"
                data-aos-duration="3000"
              >
                <div className="d-flex ">
                  Descarga la app
                  <span>
                    {" "}
                    <a
                      href="https://www.wedshoots.com/mx?albumId=MX883b4adb"
                      className=" ml-2 font-gold d-flex align-items-center animate__animated animate__pulse animate__infinite"
                    >
                      Click aquí.
                    </a>
                  </span>{" "}
                </div>
              </li>
              <li
                className="pb-2"
                data-aos="fade-down"
                data-aos-duration="3000"
              >
                Una vez descargada la app, da click en "Soy Invitado".
              </li>
              <li
                className="pb-2"
                data-aos="fade-down"
                data-aos-duration="3000"
              >
                {" "}
                Introduce nuestro código{" "}
                <span className="text-underline font-weight-bold font-gold">
                  MX883b4adb
                </span>
              </li>
              <li data-aos="fade-down" data-aos-duration="3000">
                Durante la fiesta únete a nuestra galería escaneando los códigos
                QR ubicados en el lugar
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default DinamicGallerySection;
