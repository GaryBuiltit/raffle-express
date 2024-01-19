import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

export default function JoinButton() {
  return (
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
              <Link to={"join/"}>Join Raffle</Link>
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}
