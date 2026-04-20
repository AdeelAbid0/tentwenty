import ArrowRightIcon from "../assets/svg/arrow-right.svg?react";
import HamburgerIcon from "../assets/svg/hamburger.svg?react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Header() {
  const [navRef, navVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  const navItems = [
    {
      id: 1,
      name: "About",
      onclick: () => {
        console.log("About clicked");
      },
    },
    {
      id: 2,
      name: "News",
      onclick: () => {
        console.log("News clicked");
      },
    },
    {
      id: 3,
      name: "Services",
      onclick: () => {
        console.log("Services clicked");
      },
    },
    {
      id: 4,
      name: "Our Team",
      onclick: () => {
        console.log("Our Team clicked");
      },
    },
    {
      id: 5,
      name: "Make Enquiry",
      onclick: () => {
        console.log("Make Enquiry clicked");
      },
    },
  ];
  return (
    <div className="flex w-full justify-between items-center bg-white px-6! md:px-9! py-4! md:py-8!">
      <div className="md:block hidden">
        <ul
          ref={navRef}
          className={`list-none flex w-full gap-5 text-black text-sm! font-normal leading-1.5! fade-in-up-scroll ${navVisible ? "visible" : ""}`}
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <button onClick={item.onclick}>{item.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          ref={contactRef}
          className={`flex items-center gap-4 px-4! py-2! bg-[#FFFCFA] text-[#221F20] leading-1 border border-black fade-in-up-scroll ${contactVisible ? "visible" : ""}`}
        >
          Contact us <ArrowRightIcon />
        </button>
      </div>
      <div className="md:hidden">
        <button className="border border-[#F9F4EE] bg-[#F9F4EE] px-3! py-4!">
          <HamburgerIcon />
        </button>
      </div>
    </div>
  );
}
