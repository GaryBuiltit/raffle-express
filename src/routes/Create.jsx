import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { getRaffles } from "../redux/slices/raffles";
import axios from "axios";

export default function CreatePage() {
  const [phoneChoice, setPhoneChoice] = useState(true);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [raffleName, setRaffleName] = useState(null);
  const [raffleDescription, setraffleDescription] = useState();
  const { userId, isLoaded } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createRaffle = (e) => {
    e.preventDefault();
    setLoading(true);
    const raffleData = {
      user: userId,
      raffleName: raffleName,
      endDate: endDate,
      endTime: endTime,
      description: raffleDescription,
      phone: phoneChoice,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/createRaffle`, raffleData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(getRaffles(userId));
        setTimeout(() => {
          navigate(`/raffle/${response.data.raffleID}`);
        }, 1000);
      })
      .catch((error) => {
        console.log("error creating raffle: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";

  return (
    <div
      id="create-page"
      className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden"
    >
      <div id="confetti-background" className="flex flex-col h-full page-bg">
        <Nav />
        <div
          id="create-pg-container"
          className="h-full flex flex-col items-center justify-center"
        >
          {/* create card */}
          <div
            id="create-card"
            className="bg-black bg-opacity-60 h-auto mx-1 sm:w-4/5 lg:w-2/5 rounded-3xl flex flex-col items-center py-4"
          >
            <h1>
              <strong className="text-white text-3xl">Raffle Set-Up</strong>
            </h1>
            <form
              id="create-raffle-form"
              className="mt-4 mx-2 flex-col"
              onSubmit={(e) => {
                createRaffle(e);
              }}
            >
              <div className="flex flex-col sm:flex-row justify-evenly sm:space-x-2 mb-4 sm:mb-2">
                {/* raffle name block */}
                <div className="flex flex-col w-full">
                  <label className="text-white">*Raffle Name:</label>
                  <input
                    id="raffle-name"
                    // value={raffleName}
                    type="text"
                    className="input input-sm input-bordered mb-3 flex items-center"
                    placeholder="Enter Raffle Name"
                    disabled={loading}
                    onChange={(value) => {
                      setRaffleName(value.target.value);
                    }}
                  />
                </div>
                {/* date time block */}
                <div className="flex flex-col w-full">
                  <label className="text-white">*End Date & Time:</label>

                  <input
                    id="end-date-time"
                    aria-label="End date and time"
                    type="datetime-local"
                    className="input input-sm text-black"
                    disabled={loading}
                    onChange={(value) => {
                      const [date, time] = value.target.value.split("T");
                      setEndDate(date);
                      setEndTime(time);
                    }}
                  />
                </div>
              </div>
              {/* raffle description */}
              <textarea
                value={raffleDescription}
                className="textarea textarea-bordered w-full mb-2"
                placeholder="Raffle Description"
                disabled={loading}
                onChange={(value) => {
                  setraffleDescription(value.target.value);
                }}
              ></textarea>

              {/* phone field checkbox row */}
              <div id="sign-up-fields" className="flex items-center space-x-3">
                <p className="text-white text-lg font-bold">
                  Required Phone Number?
                </p>

                {/* phone field checkbox */}
                <div id="phone-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-phone-yes" className="text-white">
                    Yes
                  </label>
                  <input
                    type="checkbox"
                    name="choice-phone-yes"
                    id="choice-phone-yes"
                    disabled={loading}
                    checked={phoneChoice}
                    onChange={(e) => {
                      setPhoneChoice(true);
                    }}
                    className="checkbox bg-white checked:bg-btn-gold"
                  />
                </div>
                <div id="phone-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-phone-no" className="text-white">
                    No
                  </label>
                  <input
                    type="checkbox"
                    name="choice-phone-no"
                    id="choice-phone-no"
                    disabled={loading}
                    checked={!phoneChoice}
                    onChange={(e) => {
                      setPhoneChoice(false);
                    }}
                    className="checkbox bg-white checked:bg-btn-gold"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* submit button */}
          <button
            type="submit"
            form="create-raffle-form"
            disabled={!raffleName || !endDate || !endTime || loading}
            className="px-4 py-2 bg-black rounded-full mt-4 border-2 border-white bg-opacity-50 hover:shadow-lg hover:bg-opacity-75 hover:scale-110 transition ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p
              className={`text-2xl text-white ${
                loading ? "animate-pulse" : ""
              }`}
            >
              {loading ? "Creating Raffle..." : "Start Raffle"}
            </p>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
