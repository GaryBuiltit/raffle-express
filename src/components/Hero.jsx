import "../styles.css";
import react from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroPic = "https://i.ibb.co/0m0KWkw/raffle-express-hero-pic.png";
  return (
    <div className="flex flex-col lg:flex-row h-full mt-8 ">
      {/* hero button section */}
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
            className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2 scale-75 hover:scale-90 transition duration-200"
          >
            Create Raffle
          </button>

          {/* Join Raffle Button */}
          <Popup
            trigger={
              <button
                id="join-btn"
                className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2 scale-75 hover:scale-90 transition duration-200"
              >
                Join A Raffle
              </button>
            }
            modal
          >
            {(close) => (
              <div className="flex items-center justify-center h-screen w-screen bg-black/50">
                <form
                  id="join_form"
                  className="bg-white py-6 px-8 rounded-xl flex flex-col justify-center items-center relative"
                >
                  <button
                    type="button"
                    className="btn btn-circle text-xl absolute top-0 right-0 -mt-3 -mr-3 bg-btn-gold hover:bg-btn-orange"
                    onClick={close}
                  >
                    X
                  </button>
                  <h3 className="text-2xl font-bold font-libreFranklin mb-3">
                    Let's find your raffle!
                  </h3>
                  <input
                    type="text"
                    name="raffle_id"
                    id="raffle_id"
                    className="h-8 w-full bg-gray-300 rounded"
                    placeholder="Enter Raffle ID"
                  />
                  <button
                    type="button"
                    className="btn mt-3 bg-btn-gold hover:bg-btn-orange"
                  >
                    Join Raffle
                  </button>
                </form>
              </div>
            )}
          </Popup>
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
