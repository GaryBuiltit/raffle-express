import React from "react";
import Nav from "../components/Nav";
import QrCode from "../components/QrCode";

export default function JoinPage() {
  const mockContestants = 40;

  const avatarList = [];

  for (let i = 0; i < mockContestants; i++) {
    let avatar = (
      <div className="avatar placeholder">
        <div className="bg-neutral w-20 rounded-full" />
      </div>
    );
    avatarList.push(avatar);
  }

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
          <div className="flex flex-col justify-center items-center w-1/2">
            <div className="bg-black/75"></div>
          </div>
        </div>
        <p
          id="contestant-count"
          className="text-center text-white font-bold text-xl mb-3 -mt-10"
        >
          contestants: {avatarList.length}
        </p>
        <div id="contestants" className="flex mb-14 ml-3 space-x-3">
          {avatarList}
        </div>
      </div>
    </div>
  );
}
