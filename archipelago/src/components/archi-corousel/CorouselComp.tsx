import React, { useState, useEffect } from "react";
import "./CorouselComp.scss";
import arrow from "../../../public/images/home/arrow.svg";
import arrow2 from "../../../public/images/home/arrow2.svg";
import corouselImg1 from "../../../public/images/home/corouselImg1.svg";
import corouselImg2 from "../../../public/images/home/corouselImg2.svg";
import corouselImg3 from "../../../public/images/home/corouselImg3.svg";

const images = [
  {
    src: "/images/home/corouselImg1.svg",
    title: "“With a global footprint and a team of experienced professionals,",
    title2: "Archipelago Middle East Shipping LLC",
    title3:
      "stands ready to coordinate and deliver spare parts efficiently, no matter where you are in the world.“",
  },
  {
    src: "/images/home/corouselImg2.svg",
    title: "“At ",
    title2: "Archipelago Middle East Shipping LLC,",
    title3: "we believe in providing comprehensive shipping solutions that not only meet but exceed our client's expectations.”",
  },
  {
    src: "/images/home/corouselImg3.svg",
    title: "“Customer satisfaction is our top priority. We are dedicated to meeting and exceeding",
    title2: "Our Client's Expectations",
    title3: "by providing high-quality, value-added services tailored to their specific needs.”",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-100">
      <div className="imageContainer w-100">
        <img src={images[currentIndex].src ? images[currentIndex].src : corouselImg1.src} alt={images[currentIndex].title} />
        <div className="title">
          {images[currentIndex].title ? images[currentIndex].title : corouselImg2.src}<br />
          <b style={{ color: "rgba(20, 216, 255, 255)", fontSize: "35px" }}>{images[currentIndex].title2}</b><br />
          {images[currentIndex].title3 ? images[currentIndex].title3 : corouselImg3.src}
        </div>
      </div>
      <div className="controls">
        <button className="corouselLeftArrowBtn" onClick={handlePrev}>
          <img src={arrow2.src} alt="" />
        </button>
        <button className="corouselLeftArrowBtn" onClick={handleNext}>
          <img src={arrow.src} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
