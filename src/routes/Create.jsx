import React, { useState } from "react";
import Nav from "../components/Nav";

export default function CreatePage() {
  const [qrChoice, setQrChoice] = useState(false);
  const [pinChoice, setPinChoice] = useState(false);
  const [formChoice, setFormChoice] = useState(false);
  const [nameChoice, setNameChoice] = useState(false);
  const [emailChoice, setEmailChoice] = useState(false);
  const [phoneChoice, setPhoneChoice] = useState(false);

  const handleCheckboxChange = (e) => {
    let clickedBox = e.target.id;

    // Signup type checkboxes
    if (clickedBox === "choice-qr") setQrChoice(!qrChoice);
    if (clickedBox === "choice-form") setFormChoice(!formChoice);
    if (clickedBox === "choice-pin") setPinChoice(!pinChoice);

    // raffle form fields
    if (clickedBox === "choice-name") setNameChoice(!nameChoice);
    if (clickedBox === "choice-email") setEmailChoice(!emailChoice);
    if (clickedBox === "choice-phone") setPhoneChoice(!phoneChoice);
  };

  return (
    <div
      id="create-page"
      className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden"
    >
      <div id="confetti-background" className="h-full page-bg">
        <Nav />
        <div
          id="create-pg-container"
          className="h-full flex flex-col items-center justify-center"
        >
          {/* create card */}
          <div
            id="create-card"
            className="bg-black bg-opacity-75 h-44 w-2/5 rounded-3xl flex flex-col items-center pt-4"
          >
            <h1>
              <strong className="text-white text-3xl">Raffle Set-Up</strong>
            </h1>
            <form id="create-raffle-form" action="" className="mt-4">
              {/* signup type checkbox row */}
              <div id="sign-up-type" className="flex items-center space-x-3">
                <p className="text-white text-lg font-bold">Sign-Up Type:</p>

                {/* QR Type Choice */}
                <div
                  id="qr-choice-container"
                  className="flex space-x-1 items-center"
                >
                  <label htmlFor="choice-qr" className="text-white">
                    QR Code
                  </label>
                  <input
                    type="checkbox"
                    name="choice-qr"
                    id="choice-qr"
                    checked={qrChoice}
                    onChange={handleCheckboxChange}
                    className="checkbox bg-white accent-btn-gold"
                  />
                </div>

                {/* Form Tpye Choice */}
                <div id="form-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-form" className="text-white">
                    Live On-Screen Form
                  </label>
                  <input
                    type="checkbox"
                    name="choice-form"
                    id="choice-form"
                    checked={formChoice}
                    onChange={handleCheckboxChange}
                    className="checkbox bg-white accent-btn-gold"
                  />
                </div>

                {/* Pin Type Choice */}
                <div id="pin-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-pin" className="text-white">
                    Pin
                  </label>
                  <input
                    type="checkbox"
                    name="choice-pin"
                    id="choice-pin"
                    checked={pinChoice}
                    onChange={handleCheckboxChange}
                    className="checkbox bg-white accent-btn-gold"
                  />
                </div>
              </div>

              {/* sign up form field checkbox row */}
              <div
                id="sign-up-fields"
                className="flex items-center mt-3 space-x-3"
              >
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
            type="button"
            form="create-raffle-form"
            className="px-4 py-2 bg-black rounded-full mt-4 border-2 border-white bg-opacity-50 hover:shadow-lg hover:bg-opacity-75 hover:scale-110 transition ease-in-out duration-300"
          >
            <p className="text-2xl text-white">Start Raffle</p>
          </button>
        </div>
      </div>
    </div>
  );
}
