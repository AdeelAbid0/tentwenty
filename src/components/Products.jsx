import ImageSlider from "./ImageSlider";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Products() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [descRef, descVisible] = useScrollAnimation();

  return (
    <div className="flex w-full justify-center mt-20 md:mt-38.25!">
      <div className="flex flex-col w-full items-center gap-7.5">
        <h1
          ref={titleRef}
          className={`text-[30px] leading-10 md:text-[56px] md:leading-18  font-normal text-black fade-in-up-scroll ${titleVisible ? "visible" : ""}`}
        >
          Quality Products
        </h1>
        <p
          ref={descRef}
          className={`text-[16px] leading-5! md:leading-8! md:text-2xl font-normal text-[#7A7777] max-w-182 text-center px-8 md:px-0 fade-in-up-scroll ${descVisible ? "visible" : ""}`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="mt-0 md:mt-25! w-full mb-25!">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
}
