import React, { useState, useEffect } from "react";
import avatars from "../avatars";
import Contestant from "../components/contestant";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";
import SignedOutNav from "../components/signedout_nav";

export default function JoinRafflePage() {
  const { pin } = useParams();
  const [raffle, setRaffle] = useState(null);
  const [avatar, setAvatar] = useState(1);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joining, setJoining] = useState(false);
  const navigate = useNavigate();

  const phoneRequired = raffle?.phone;

  const selectAvatar = (id) => {
    setAvatar(id);
    setAvatarPickerOpen(false);
  };

  const resetForm = () => {
    setAvatar(1);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  const getRaffle = async () => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/getRaffle`, {
        rafflePin: pin,
      })
      .then((res) => {
        if (res.status === 200) {
          setRaffle(res.data);
          sessionStorage.setItem("raffle", JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        console.log(`raffleError: ${e}`);
        alert(`Error finding raffle please try again!`);
        navigate("/");
      });
  };

  const addContestant = async (e) => {
    e.preventDefault();
    setJoining(true);

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addContestant`,
        {
          raffle: raffle?._id,
          raffleName: raffle?.raffleName,
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          fullName: `${trimmedFirstName} ${trimmedLastName}`.trim(),
          email,
          phone,
          avatar,
          user: raffle?.user,
        },
      );

      if (res.status === 200) {
        alert("You have joined the raffle!");
        resetForm();
        await getRaffle();
      }
    } catch (e) {
      console.log(`addContestant error: ${e}`);
      alert("Failed to join raffle. Please try again!");
    } finally {
      setJoining(false);
    }
  };

  useEffect(() => {
    getRaffle();
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <SignedOutNav />

      <div className="bg-gradient-to-r from-btn-gold to-btn-orange flex flex-col flex-1 min-h-0">
        <div id="confetti-bg-join" className="flex flex-col flex-1 min-h-0 page-bg">
          <main className="flex flex-1 flex-col min-h-0 w-full">
          {raffle === null ? (
            <div className="flex flex-1 items-center justify-center w-full">
              <span className="loading loading-ring loading-xs"></span>
              <span className="loading loading-ring loading-sm"></span>
              <span className="loading loading-ring loading-md"></span>
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-center flex-1 items-center w-full md:space-x-10 px-4">
              <div className="flex flex-col items-center w-full md:w-1/2">
                <span className="text-4xl font-bold mt-10">
                  {raffle?.raffleName}
                </span>
                <span className="text-xl mt-10 text-center px-4 md:px-0">{raffle?.description}</span>
              </div>
              <form
                id="join_form"
                onSubmit={addContestant}
                className="bg-white py-6 px-8 mt-12 rounded-xl flex flex-col justify-center items-center relative w-full md:w-1/3 max-h-fit scale-90 md:scale-100"
              >
                <h3 className="text-2xl font-bold font-libreFranklin mb-3">
                  Claim your chance to win!
                </h3>

                <div className="flex flex-col space-y-2 w-full">
                  <div className="flex items-center justify-evenly">
                    <span>Pick an avatar: </span>
                    <img
                      src={avatars[avatar]}
                      className="h-16 w-16"
                      alt=""
                    />
                    <details
                      className="dropdown dropdown-end"
                      open={avatarPickerOpen}
                      onToggle={(e) =>
                        setAvatarPickerOpen(e.currentTarget.open)
                      }
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

                  <input
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    className="h-8 w-full bg-gray-300 rounded pl-2"
                    placeholder="First Name"
                    disabled={joining}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    className="h-8 w-full bg-gray-300 rounded pl-2"
                    placeholder="Last Name"
                    disabled={joining}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    required
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    className="h-8 w-full bg-gray-300 rounded pl-2"
                    placeholder="Your Email"
                    disabled={joining}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    required={phoneRequired}
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    className="h-8 w-full bg-gray-300 rounded pl-2"
                    placeholder="Phone Number"
                    disabled={joining}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn mt-3 bg-btn-gold hover:bg-btn-orange disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={joining}
                >
                  {joining ? "Joining..." : "Join Raffle"}
                </button>
              </form>
            </div>
          )}

          {raffle?.contestants?.length > 0 && (
            <div className="px-4 pb-6">
              <p className="text-center text-white font-bold text-xl mb-3 font-trocchi">
                Contestants joined: {raffle.contestants.length}
              </p>
              <div className="carousel space-x-6 py-3 px-4">
                {raffle.contestants.map((entry, index) => (
                  <div
                    key={`${entry.displayName}-${entry.avatar}-${index}`}
                    className="carousel-item"
                  >
                    <Contestant
                      avatar={avatars[entry.avatar]}
                      name={entry.displayName}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
