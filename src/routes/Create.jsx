import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import axios from "axios";

export default function CreatePage() {
  const [qrChoice, setQrChoice] = useState(false);
  const [pinChoice, setPinChoice] = useState(false);
  const [formChoice, setFormChoice] = useState(false);
  const [nameChoice, setNameChoice] = useState(false);
  const [emailChoice, setEmailChoice] = useState(false);
  const [phoneChoice, setPhoneChoice] = useState(false);
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [raffleName, setRaffleName] = useState();
  const [raffleDescription, setraffleDescription] = useState();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    let clickedBox = e.target.id;

    if (clickedBox === "choice-name") setNameChoice(!nameChoice);
    if (clickedBox === "choice-email") setEmailChoice(!emailChoice);
    if (clickedBox === "choice-phone") setPhoneChoice(!phoneChoice);
  };

  const createRaffle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("owner", { userId });
    formData.append("raffle name", { raffleName });
    formData.append("end date", { endDate });
    formData.append("end time", { endTime });
    formData.append("raffle descritpion", { raffleDescription });

    console.log(formData.values());

    axios
      .get(
        "https://srfqzk72qj.execute-api.us-east-1.amazonaws.com/rafle_express",
        {
          data: formData,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("AWSlambaError: " + error);
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
              // action=""
              className="mt-4 mx-2 flex-col"
              onSubmit={(e) => {
                createRaffle(e);
              }}
            >
              <div className="flex flex-col sm:flex-row justify-evenly sm:space-x-2 mb-4 sm:mb-2">
                {/* raffle name block */}
                <div className="flex flex-col w-full">
                  <label className="text-white">Raffle Name:</label>
                  <input
                    id="raffle-name"
                    // value={raffleName}
                    type="text"
                    className="input input-sm input-bordered mb-3 flex items-center"
                    placeholder="Enter Raffle Name"
                    onChange={(value) => {
                      setRaffleName(value.target.value);
                    }}
                  />
                </div>
                {/* date time block */}
                <div className="flex flex-col w-full">
                  <label className="text-white">End Date & Time:</label>

                  <input
                    id="end-date-time"
                    aria-label="End date and time"
                    type="datetime-local"
                    className="input input-sm text-black"
                    onChange={(value) => {
                      const [date, time] = value.target.value.split("T");
                      setEndDate(date);
                      setEndTime(time);
                    }}
                  />
                </div>
              </div>

              <textarea
                value={raffleDescription}
                className="textarea textarea-bordered w-full mb-2"
                placeholder="Raffle Description"
                onChange={(value) => {
                  setraffleDescription(value.target.value);
                }}
              ></textarea>

              {/* sign up form field checkbox row */}
              <div id="sign-up-fields" className="flex items-center space-x-3">
                <p className="text-white text-lg font-bold">
                  Sing Up Form Feilds:
                </p>
                {/* name field checkbox */}
                <div id="name-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-name" className="text-white">
                    Name
                  </label>
                  <input
                    type="checkbox"
                    name="choice-name"
                    id="choice-name"
                    checked={nameChoice}
                    onChange={handleCheckboxChange}
                    className="checkbox bg-white accent-btn-gold"
                  />
                </div>

                {/* email field checkbox */}
                <div id="email-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-email" className="text-white">
                    Email
                  </label>
                  <input
                    type="checkbox"
                    name="choice-email"
                    id="choice-email"
                    checked={emailChoice}
                    onChange={handleCheckboxChange}
                    className="checkbox bg-white accent-btn-gold"
                  />
                </div>

                {/* phone field checkbox */}
                <div id="phone-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-phone" className="text-white">
                    Phone Number
                  </label>
                  <input
                    type="checkbox"
                    name="choice-phone"
                    id="choice-phone"
                    checked={phoneChoice}
                    onChange={handleCheckboxChange}
                    className="checkbox bg-white accent-btn-gold"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* submit button */}
          <button
            type="submit"
            form="create-raffle-form"
            className="px-4 py-2 bg-black rounded-full mt-4 border-2 border-white bg-opacity-50 hover:shadow-lg hover:bg-opacity-75 hover:scale-110 transition ease-in-out duration-300"
          >
            <p className="text-2xl text-white">Start Raffle</p>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
