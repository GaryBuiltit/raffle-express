import "../styles.css";
import react from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import JoinButton from "./JoinButton";

const Hero = () => {
  const heroPic = "https://i.ibb.co/0m0KWkw/raffle-express-hero-pic.png";
  return (
    <div className="flex flex-col lg:flex-row h-full mt-8 ">
      {/* **********hero button section************ */}
      <div id="hero-left" className="w-1/2 flex flex-col items-center lg:pt-10">
        <h1 className="text-btn-gold font-bold text-9xl">RAFFLE</h1>
        <h1 className="text-white font-bold text-9xl -mt-7">EXPRESS</h1>
        <p className="text-white text-2xl font-trocchi">
          Quickly Create Live Raffles For Free
        </p>

        {/* Hero buttons */}
        <div id="hero-btns" className="flex w-3/4 space-x-3 mt-2">
          {/* create raffle button */}
          <button
            id="create-btn"
            className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2 scale-75 hover:scale-90 transition duration-200 text-center"
            href="/create/"
          >
            <Link to={"create/"}>Create Raffle</Link>
          </button>

          {/* Join Raffle Button */}
          <JoinButton />
        </div>
        <div className="flex space-x-2 mt-6 justify-center items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/raffle-express.appspot.com/o/raffle%20tickets.png?alt=media&token=ab357fe3-2654-4206-b149-2fab992df9c3"
            alt="raffle tickets"
          />
          <p className="text-white text-lg font-trocchi max-w-[300px]">
            Sign up contestants with QR code, pin, or live on-screen forms
          </p>
        </div>
      </div>
      {/* hreo image section */}
      <div id="hero-right" className="w-1/2">
        <img src={heroPic} alt="raffle celebration" className="" />
      </div>
    </div>
  );
};

export default Hero;
