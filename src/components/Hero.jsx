import "../styles.css";
import react from "react";

const Hero = () => {
  const heroPic = "https://i.ibb.co/0m0KWkw/raffle-express-hero-pic.png";
  return (
    <div className="flex flex-col lg:flex-row h-full mt-8 ">
      {/* hero button section */}
      <div id="hero-left" className="w-1/2 flex flex-col items-center lg:pt-32">
        <h1 className="text-btn-gold font-bold text-9xl">RAFFLE</h1>
        <h1 className="text-white font-bold text-9xl -mt-7">EXPRESS</h1>
        <p className="text-white text-2xl font-trocchi">
          Quickly Create Live Raffles For Free
        </p>
        <div id="hero-btns" className="flex w-3/4 space-x-3 mt-2">
          <button
            id="create-btn"
            className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2"
          >
            Create Raffle
          </button>
          <button
            id="join-btn"
            className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2"
          >
            Join Raffle
          </button>
        </div>
        <div className="flex space-x-2 mt-6">
          <img src="https://placehold.co/70x30" alt="raffle tickets" />
          <p className="text-white text-lg font-trocchi">
            Sign up contestants with QR code, pin, or forms
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
