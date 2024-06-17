import React from "react";
import Nav from "../components/Nav";
import QrCode from "../components/QrCode";
import avatars from "../avatars";
import Contestant from "../components/contestant";
import AddContestantBtn from "../components/add_contestant_button";

export default function JoinPage() {
  // const mockContestants = 25;
  const rafflePin = "Abc12b456709";
  const contestants = [
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 2,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 4,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 1,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 11,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 8,
    },
  ];

  // const avatarList = [];

  // for (let i = 0; i < mockContestants; i++) {
  //   const avatarChoice = Math.floor(Math.random() * 11);
  //   let avatar = <Contestant avatar={avatars[avatarChoice]} name="johnny" />;

  //   avatarList.push(avatar);
  // }

  return (
    <div className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden">
      <div id="confetti-bg-join" className="flex flex-col h-full page-bg">
        <Nav />
        <div className="flex w-screen h-full">
          {/* QR code signup div */}
          <div className="flex flex-col justify-center items-center w-1/2 space-y-3 h-full">
            <h1 className="text-4xl font-trocchi font-bold text-white">
              Scan to Join
            </h1>
            <div className="bg-white p-3 rounded-lg">
              <QrCode title="Test Code" value="www.google.com" />
            </div>
          </div>

          {/* pin signup div */}
          <div className="flex flex-col justify-center items-start w-1/2">
            <div className="flex flex-col items-center bg-black/75 rounded-lg px-6 py-4 space-y-4">
              <h2 className="text-2xl text-white font-trocchi">
                Share Pin With Contestants
              </h2>
              <p className="text-5xl text-btn-orange font-trocchi">
                {rafflePin}
              </p>
              <p className="text-white text-lg font-trocchi max-w-xs text-center">
                Go to www.usemypin.com put in pin and submit form to join raffle
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p
            id="contestant-count"
            className="text-center text-white font-bold text-xl mb-3"
          >
            contestants: {contestants.length}
          </p>
          <AddContestantBtn />
        </div>

        <div id="contestants" className="carousel space-x-6 py-3 px-4 h-full">
          {contestants.map((contestant, index) => {
            return (
              <div className="carousel-item">
                <Contestant
                  avatar={avatars[contestant.avatar]}
                  name={contestant.name.split(" ")[0]}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className="px-4 py-2 bg-black/50 rounded-full mt-4 border-2 border-white hover:shadow-lg hover:bg-opacity-75 hover:scale-110 transition ease-in-out duration-300"
          >
            <p className="text-2xl text-white">Pick Winner</p>
          </button>
        </div>
      </div>
    </div>
  );
}
