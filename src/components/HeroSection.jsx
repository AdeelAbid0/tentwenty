import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Image1 from "../assets/images/hero-image.png";
import Image2 from "../assets/images/slider1.png";
import Image3 from "../assets/images/slider2.png";
import Image4 from "../assets/images/slider3.png";
import Header from "./Header";
import Stepper from "./Stepper";

const HeroSection = () => {
  const imgArray = [Image1, Image2, Image3, Image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [welcomeRef, welcomeVisible] = useScrollAnimation();
  const [headingRef, headingVisible] = useScrollAnimation();

  useEffect(() => {
    setShowOverlay(true);
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const handleImageChange = (newIndex) => {
    setAnimationKey((prev) => prev + 1);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
    }, 300);
  };

  return (
    <section
      className="relative flex items-center h-screen p-0!"
      aria-label="Hero section"
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        aria-hidden="true"
      >
        <img
          key={currentImageIndex}
          src={imgArray[currentImageIndex]}
          alt="TenTwenty Farms - From Our Farms To Your Hands"
          className="w-full h-full object-cover animate-fadeIn"
        />
      </div>

      {showOverlay && (
        <>
          <div
            key={`top-${animationKey}`}
            className="absolute top-1/2 left-0 w-full bg-[#00000033] z-20 animate-expandToTop"
            aria-hidden="true"
          />
          <div
            key={`bottom-${animationKey}`}
            className="absolute top-1/2 left-0 w-full bg-[#00000033] z-20 animate-expandToBottom"
            aria-hidden="true"
          />
        </>
      )}
      <div className="fixed top-0 w-full z-10 md:px-5! md:py-5! p-0!">
        <Header />
      </div>
      <div className="flex flex-col gap-2.5 relative z-10 pl-6! md:pl-33.75!">
        <p className="text-[#EEF4F9] md:text-[16px]! text-sm! leading-1.3 animate-fadeInUp">
          Welcome To TenTwenty Farms
        </p>
        <h1 className="hidden md:block text-[64px]! font-normal text-[#EEF4F9] leading-none animate-fadeInUp">
          From Our Farms <br /> To Your Hands
        </h1>
        <h1 className="block md:hidden text-[46px] font-normal text-[#EEF4F9] m-0! leading-none animate-fadeInUp">
          From Our <br /> Farms <br />
          To Your Hands
        </h1>
      </div>
      <div className="absolute md:bottom-30 bottom-10 left-6 md:left-33.5">
        <Stepper imgArray={imgArray} onImageChange={handleImageChange} />
      </div>

      <style>{`
        @keyframes expandToTop {
          0% {
            transform: translateY(0);
            height: 0;
            opacity: 1;
          }
          100% {
            transform: translateY(-50vh);
            height: 50vh;
            opacity: 0;
          }
        }

        @keyframes expandToBottom {
          0% {
            transform: translateY(0);
            height: 0;
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            height: 50vh;
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-expandToTop {
          animation: expandToTop 0.6s ease-in-out forwards;
          transform-origin: bottom;
        }

        .animate-expandToBottom {
          animation: expandToBottom 0.6s ease-in-out forwards;
          transform-origin: top;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
