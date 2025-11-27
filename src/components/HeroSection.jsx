import React from "react";
import hero from "../assets/hero.jpg";
import { FaArrowAltCircleRight, FaToolbox } from "react-icons/fa";

const HeroSection = () => {
  const boxes = [
    "REGISTER REPAIR",
    "CHECK REPAIR STATUS",
    "ORDER PARTS",
    "SWAP DEALS",
  ];

  return (
    <section className="relative">
      {/* HERO IMAGE */}
      <img
        className="w-full object-cover h-[490px]"
        src={hero}
        alt="hero_pic"
      />

      {/* CARDS CONTAINER */}
      <div className="w-[90%] mx-auto relative">

        {/* Small screens (<640px) */}
        <div className="grid grid-cols-1 gap-6 sm:hidden relative -mt-32">
          {boxes.map((title, index) => (
            <div
              key={index}
              className={`  rounded-lg flex flex-col items-center text-center bg-white shadow-lg h-[280px] ${
                index === 0 ? "" : "mt-0" // only first card overlaps
              }`}
            >
              <div className="flex flex-col items-center justify-center flex-grow py-6 px-6">
                <h1 className="text-xl font-bold mb-6">{title}</h1>
                <span className="text-6xl text-blue-500">
                  <FaToolbox />
                </span>
              </div>
              <div className="border rounded-b-lg bg-blue-950 h-10 flex items-center justify-center text-white w-full">
  {title === "REGISTER REPAIR" ? (
    <a href="/register-repair" className="flex items-center gap-2 text-xl">
      <FaArrowAltCircleRight />
    </a>
  ) : (
    <a href="#" className="flex items-center gap-2 text-xl">
      <FaArrowAltCircleRight />
    </a>
  )}
</div>

            </div>
          ))}
        </div>

        {/* Medium screens (≥768px and <1024px) */}
        <div className="hidden sm:grid md:grid-cols-2 gap-6 mt-6 lg:hidden relative">
          {boxes.map((title, index) => (
            <div
              key={index}
              className={`  rounded-lg flex flex-col items-center text-center bg-white shadow-lg h-[340px] ${
                index < 2 ? "md:-mt-24" : "" // first 2 overlap hero
              }`}
            >
              <div className="flex flex-col items-center justify-center flex-grow py-8 px-8">
                <h1 className="text-2xl font-bold mb-10">{title}</h1>
                <span className="text-8xl text-blue-500">
                  <FaToolbox />
                </span>
              </div>
              <div className="border rounded-b-lg bg-blue-950 h-10 flex items-center justify-center text-white w-full">
  {title === "REGISTER REPAIR" ? (
    <a href="/register-repair" className="flex items-center gap-2 text-xl">
      <FaArrowAltCircleRight />
    </a>
  ) : (
    <a href="#" className="flex items-center gap-2 text-xl">
      <FaArrowAltCircleRight />
    </a>
  )}
</div>

            </div>
          ))}
        </div>

        {/* Large screens (≥1024px) */}
        <div className="hidden lg:flex lg:justify-between lg:relative lg:mt-[-190px] w-[90%] mx-auto">
          {boxes.map((title, index) => (
            <div
              key={index}
              className="  rounded-lg flex flex-col items-center text-center bg-white shadow-lg h-[380px] w-[22%]"
            >
              <div className="flex flex-col items-center justify-center flex-grow py-8 px-8">
                <h1 className="text-2xl font-bold mb-10">{title}</h1>
                <span className="text-9xl text-blue-500">
                  <FaToolbox />
                </span>
              </div>
              <div className="border rounded-b-lg bg-blue-950 h-10 flex items-center justify-center text-white w-full">
  {title === "REGISTER REPAIR" ? (
    <a href="/register-repair" className="flex items-center gap-2 text-xl">
      <FaArrowAltCircleRight />
    </a>
  ) : (
    <a href="#" className="flex items-center gap-2 text-xl">
      <FaArrowAltCircleRight />
    </a>
  )}
</div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
