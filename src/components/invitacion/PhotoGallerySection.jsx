import React from "react";
import { CardImgOverlay } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const PhotoGallerySection = () => {
  return (
    <div className="img-galery">
      <Carousel data-aos="fade-right" data-aos-duration="2000">
        <Carousel.Item>
          <div className="foto-1"></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="foto-2"></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="foto-3"></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="foto-4"></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="foto-5"></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="foto-6"></div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default PhotoGallerySection;
