import { useState, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Slider1 from "../assets/Images/slider-1.png";
import Slider2 from "../assets/Images/slider-2.png";
import Slider3 from "../assets/Images/slider-3.png";

const slides = [
  { img: Slider1, name: "Client 1", location: "Dubai, United Arab Emirates" },
  {
    img: Slider2,
    name: "Client 2",
    location: "Abu Dhabi, United Arab Emirates",
  },
  { img: Slider3, name: "Client 3", location: "Sharjah, United Arab Emirates" },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [animation, setAnimation] = useState(0);
  const sliderRef = useRef(null);
  const [nameRef, nameVisible] = useScrollAnimation();
  const [locationRef, locationVisible] = useScrollAnimation();

  const goToSlide = (index) => {
    const newIndex = (index + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    setCurrentTranslate(newIndex * -100);
    setPrevTranslate(newIndex * -100);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const touchStart = (e) => {
    setIsDragging(true);
    setStartX(getPositionX(e));
    setAnimation(0);
  };

  const touchMove = (e) => {
    if (isDragging) {
      const currentPosition = getPositionX(e);
      const diff = currentPosition - startX;
      setCurrentTranslate(prevTranslate + diff);
    }
  };

  const touchEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) nextSlide();
    else if (movedBy > 50) prevSlide();
    else setCurrentTranslate(prevTranslate);

    setAnimation(1);
  };

  const getPositionX = (e) => {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  };

  const snapTransition = animation === 1 ? "transform 0.3s ease-out" : "none";

  return (
    <div
      ref={sliderRef}
      className="relative w-full overflow-hidden select-none py-10 pb-15"
    >
      {/* Slider Track */}
      <div
        className="flex transition-transform"
        style={{
          transform: `translateX(${currentTranslate}%)`,
          transition: snapTransition,
        }}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onMouseDown={touchStart}
        onMouseMove={touchMove}
        onMouseUp={touchEnd}
        onMouseLeave={touchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full shrink-0 flex justify-center items-center px-4"
          >
            <div className="w-[180px] md:w-[434px] h-[230px] md:h-[619px] shrink-0 rounded-xl overflow-hidden shadow-xl">
              <img
                src={slide.img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Desktop */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hidden md:flex hover:bg-gray-100 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex hover:bg-gray-100 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-7">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-black w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <div className="text-center mt-4">
        <p
          ref={nameRef}
          className={`text-lg font-medium text-[#111] mb-1 fade-in-up-scroll ${nameVisible ? "visible" : ""}`}
        >
          {slides[currentIndex].name}
        </p>
        <p
          ref={locationRef}
          className={`text-sm text-[#888] fade-in-up-scroll ${locationVisible ? "visible" : ""}`}
        >
          {slides[currentIndex].location}
        </p>
      </div>
    </div>
  );
}
