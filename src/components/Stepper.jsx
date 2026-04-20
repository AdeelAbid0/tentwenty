import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Stepper({ imgArray, onImageChange }) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const intervalRef = useRef(null);
  const [nextRef, nextVisible] = useScrollAnimation();
  const [numberRef1, number1Visible] = useScrollAnimation();
  const [numberRef2, number2Visible] = useScrollAnimation();

  const changeImage = (nextIndex) => {
    setDisplayIndex(nextIndex);
    onImageChange(nextIndex);
    setAnimationKey((prev) => prev + 1);
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayIndex((prev) => {
        const next = (prev + 1) % imgArray.length;
        onImageChange(next);
        setAnimationKey((k) => k + 1);
        return next;
      });
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [imgArray.length]);

  const handleNextClick = () => {
    const next = (displayIndex + 1) % imgArray.length;
    changeImage(next);
    startInterval();
  };

  return (
    <div
      className="flex w-full gap-5 md:gap-10 items-center"
      role="navigation"
      aria-label="Gallery navigation"
    >
      <div className="relative w-34.5 h-34.5 flex items-center justify-center">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 138 138"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="3"
            width="132"
            height="132"
            fill="none"
            stroke="rgba(238,244,249,0.15)"
            strokeWidth="6"
          />
          <rect
            key={animationKey}
            x="3"
            y="3"
            width="132"
            height="132"
            fill="none"
            stroke="#EEF4F9"
            strokeWidth="6"
            strokeLinecap="square"
            strokeDasharray="528"
            strokeDashoffset="462"
            className="animate-rectLoader"
          />
        </svg>

        <div className="relative w-34.5 h-34.5 border border-[#EEF4F9] p-5.5">
          <img
            src={imgArray[displayIndex]}
            alt={`TenTwenty Farms Gallery Image ${displayIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute inset-0 bg-[#221F2033] flex items-center justify-center cursor-pointer"
            onClick={handleNextClick}
            aria-label="View next gallery image"
          >
            <span
              ref={nextRef}
              className={`text-white font-medium fade-in-up-scroll ${nextVisible ? "visible" : ""}`}
            >
              Next
            </span>
          </button>
        </div>
      </div>

      <div
        className="flex gap-4 items-center h-4.5"
        aria-live="polite"
        aria-label="Gallery progress"
      >
        <p
          ref={numberRef1}
          className={`text-white text-lg font-medium fade-in-up-scroll ${number1Visible ? "visible" : ""}`}
          aria-label={`Current image number ${displayIndex + 1}`}
        >
          0{displayIndex + 1}
        </p>
        <span className="w-24 h-0.5 bg-[#EEF4F9]" aria-hidden="true"></span>
        <p
          ref={numberRef2}
          className={`text-white text-lg font-medium fade-in-up-scroll ${number2Visible ? "visible" : ""}`}
          aria-label={`Total images ${imgArray?.length}`}
        >
          0{imgArray?.length}
        </p>
      </div>
    </div>
  );
}
