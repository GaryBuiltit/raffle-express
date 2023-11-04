import react, { useState } from "react";
import Nav from "../components/Nav";

export default function CreatePage() {
  const { qrChoice, setQrChoice } = useState(true);

  const typeCheckboxChange = (checkbox) => {
    if (checkbox.id == "choice-qr" && qrChoice == true) {
      setQrChoice(false);
    }

    if (checkbox.id == "choice-qr" && qrChoice == false) {
      setQrChoice(true);
    }
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
              <div id="sign-up-type" className="flex items-center space-x-3">
                <p className="text-white text-lg font-bold">Sign-Up Type:</p>
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
                    className="appearance-none w-4 h-4 bg-gray-100 text-blue-500 rounded"
                  />
                </div>
                <div id="form-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-form" className="text-white">
                    Live On-Screen Form
                  </label>
                  <input type="checkbox" name="choice-form" id="choice-form" />
                </div>
                <div id="pin-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-pin" className="text-white">
                    Pin
                  </label>
                  <input type="checkbox" name="choice-pin" id="choice-pin" />
                </div>
              </div>

              {/* sign up form field selection */}
              <div
                id="sign-up-fields"
                className="flex items-center mt-3 space-x-3"
              >
                <p className="text-white text-lg font-bold">
                  Sing Up Form Feilds:
                </p>
                <div id="name-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-name" className="text-white">
                    Name
                  </label>
                  <input type="checkbox" name="choice-name" id="choice-name" />
                </div>
                <div id="email-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-email" className="text-white">
                    Email
                  </label>
                  <input
                    type="checkbox"
                    name="choice-email"
                    id="choice-email"
                  />
                </div>
                <div id="phone-choice-container" className="flex space-x-1">
                  <label htmlFor="choice-phone" className="text-white">
                    Phone Number
                  </label>
                  <input
                    type="checkbox"
                    name="choice-phone"
                    id="choice-phone"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* submit button */}
          <button
            type="submit"
            form="create-raffle-form"
            className="px-4 py-2 bg-black rounded-full mt-4 border-2 border-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110 transition ease-in-out duration-300"
          >
            <p className="text-2xl text-white">Start Raffle</p>
          </button>
        </div>
      </div>
    </div>
  );
}
