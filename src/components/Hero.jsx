import "../styles.css";
import react from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import JoinButton from "./JoinButton";
import { heroPic, raffleTickets } from "../assets/images.js";

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-full justify-start md:overflow-y-hidden">
      {/* **********hero button section************ */}
      <div
        id="hero-left"
        className="md:w-1/2 flex flex-col items-center pt-2 md:pt-10"
      >
        <h1 className="text-btn-gold font-bold text-6xl sm:text-8xl md:text-9xl">
          RAFFLE
        </h1>
        <h1 className="text-white font-bold text-6xl sm:text-8xl md:text-9xl md:-mt-7">
          EXPRESS
        </h1>
        <p className="text-white text-xl md:text-2xl font-trocchi">
          Quickly Create Live Raffles For Free
        </p>

        {/* Hero buttons */}
        <div id="hero-btns" className="flex md:w-3/4 space-x-3 mt-2">
          {/* create raffle button */}
          <button
            id="create-btn"
            className="rounded-full border-4 px-4 py-3 border-white font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2 scale-75 hover:scale-90 transition duration-200 text-center hover:border-btn-orange"
          >
            <Link to={"create/"}>Create Raffle</Link>
          </button>

          {/* Join Raffle Button */}
          <JoinButton />
        </div>
        <div className="flex space-x-2 mt-6 justify-center items-center mb-6 md:mb-0">
          <img src={raffleTickets} alt="raffle tickets" />
          <p className="text-white text-lg font-trocchi max-w-[300px]">
            Sign up contestants with QR code, pin, or live on-screen forms
          </p>
        </div>
      </div>
      {/* hreo image section */}
      <div id="hero-right" className="md:w-1/2 flex justify-center">
        <img
          src={heroPic}
          alt="raffle celebration"
          className="w-full object-contain md:max-h-none"
        />
      </div>
    </div>
  );
};

export default Hero;
