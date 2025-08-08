import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGuest } from "../../Context/GuestContext";

const photoClasses = [
  "foto-1",
  "foto-2",
  "foto-3",
  "foto-4",
  "foto-5",
  "foto-6",
];

const PhotoGallerySection = () => {
  const { eventData } = useGuest();
  return (
    <div className="img-galery">
      <Carousel data-aos="fade-right" data-aos-duration="2000">
        {photoClasses.map((photoClass, index) => (
          <Carousel.Item key={index}>
            <div className={photoClass}></div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default PhotoGallerySection;
