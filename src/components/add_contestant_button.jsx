import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import avatars from "../avatars";

export default function AddContestantBtn() {
  const [avatar, setAvatar] = useState(avatars[1]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const avatarList = [];

  for (const i in avatars) {
    let avatar = (
      <div
        className="carousel-item hover:bg-btn-gold"
        onClick={() => {
          setAvatar(avatars[i]);
        }}
      >
        <img src={avatars[i]} className="h-20 w-20" />
      </div>
    );

    avatarList.push(avatar);
  }

  return (
    <Popup
      trigger={
        <button
          id="join-btn"
          className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange  font-archivo scale-75 hover:scale-90 transition duration-200"
        >
          Add New Contestant
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
              Claim your chance to win!
            </h3>

            <div className="flex flex-col space-y-2 w-full">
              {/* pick avatar block */}
              <div className="flex items-center justify-evenly">
                <span>Pick an avatar: </span>
                <img src={avatar} className="h-16 w-16" />
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Click
                  </div>
                  <div
                    tabIndex={0}
                    className="carousel flex-wrap dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 h-52 justify-center mt-16"
                  >
                    {avatarList}
                  </div>
                </div>
              </div>

              {/*input fields */}
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="h-8 w-full bg-gray-300 rounded pl-2"
                placeholder="Your Name"
                onChange={(value) => {
                  setName(value.target.value);
                }}
              />
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                className="h-8 w-full bg-gray-300 rounded pl-2"
                placeholder="Your Email"
                onChange={(value) => {
                  setEmail(value.target.value);
                }}
              />
              <input
                type="text"
                name="phone"
                value={phone}
                id="phone"
                className="h-8 w-full bg-gray-300 rounded pl-2"
                placeholder="Phone Number"
                onChange={(value) => {
                  setPhone(value.target.value);
                }}
              />
            </div>

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
