import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllContestants } from "../redux/slices/contestants";
import avatars from "../avatars";
import { useAuth } from "@clerk/clerk-react";

export default function AddContestantBtn(props) {
  const [avatar, setAvatar] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const phoneRequired = props.raffle?.phone;
  const [addingContestant, setAddingContestant] = useState(false);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const selectAvatar = (id) => {
    setAvatar(id);
    setAvatarPickerOpen(false);
  };

  const resetForm = (close) => {
    setAvatar(1);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    close();
  };

  const addContestant = (e, close) => {
    e.preventDefault();
    setAddingContestant(true);
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    let contestant = {
      raffle: props.raffle?._id,
      raffleName: props.raffle?.raffleName,
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      fullName: `${trimmedFirstName} ${trimmedLastName}`.trim(),
      email: email,
      phone: phone,
      avatar: avatar,
      user: userId,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/addContestant`, contestant, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        dispatch(getAllContestants(userId));
        alert("Contestant added successfully");
        resetForm(close);
      })
      .catch((err) => {
        console.log("addContestant error: ", err);
        alert("Failed to add contestant please try again!");
      })
      .finally(() => {
        setAddingContestant(false);
      });
  };

  return (
    <Popup
      trigger={
        <button
          id="join-btn"
          className="rounded-full border-4 px-4 py-3 font-bold bg-btn-gold text-btn-orange  font-archivo scale-75 hover:scale-90 transition duration-200"
        >
          {props.label}
        </button>
      }
      modal
    >
      {(close) => (
        <div className="flex items-center justify-center h-screen w-screen bg-black/50">
          <form
            id="join_form"
            onSubmit={(e) => addContestant(e, close)}
            className="bg-white py-6 px-8 rounded-xl flex flex-col justify-center items-center relative"
          >
            <button
              type="button"
              className="btn btn-circle text-xl absolute top-0 right-0 -mt-3 -mr-3 bg-btn-gold hover:bg-btn-orange"
              onClick={() => {
                resetForm(close);
              }}
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
                <img src={avatars[avatar]} className="h-16 w-16" />
                <details
                  className="dropdown dropdown-end"
                  open={avatarPickerOpen}
                  onToggle={(e) => setAvatarPickerOpen(e.currentTarget.open)}
                >
                  <summary className="btn m-1">Choose</summary>
                  <div className="carousel flex-wrap dropdown-content z-1 mt-2 w-52 h-52 justify-center rounded-box bg-base-100 p-2 shadow">
                    {Object.keys(avatars).map((i) => (
                      <button
                        key={i}
                        type="button"
                        className="carousel-item hover:bg-btn-gold rounded-lg"
                        onClick={() => selectAvatar(Number(i))}
                      >
                        <img
                          src={avatars[i]}
                          className="h-20 w-20"
                          alt={`Avatar ${i}`}
                        />
                      </button>
                    ))}
                  </div>
                </details>
              </div>

              {/*input fields */}
              <input
                required
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                className="h-8 w-full bg-gray-300 rounded pl-2"
                placeholder="First Name"
                onChange={(value) => {
                  setFirstName(value.target.value);
                }}
              />
              <input
                required
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                className="h-8 w-full bg-gray-300 rounded pl-2"
                placeholder="Last Name"
                onChange={(value) => {
                  setLastName(value.target.value);
                }}
              />
              <input
                required
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
                required={phoneRequired}
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
              type="submit"
              className="btn mt-3 bg-btn-gold hover:bg-btn-orange disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={addingContestant}
            >
              {addingContestant ? "Adding Contestant..." : "Add Contestant"}
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}
