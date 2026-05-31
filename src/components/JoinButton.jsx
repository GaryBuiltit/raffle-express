import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";

export default function JoinButton() {
  const [rafflePin, setRafflePin] = useState("");
  const navigate = useNavigate();

  const joinRaffleHandler = () => {
    if (rafflePin.length === 4) {
      sessionStorage.removeItem("raffle");
      navigate(`/joinraffle/${rafflePin}`);
      close();
    } else {
      alert("Please enter a valid 4 digit raffle pin number");
    }
  };

  return (
    <Popup
      trigger={
        <button
          id="join-btn"
          className="rounded-full border-4 border-white px-4 py-3 font-bold bg-btn-gold text-btn-orange text-4xl font-archivo w-1/2 scale-75 hover:scale-90 transition duration-200 hover:border-btn-orange cursor-pointer"
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
              name="raffle-pin"
              id="raffle-pin"
              className="h-8 w-full bg-gray-300 roundedn pl-2"
              placeholder="Enter Raffle Pin"
              value={rafflePin}
              onChange={(e) => setRafflePin(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn mt-3 bg-btn-gold hover:bg-btn-orange"
              onClick={joinRaffleHandler}
            >
              Join Raffle
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}
