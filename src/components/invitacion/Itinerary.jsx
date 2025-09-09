import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGuest } from "../../Context/GuestContext";

const Itinerary = () => {
  const { eventData } = useGuest();

  return (
    <section id="itinerario" className="itinerario">
      <p className="text-center display-4 font-paris text-white m-0 pt-4">
        Itinerario
      </p>

      <div className="App">
        <Carousel>
          {eventData.events.map(({ title, time, icon }, index) => (
            <Carousel.Item key={index}>
              <div className="card d-flex justify-content-center align-items-center">
                <div className="w-100 d-flex justify-content-center flex-column align-items-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      loading="lazy"
                      className="card-img animate__animated animate__pulse animate__repeat-2 animate_slower"
                      src={icon}
                      alt={title}
                    />
                  </div>
                  <p className="card-text text-white text-center p-0 font-paris display-5">
                    {title}
                  </p>
                  <p className="card-text text-shadow text-white font-weight-bold text-center display-5">
                    {time}
                  </p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Itinerary;
